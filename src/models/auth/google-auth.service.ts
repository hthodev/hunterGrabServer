import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class GoogleAuthService {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async verifyToken(credential: string) {
    try {
      const ticket = await this.client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
    } catch (error) {
      console.log("error", error);
      throw Error(error)
    }
  }
}
