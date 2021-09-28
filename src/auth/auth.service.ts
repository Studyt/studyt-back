import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { compareSync, hashSync } from 'bcrypt';
import {
  NotFoundException,
  UnauthorizedException,
  ConflictException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from '../common/dtos/register.dto';
import { JwtGuard } from './jwt/jwt.guard';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { ConfigService } from '@nestjs/config';
import { compile as compileMailTemplate } from 'handlebars';
import { readFileSync } from 'fs';
import { MailProducerService } from './mail/mail.producer.service';

export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailProducerService: MailProducerService,
  ) {}

  async register(registerDTO: RegisterDTO) {
    if (await this.userModel.findOne({ email: registerDTO.email })) {
      throw new ConflictException('User alredy exists');
    }
    registerDTO.password = hashSync(registerDTO.password, 10);
    const user = await this.userModel.create(registerDTO);

    const html = readFileSync(
      `${__dirname}/mail/register.template.hbs`,
    ).toString();
    const mailTemplate = compileMailTemplate(html);

    const token = this.jwtService.sign({ id: user.id });

    this.mailProducerService.sendMail(
      mailTemplate({
        username: user.firstName,
        link: `${this.configService.get(
          'STUDYT_FRONT_URL',
        )}/confirmation/${token}`,
      }),
      user.email,
    );

    user.password = undefined;
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userModel
      .findOne({ email })
      .select('password email confirmed')
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException('Wrong password');
    }
    if (!user.confirmed) {
      throw new UnauthorizedException('Verify your email');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      name: user.firstName,
    });
    return {
      token,
    };
  }

  async confirmToken(token: string) {
    const id = this.jwtService.verify(token)['id'];
    return await this.userModel.findByIdAndUpdate(id, { confirmed: true });
  }

  @UseGuards(JwtGuard)
  async findAllUsers() {
    return this.userModel.find().populate('subjects');
  }
}
