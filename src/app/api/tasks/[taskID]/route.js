import { getResponseMessage } from "@/helper/responceMessage";
import { Task } from "@/app/models/task";
import { NextResponse } from "next/server";

// get single tasks:
export async function GET(request, { params }) {
  const { taskID } = await params;

  try {
    console.log(taskID);
    const task = await Task.findById(taskID);
    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    return getResponseMessage("Error in getting task !!", 404, false);
  }
}

// Update task
export async function PUT(request, { params }) {
  try {
    // Extract the task ID from the request parameters
    const { taskID } = await params;

    // Take input of new task title, content, and status from the user
    const { title, content, status } = await request.json();

    // Find the task in the database using the task ID
    let task = await Task.findById(taskID);

    console.log(taskID);
    console.log(task);
    console.log(title, content, status);

    // Update the task with the new title, content, and status
    task.title = title;
    task.content = content;
    task.status = status;

    // Save the updated task back to the database
    const updatedTask = await task.save();

    // Return the updated task as a response
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.log(error);
    return getResponseMessage("Error in updating task !! ", 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    const { taskID } = await params;

    await Task.deleteOne({
      _id: taskID,
    });
    return getResponseMessage("Task Deleted !!", 200, true);
  } catch (error) {
    console.log(error);
    return getResponseMessage("Error in deleting Task !", 500, false);
  }
}
