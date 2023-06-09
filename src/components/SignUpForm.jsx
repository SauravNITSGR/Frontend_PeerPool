import React, { Component, useState } from "react";
import Loader from "./Loader";

const url = "http://localhost:8000/api/auth/createUser";

const SignUpForm = ({ setSignIn, setLogin, setUser }) => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
    name: "",
    userType: "",
    phone:""
  });
  const [loader, setLoader] = useState(false);
  const [errmsg, setErrmsg] = useState();

  const handleChange = (e) => {
    // console.log(e.target.value)
    setInfo((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    console.log(document.getElementById("rider").checked);
    console.log(document.getElementById("driver").checked);
    let a=document.getElementById("driver").checked;
    console.log(a);
    let data2=info;
    data2.userType=a?"driver":"rider"
    // setInfo((prevState) => ({ ...prevState, [userType]: [a?"driver":"rider"] }));
    setLoader(true);
    e.preventDefault();
    console.log("The form was submitted with the following data:");
    console.log(data2);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        // Adding body or contents to send
        body: JSON.stringify(data2),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrmsg("User for this email already exists. Please Sign In");
        setLoader(false);
        return;
      }
      localStorage.setItem("token", data.authToken);
      setUser(data.name);
      console.log(data);
    } catch (error) {
      setErrmsg("Something went wrong. Please try again.");
      setLoader(false);
      console.log(error);
      return;
    }
    setLogin(true);
  };

  const onClick = () => {
    setSignIn(true);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="appForm">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1
            style={{
              width: "85%",
              textAlign: "center",
              color: "white",
              fontFamily: "sans-serif",
              fontSize: "22 px",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </h1>
          <button
            className="btn-primary"
            onClick={onClick}
            style={{
              width: "20%",
              textAlign: "center",
              color: "grey",
              fontFamily: "sans-serif",
              fontSize: "22 px",
              fontWeight: "bold",
            }}
          >
            Sign In
          </button>
        </div>
        <h2 style={{ textAlign: "center", color: "red", marginLeft: "-50px" }}>
          {errmsg}
        </h2>
        <div className="formCenter">
          <form onSubmit={handleSubmit} className="formFields">
            <div className="formField">
              <label className="formFieldLabel" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="formFieldInput text-black"
                placeholder="Enter your full name"
                name="name"
                value={info.name}
                onChange={handleChange}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel">Select User Type</label>
              <div class="flex items-center mb-4">
                <input
                handleChange={handleChange}
                  id="rider"
                  type="radio"
                  value=""
                  name="default-radio"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                ></input>
                <label
                  for="default-radio-1"
                  class="ml-2 text-sm font-medium text-white dark:text-gray-300"
                >
                  Rider
                </label>
              </div>
              <div class="flex items-center">
                <input
                handleChange={handleChange}
                  checked
                  id="driver"
                  type="radio"
                  value=""
                  name="default-radio"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                ></input>
                <label
                  for="default-radio-2"
                  class="ml-2 text-sm font-medium text-white dark:text-gray-300"
                >
                  Driver
                </label>
              </div>
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">
                E-Mail Address
              </label>
              <input
                type="email"
                id="email"
                className="formFieldInput text-black"
                placeholder="Enter your email"
                name="email"
                value={info.email}
                onChange={handleChange}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="phone">
                Phone No.
              </label>
              <input
                type="number"
                id="phone"
                className="formFieldInput text-black"
                placeholder="Enter your email"
                name="phone"
                value={info.phone}
                onChange={handleChange}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="formFieldInput text-black"
                placeholder="Enter your password"
                name="password"
                value={info.password}
                onChange={handleChange}
              />
            </div>

            <div className="formField">
              <button
                href="#_"
                class="relative inline-flex items-center justify-start inline-block px-14 py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group"
              >
                <span class="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">
                  Sign Up
                </span>
              </button>
            </div>
            {loader ? <Loader /> : ""}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
