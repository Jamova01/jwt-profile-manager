"use server";
import { createSession, deleteSession, getSession } from "@/lib/session";

export async function loginAction(access: string, refresh: string) {
  await createSession(access, refresh);
}

export async function logoutAction() {
  await deleteSession();
}

export async function getSessionAction() {
  return await getSession();
}
