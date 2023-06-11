import React, { useContext, useState,useEffect } from "react";
import { TransactionContextUser } from "../context/TransactionContextUser";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { shortenAddress } from "../utils/shortenAddress";
import Loader from "./Loader";
import Bookings from "./Bookings";

const url = "http://localhost:8000/api/ParkingLot/driverWithCartype";
const book_url = 'http://localhost:8000/api/book/bookSlot';

const ParkingLot = ({ plData }) => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContextUser);
  const [drivers, setAllDrivers] = useState(false);
  const [Loader,setLoader]=useState(false);
  const [msg, setMsg] = useState();


  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("");
    }, 8000);
    return () => clearTimeout(timer);
  }, [msg]);

  // Booking Transaction
  const handleClick = async(plData) => {
    setLoader(true)
    const valid = await sendTransaction(plData);
    console.log(valid)
    if(valid){
      console.log("hi")
      try {
        const response = await fetch(book_url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          // Adding body or contents to send
          body: JSON.stringify(plData)
        });
        const data = await response.json();
        if (response.ok) {
          setMsg("Success")
        }
        else {
          setMsg(`Error :  ${data.Error}`);
        }
        console.log(data);
      } catch(err) {
        console.log(err)
        setMsg("Something went wrong. Please try again.")
      }
    }
    setLoader(false)
  }


  let cartype;
  const selectVehicleType = async (e) => {
    console.log(e.target.id)
    cartype = e.target.id;

    const token = localStorage.getItem("token");
    // console.log(token);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          // "auth-token": token,
        },
        // Adding body or contents to send
        body: JSON.stringify({ cartype })
      });
      const data = await response.json();
      console.log(data);
      if(data.length==0){
        setMsg("No available driver with selected vehicle type please choose another.")
      }
      else{
        setMsg("");
      }
      setAllDrivers(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className="flex gap-10">
        {!currentAccount && (
          <div>
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
            {isLoading && <Loader />}
          </div>
        )}
        <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
          <div className="flex justify-between flex-col w-full h-full">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                <SiEthereum fontSize={21} color="#fff" />
              </div>
              <BsInfoCircle fontSize={17} color="#fff" />
            </div>
            <div>
              <p className="text-white font-light text-sm">
                {shortenAddress(currentAccount)}
              </p>
              <p className="text-white font-semibold text-lg mt-1">
                Ethereum
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center item-center flex-col">
          <h1 className="text-white text-center">Select Car Type</h1>
          <div className='flex gap-2 justify-center mt-10 mb-10'>
            <button class="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
              <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span class="relative" id="Bike" onClick={selectVehicleType}>Bike</span>
            </button>
            <button class="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
              <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span class="relative" id="Auto" onClick={selectVehicleType}>Auto</span>
            </button>
            <button class="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
              <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span class="relative" id="HatchBack" onClick={selectVehicleType}>HatchBack</span>
            </button>
            <button class="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
              <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span class="relative" id="Minisuv" onClick={selectVehicleType}>Mini SUV</span>
            </button>
            <button class="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
              <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span class="relative" id="Sedan" onClick={selectVehicleType}>Sedan</span>
            </button>
            <button class="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
              <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span class="relative" id="SUV" onClick={selectVehicleType}>SUV</span>
            </button>
          </div>
        </div>

      </div>
      <div className="flex justify-center item-center flex-col">

        <h1 className="text-white text-center">Select Your Driver</h1>
        <h2 className="text-red-700">{msg}</h2>
        <div className="flex gap-2 flex-wrap">
        {drivers && drivers.map((plData) => {
          console.log(plData)
          return (
            <div className="p-6 border border-gray-200 rounded-lg shadow bg-gray-800 text-white border-gray-700" style={{ width: '600px' }}>
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-yellow-300">{plData.Name}</h5>
              </a>
              <div className="flex ">
                <div >
                  <h4>Phone No. : &nbsp;</h4>
                </div>

                <div>
                  <h4 style={{ color: 'greenyellow' }}>{plData.Phone}</h4>
                  
                </div>
              </div>
              <div className='flex justify-center mt-10 mb-10'>
                <button class="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                  <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span class="relative" onClick={()=>handleClick(plData)}>Confirm</span>
                </button>
              </div>
            </div>)
        })
        }
        </div>
      </div>
      <Bookings />
    </div>
  );
};

export default ParkingLot;
