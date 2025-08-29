import "server-only";
import { cookies } from "next/headers";

export type SessionPayload = {
  access: string;
  refresh: string;
};

export async function createSession(access: string, refresh: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  cookieStore.set("access_token", access, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("refresh_token", refresh, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access_token")?.value;
  const refresh = cookieStore.get("refresh_token")?.value;

  if (!access || !refresh) return null;
  return { access, refresh };
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}
