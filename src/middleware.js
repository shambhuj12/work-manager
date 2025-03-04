import { NextResponse } from "next/server";

export function middleware(request) {
  // Whenever any of the paths stated in the config array are accessed the middleware runs first
  console.log("Middleware executed");

  // suppose anyone tries to access the api/login i.e. filling the form and then pressing the login button
  // then no other checks are performed.
  // this allows the user to sign in without any other checks
  if (
    request.nextUrl.pathname === "/api/login" ||
    request.nextUrl.pathname === "/api/users"
  ) {
    return;
  }

  // we check if the authToken exists in the cookie
  // if it does then auth_token will have some value
  // otherwise we are using '?' syntax to set it as undefined
  const auth_token = request.cookies.get("authToken")?.value;

  // The paths /login and /signup
  // i.e. both login and signup page should not be accessible to the user if logged in already
  // if such path is being accessed then loggedInUserNotAccessPaths is set to true
  const loggedInUserNotAccessPaths =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  // if the user is trying to access login or signup page
  if (loggedInUserNotAccessPaths) {
    // check if auth_token is present i.e. user is logged in already
    if (auth_token) {
      // if the user is logged in then redirect to profile/user page
      return NextResponse.redirect(new URL("/profile/user", request.url));
    }
  } else {
    if (!auth_token) {
      if (request.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.json({
          message: "Not authenticated.",
          status: 404,
        });
      }
      // if the user is not logged in then redirect to /login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // console.log(auth_token);
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/add-task",
    "/show-tasks",
    "/profile/:path*",
    "/api/:path*",
  ],
};
