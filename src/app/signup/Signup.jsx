"use client";
import React from "react";
import signUpSvg from "../../assets/signup.svg";
import Image from "next/image";
import { useState } from "react";
import { addUser } from "@/services/userServices";
import { toast } from "react-toastify";
const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    profileURL: "https://i.sstatic.net/YaL3s.jpg",
  });

  const doSignup = async (event) => {
    event.preventDefault();
    // console.log(data);

    try {
      const result = await addUser(data);
      toast.success("User is Signed Up", { position: "top-center" });
      setData({
        name: "",
        email: "",
        password: "",
        about: "",
      });
    } catch (err) {
      toast.error("Failed " + err.response.data.message, {
        position: "top-center",
      });
      console.log(err.message);
    }
  };
  const resetForm = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  return (
    <div className=" grid grid-cols-12">
      <div className="col-span-4 col-start-5 p-4">
        <div className="py-5">
          <div className="flex justify-center mb-4 pb-5">
            <Image
              src={signUpSvg}
              style={{ width: "70%" }}
              alt="Image of Signup"
            ></Image>
          </div>
          <h1 className="text-3xl text-center ">Signup Here</h1>
          <form
            action="#!"
            className="mt-5"
            onSubmit={doSignup}
          >
            <div className="mt-3">
              <label
                htmlFor="user_name"
                className="block text-sm font-medium mb-2 ps-3"
              >
                Username
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
                placeholder="Enter here"
                id="user_name"
                name="user_name"
                onChange={(event) => {
                  setData({ ...data, name: event.target.value });
                }}
                value={data.name}
              ></input>
            </div>

            <div className="mt-3">
              <label
                htmlFor="user_email"
                className="block text-sm font-medium mb-2 ps-3"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
                placeholder="Enter here"
                id="user_email"
                name="user_email"
                onChange={(event) => {
                  setData({ ...data, email: event.target.value });
                }}
                value={data.email}
              ></input>
            </div>

            <div className="mt-3">
              <label
                htmlFor="user_password"
                className="block text-sm font-medium mb-2 ps-3"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
                placeholder="Enter here"
                id="user_password"
                name="user_password"
                onChange={(event) => {
                  setData({ ...data, password: event.target.value });
                }}
                value={data.password}
              ></input>
            </div>

            <div className="mt-3">
              <label
                htmlFor="user_about"
                className="block text-sm font-medium mb-2 ps-3"
              >
                About
              </label>
              <textarea
                className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
                placeholder="Enter here"
                id="user_about"
                rows={5}
                name="user_about"
                onChange={(event) => {
                  setData({ ...data, about: event.target.value });
                }}
                value={data.about}
              ></textarea>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                className="bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800"
                type="submit"
              >
                Sign Up
              </button>
              <button
                type="button"
                className="bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 ms-3"
                onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
