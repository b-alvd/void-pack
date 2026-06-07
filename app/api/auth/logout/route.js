import { NextResponse } from "next/server";
import { destroySession } from "@/src/lib/session";
export async function GET(request) {
  await destroySession();
  return NextResponse.redirect(new URL("/", request.url));
}
