import { SignJWT, jwtVerify, JWTPayload } from "jose";

export const SESSION_COOKIE = "bh_session";

export type SessionFields = {
  sub: string;
  username: string;
  name: string;
  role: string;
  grade: string | null;
};

export type SessionPayload = JWTPayload & SessionFields;

function secret() {
  return new TextEncoder().encode(
    process.env.AUTH_SECRET ?? "brightville-dev-secret-do-not-use-in-prod"
  );
}

export async function createSession(payload: SessionFields) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifySession(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as SessionPayload;
  } catch {
    return null;
  }
}
