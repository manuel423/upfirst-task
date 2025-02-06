import { SignJWT } from "jose";

export async function generateToken(
  payload: any,
  isRefresh?: boolean
): Promise<string> {
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || "super-secret"
  );

  const alg = "HS256";
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setExpirationTime(isRefresh ? "7d" : "1h") // Refresh token lasts for 7 days
    .sign(secret);

  return token;
}
