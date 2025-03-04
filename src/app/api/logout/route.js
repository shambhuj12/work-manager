import { NextResponse } from "next/server";
export async function POST() {
  try {
    const response = NextResponse.json(
      { message: " Logged Out" },
      { status: 201 }
    );

    response.cookies.set("authToken", "");
    console.log("Logged Out");
    return response;
  } catch (err) {
    console.log("Error while Logging Out");
    NextResponse.json({ message: err.message }, { status: 500 });
  }
}
