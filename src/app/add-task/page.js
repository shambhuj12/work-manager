import React from "react";
import AddTask from "./AddTask";
export const metadata = {
  title: "Add Task : Work Manager",
};

// as the task is done as an client side component therefore the title and metadata will not work
// therefore here we are adding title and metadata as an server side component
// then inside of it we are adding our client side component
function page() {
  return <AddTask></AddTask>;
}

export default page;
