import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, userDocument } from 'src/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(
      @InjectModel(User.name) private readonly userModel: Model<userDocument>,
   ) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: 'meik',
      });
   }

   async validate(payload) {
      console.log(payload);
      
      const { userId } = payload;
      const user = await this.userModel.findById(userId);
      if (!user) {
         throw new UnauthorizedException();
      }

      return user;
   }
}
