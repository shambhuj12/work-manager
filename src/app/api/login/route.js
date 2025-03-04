import { NextResponse } from "next/server";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const user = await User.findOne({ email: email });
    if (user === null) {
      throw new Error("User not found");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("Password incorrect");
    }

    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_KEY
    );

    console.log(user);
    const response = NextResponse.json(
      { message: "Login Success", user },
      { status: 200 }
    );
    response.cookies.set("authToken", token);

    // return response
    return response;
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
