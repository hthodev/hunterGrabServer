import { HttpException } from '@nestjs/common';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Types } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export function hashPassword(password) {
  const saltRounds = 10;
  const salt = genSaltSync(saltRounds);
  return hashSync(password, salt);
}

export function comparePassword(password, hashPassworded) {
  return compareSync(password, hashPassworded);
}

export function signToken(user) {
  const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/g, '\n')!;

  if ('password' in user) {
    delete user.password;
  }
  return {
    token: sign(
      { ...user, exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 },
      privateKey,
      { algorithm: 'RS256' },
    ),
    refresh: null,
  };
}

export function formatDate(dateString: string | Date): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function stringId(objectId: Types.ObjectId) {
  return objectId.toString();
}

export function randomString(length = 5) {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
