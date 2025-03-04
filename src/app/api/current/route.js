import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/app/models/user";

export async function GET(request) {
  const auth_token = request.cookies.get("authToken")?.value;
  const data = jwt.verify(auth_token, process.env.JWT_KEY);
  const user = await User.findById(data._id).select("-password");
  return NextResponse.json(user);
}
