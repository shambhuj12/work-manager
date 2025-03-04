import { getResponseMessage } from "@/helper/responceMessage";
import { Task } from "@/app/models/task";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userID } = await params;

  try {
    const tasks = await Task.find({
      userID,
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    return getResponseMessage("Failed to get tasks", 404, false);
  }
}
