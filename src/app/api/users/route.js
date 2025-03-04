import { NextResponse } from "next/server";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";

export async function GET(request) {
  // Initialize an empty array to store user data
  let users = [];

  try {
    // Fetch all users from the database using Mongoose's find() method
    users = await User.find();

    // Return the retrieved user data as a JSON response
    return NextResponse.json(users);
  } catch (err) {
    // Log the error if fetching users fails
    console.log(err);

    // Return an error response if an exception occurs
    return NextResponse.json({ message: "Failed to get users" });
  }
}

export async function POST(request) {
  const { name, email, password, about, profileURL } = await request.json();

  const user = new User({
    name,
    email,
    password,
    about,
    profileURL,
  });
  try {
    // encrypting the password using the key stored in the env file ( SALT is length of the number )
    // when we import it from the env then it comes as a string
    // but for bcrypt.hash() it expects the salt to be a number
    // therefore we convert it to a number
    // NOTE : The Encryption is one way
    user.password = await bcrypt.hash(
      user.password,
      parseInt(process.env.BCRYPT_SALT)
    );
    console.log(user);
    await user.save();
    return NextResponse.json({ message: user }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message,
      },
      { status: 500 }
    );
  }
}
