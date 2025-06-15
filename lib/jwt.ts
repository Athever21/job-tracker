// lib/auth/jwt.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new Error('Missing JWT_SECRET in env');

export interface JwtPayload {
  userId: string;
  email: string;
  // Add other claims here as needed
}

const EXPIRES_IN = '7d'; // Adjust as needed

export function signJwt(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  });
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as unknown as JwtPayload;
  } catch (err) {
    return null;
  }
}

// Optional: extract token from Bearer header
export function getTokenFromHeader(req: Request): string | null {
  const auth = req.headers.get('authorization');
  
  if (!auth?.startsWith('Bearer ')) return null;

  return auth.slice(7);
}
