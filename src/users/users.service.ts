import {
   ConflictException,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth.dto';
import { updateProfileDto } from './dto/update-profile.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
   constructor(
      @InjectModel(User.name) private readonly userModel: Model<userDocument>,
      private jwtService: JwtService,
   ) {}

   async signup(authCredentialsDto: AuthCredentialsDto) {
      const { email, password, isSeller } = authCredentialsDto;

      const exists = await this.userModel.findOne({
         email,
      });

      if (exists) {
         throw new ConflictException('This email is already registerd');
      }

      const user = new this.userModel();
      user.email = email;
      user.isSeller = isSeller;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);

      return await user.save();
   }

   async signin(authCredentialsDto: AuthCredentialsDto) {
      const { email, password } = authCredentialsDto;

      const user = await this.userModel.findOne({ email });

      const isValid = await this.validatePassword(
         password,
         user.salt,
         user.password,
      );

      if (user && isValid) {
         const payload = { userId: user._id, isSeller: user.isSeller };
         const accessToken = await this.jwtService.sign(payload);
         return { user, accessToken };
      } else {
         throw new UnauthorizedException('Invalid credentials');
      }
   }

   async findById(id: string) {
      return await this.userModel.findById(id);
   }

   async update(id: string, updateProfileDto: updateProfileDto) {
      return await this.userModel.findByIdAndUpdate(id, updateProfileDto);
   }

   async validatePassword(
      password: string,
      salt: string,
      storedPassword: string,
   ): Promise<boolean> {
      const hash = await bcrypt.hash(password, salt);

      // Compare hashed stored password with enterd password
      return hash === storedPassword;
   }

   private async hashPassword(password: string, salt: string) {
      return bcrypt.hash(password, salt);
   }
}
