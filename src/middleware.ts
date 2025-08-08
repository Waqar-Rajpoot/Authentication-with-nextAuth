import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";



export default withAuth(
  function middleware() {
    console.log("Middleware running");
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token , req}) => {
        console.log("Token: ", token);
        const {pathname} = req.nextUrl;

        if (
          pathname.startsWith("/verifyemail") ||
          pathname === "/login" ||
          pathname === "/signup"
        ) {
          return true;
        }


        // public path
        // if(
        //   pathname === "/" ||
        //   pathname.startsWith("/api/products") ||
        //   pathname.startsWith("/products") 
        // ){
        //   return true;
        // }

        // Admin routes required admin role
        if(pathname.startsWith("/admin")){
          return token?.role === "admin"
        }

        // All other routes required authentication
        return !!token
      
      },
    },
  }
)


export const config = {
  matcher: [
    "/",
    "/profile",
    "/profile/:path*",
    "/login",
    "/signup",
    "/verifyemail",
    "/admin/:path*",
  ],
};
