import React, { Component, useState } from "react";
import '../../src/App.css'
import Loader from "./Loader";
import { Outlet, Link ,useNavigate} from "react-router-dom";
// import { useHistory } from 'react-router-dom';

const url = 'http://localhost:8000/api/auth/login';
const SignInForm = ({ setSignIn, setLogin, setIsAdmin, setUser, setPendingPL, setAllPL,allPL }) => {

  const [info, setInfo] = useState({ email: '', password: '' });
  const [errmsg, setErrmsg] = useState();
  const [loader, setLoader] = useState(false);
  const navigateTo = useNavigate();
  const handleChange = (e) => {
    // console.log(localStorage.getItem('token'))
    setInfo((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    // console.log(info);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        // Adding body or contents to send
        body: JSON.stringify(info)
      });
      const data = await response.json();
      if (!response.ok) {
        setErrmsg("Invalid Credentials.");
        setLoader(false)
        return;
      }
      localStorage.setItem('token', data.authToken)
      if (data.Admin != undefined) {
        setPendingPL(data.allParkingLots)
        console.log(data).allParkingLots;

        setUser("Admin");
        setIsAdmin(true);
      }
      else {
        setAllPL(data.allParkingLots);
        console.log(data.userType);
        console.log(data);
        setUser(data.name);
        if(data.userType=='rider')
        navigateTo('/user')
      }
    } catch (error) {
      console.log(error);
      setErrmsg("Something went wrong. Please try again")
      setLoader(false)
      return;
    }
    setLogin(true);

  }

  const onClick = () => {
    setSignIn(false)
  }
  // const history = useHistory();
  const navigateUser =()=>{
    // history.push('/user');
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="appForm">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1 style={{ width: '85%', textAlign: 'center', color: 'white', fontFamily: 'sans-serif', fontSize: '22 px', fontWeight: 'bold' }}>Sign In</h1>
          <button className="btn-primary" onClick={onClick} style={{ width: '20%', textAlign: 'center', color: 'grey', fontFamily: 'sans-serif', fontSize: '22 px', fontWeight: 'bold' }}>Sign Up</button>
        </div>
        <h2 style={{ textAlign: 'center', color: 'red', marginLeft: '-50px' }}>{errmsg}</h2>
        <div className="formCenter">
          <form className="formFields" onSubmit={handleSubmit}>
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
              <button class="relative inline-flex items-center justify-start inline-block px-14 py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group">
                <span class="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">Sign In</span>
              </button>

              {loader ? (<Loader />) : ""}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
