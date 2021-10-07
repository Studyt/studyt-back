import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { scrypt } from 'crypto';
import {
	NotFoundException,
	UnauthorizedException,
	ConflictException,
	UseGuards,
	Logger,
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
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailProducerService: MailProducerService
  ) {}

  async register(registerDTO: RegisterDTO) {
  	if (await this.userModel.findOne({ email: registerDTO.email })) {
  		throw new ConflictException('User alredy exists');
  	}
  	// const salt = crypto.randomBytes(16).toString("hex");
  	  scrypt(registerDTO.password, this.configService.get('STUDYT_SECRET'), 64, (err, pass)=>{
  		registerDTO.password = `${this.configService.get('STUDYT_SECRET')}:${pass.toString('hex')}`;
  	});
  	const user = await this.userModel.create(registerDTO);

  	const html = readFileSync(
  		`${__dirname}/mail/register.template.hbs`
  	).toString();
  	const mailTemplate = compileMailTemplate(html);

  	const token = this.jwtService.sign({ id: user.id });

  	this.mailProducerService.sendMail(
  		mailTemplate({
  			username: user.firstName,
  			link: `${this.configService.get('STUDYT_FRONT_URL')}/confirmation/${token}`,
  		}),
  		user.email
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
  	const [secret, hashedPassword] = user.password.split(':');
  	scrypt(password, secret, 64, (err, pass)=>{
  		if (hashedPassword === pass.toString('hex')){
  			throw new UnauthorizedException('Wrong password');
  		}
  	});
  	if (!user.confirmed) {
  		throw new UnauthorizedException('Verify your email');
  	}
  	this.logger.log(user);
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
  	const { id } = this.jwtService.verify(token);
  	return await this.userModel.findByIdAndUpdate(id, { confirmed: true });
  }

  @UseGuards(JwtGuard)
  async findAllUsers() {
  	return this.userModel.find().populate('subjects');
  }

  @UseGuards(JwtGuard)
  async findById(id: string) {
  	return this.userModel.findById(id).populate('subjects');
  }
}
