import { jwtVerify } from 'jose';

export async function checkToken(token: string) {
  const secret = new TextEncoder().encode("supersecretstring123");

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}
