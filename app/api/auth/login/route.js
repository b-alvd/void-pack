import { getAuthorizeUrl } from "@/src/lib/discord";
export async function GET() {
  return Response.redirect(getAuthorizeUrl(), 302);
}
