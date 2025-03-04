import User from "@/app/models/user";
import { NextResponse } from "next/server";
export async function DELETE(request, { params }) {
  try {
    // Extract user ID from request parameters
    const { userID } = await params;

    // Delete the user from the database using the provided ID
    await User.deleteOne({ _id: userID });

    // Return a success response
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (err) {
    // Return an error response if deletion fails
    return NextResponse.json({ message: err.message });
  }
}

export async function GET(request, { params }) {
  try {
    // Extract userID from request parameters
    const { userID } = params;

    // Find the user by ID in the database
    const user = await User.findById(userID);

    // If the user is not found, return an error response
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return the found user as a JSON response
    return NextResponse.json(user);
  } catch (err) {
    // Return an error response in case of any failure
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    // Extract userID from request parameters
    const { userID } = params;

    // A random dummy name
    const newName = "John Doe";

    // Find the user and update their name
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { name: newName }, // Updating only the name
      { new: true } // Returns the updated user document
    );

    // If the user is not found, return an error response
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return the updated user details
    return NextResponse.json(updatedUser);
  } catch (err) {
    // Return an error response in case of any failure
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
