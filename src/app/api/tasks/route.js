import { getResponseMessage } from "@/helper/responceMessage";
import { Task } from "../../models/task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// GET all the tasks
export async function GET(request) {
  try {
    const tasks = await Task.find();
    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    return NextResponse(
      { message: "Error in Getting the Data" },
      { status: 404 }
    );
  }
}

// Create all the tasks
export async function POST(request) {
  const { title, content, status } = await request.json();

  // getting logged in userID
  const auth_token = request.cookies.get("authToken")?.value;
  const data = jwt.verify(auth_token, process.env.JWT_KEY);

  try {
    const task = new Task({
      title,
      content,
      userID: data._id,
      status,
    });

    await task.save();
    return NextResponse.json({ message: task }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
