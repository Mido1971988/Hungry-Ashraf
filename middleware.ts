import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    const token = await getToken({ req: request });
    const isAuth = !!token;
    if (isAuth) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = { matcher: ["/signIn"] };
