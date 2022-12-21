import jwt, { JwtPayload } from 'jsonwebtoken';

export const AddMinutesToDate = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60000);
};

export const DecodeJWT = (token: string): JwtPayload => {
  // Decodes JWT token
  const jwtPayload = jwt.decode(token);

  return jwtPayload as JwtPayload;
};

export const isNullOrWhitespace = function (input: string): boolean {
  if (typeof input === 'undefined' || input === null) {
    return true;
  }
  return input.replace(/\s/g, '').length < 1;
};
