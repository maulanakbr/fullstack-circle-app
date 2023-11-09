import type { Response } from 'express';
import { Service } from 'typedi';

import type {
  SignInPayload,
  SignInResponse,
  SignUpPayload,
} from '@/interfaces/auth.interface';
import type { User } from '@/interfaces/user.interface';
import { HttpException } from '@/exceptions/httpException';
import { comparePassword } from '@/utils/hash';
import { jwtSign } from '@/utils/jwt';
import UserRepository from '@/repositories/user.repository';

@Service()
export class AuthService extends UserRepository {
  public async signUp(authData: SignUpPayload): Promise<User> {
    const isEmailExist = await this.findUserByEmail(authData.email);
    if (isEmailExist)
      throw new HttpException(409, 'Email already exists in the database');

    const signedUpUserData: User = this.userRepo.create(authData);
    await this.userRepo.save(signedUpUserData);

    return signedUpUserData;
  }

  public async signIn(authData: SignInPayload): Promise<SignInResponse> {
    const isEmailExist = await this.findUserByEmail(authData.email);
    if (!isEmailExist) throw new HttpException(409, 'Email does not exist');

    const { password, ...data } = Object.assign({}, isEmailExist);
    const isValidPassword = comparePassword(authData.password, password);
    if (!isValidPassword)
      throw new HttpException(409, 'Password does not match');

    const token = jwtSign({ id: isEmailExist.id });
    return { data, token };
  }

  public async checkIfSignedIn(payload: Response) {
    const session = payload.locals.session;

    // const sessionCached= await client.get('sessionId')
    const currentUser = this.findUserById(session.id);

    return currentUser;
  }
}
