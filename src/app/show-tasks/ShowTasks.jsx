"use client";
import UserContext from "@/context/userContext";
import React, { useContext, useEffect, useState } from "react";
import Task from "./Task";
import { toast } from "react-toastify";
import { deleteTask, getTasksOfUser } from "@/services/taskServices";
const ShowTasks = () => {
  // initially task is empty
  const [tasks, setTasks] = useState([]);

  // taking context for getting userID in the useEffect
  const context = useContext(UserContext);

  // Runs the first time page is loaded
  useEffect(() => {
    // sending the user data from the frontend context
    if (context.user) {
      loadTasks(context.user._id);
    }
  }, [context.user]);

  // function to load the tasks
  async function loadTasks(userID) {
    try {
      // call the api created in taskService
      const tasks = await getTasksOfUser(userID);
      // console.log(tasks);
      // show tasks with newest added task in the top
      setTasks([...tasks].reverse());
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTaskParent(tasksId) {
    try {
      const result = await deleteTask(tasksId);
      // console.log(result);
      const newTasks = tasks.filter((item) => item._id != tasksId);
      setTasks(newTasks);
      toast.success("Your task is deleted ");
    } catch (error) {
      // console.log(error);
      toast.error("Error in deleting task !!");
    }
  }

  return (
    <div className="grid grid-cols-12 mt-3">
      <div className="col-span-6 col-start-4">
        <h1 className="text-3xl mb-3 ">Your tasks ( {tasks.length} )</h1>
        {/*showing tasks by mapping the tasks from the task useState() into
        individual components */}
        {tasks.map((task) => (
          <Task
            task={task}
            key={task._id}
            deleteTaskParent={deleteTaskParent}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowTasks;
