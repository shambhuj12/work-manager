"use client";
import React from "react";
import loginSvg from "../../assets/login.svg";
import Image from "next/image";
import { useState } from "react";
import { addTask } from "@/services/taskServices";
import { toast } from "react-toastify";

const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "",
  });

  const handleAddTask = async (event) => {
    event.preventDefault();
    console.log(task);

    try {
      const result = await addTask(task);
      toast.success("Your task has been added", { position: "top-center" });
      setTask({
        title: "",
        content: "",
        status: "",
      });
    } catch (err) {
      toast.error("Failed " + err.response.data.message, {
        position: "top-center",
      });
      console.log(err.message);
    }
  };

  const resetForm = () => {
    setTask({
      title: "",
      content: "",
      status: "",
    });
  };

  return (
    <div className="grid grid-cols-10 justify-center">
      <div className=" col-span-4 col-start-4 p-5">
        <div className="flex justify-center mb-5 pb-5">
          <Image
            src={loginSvg}
            style={{ width: "50%" }}
            alt="Image of adding task"
          ></Image>
        </div>
        <h1 className="text-3xl text-center">Add your task here !!</h1>

        <form
          action="#!"
          onSubmit={handleAddTask}
        >
          <div className="mt-4">
            <label
              htmlFor="task_title"
              className="block text-sm font-medium mb-2 "
            >
              Title
            </label>
            <input
              type="text"
              id="task_title"
              name="task_title"
              onChange={(event) => {
                setTask({
                  ...task,
                  title: event.target.value,
                });
              }}
              value={task.title}
              className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
            ></input>

            <div className="mt-4">
              <label
                htmlFor="task_content"
                className="block text-sm font-medium mb-2"
              >
                Content
              </label>
              <textarea
                className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
                id="task_content"
                rows={5}
                name="task_content"
                onChange={(event) => {
                  setTask({
                    ...task,
                    content: event.target.value,
                  });
                }}
                value={task.content}
              />

              <div className="mt-4">
                <label
                  htmlFor="task_status"
                  className="block text-sm font-medium mb-2"
                >
                  Status
                </label>
                <select
                  id="task_status"
                  className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
                  name="task_status"
                  onChange={(event) => {
                    setTask({
                      ...task,
                      status: event.target.value,
                    });
                  }}
                  value={task.status}
                >
                  <option
                    value="none"
                    disabled
                  >
                    ---Select Status---
                  </option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                className="bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800"
                type="submit"
              >
                Add Task{" "}
              </button>
              <button
                className="bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 ms-3"
                onClick={resetForm}
                type="button"
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
