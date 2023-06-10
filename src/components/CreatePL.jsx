import React, { useState, useContext, useEffect } from "react";
import { Loader } from ".";
import MapComponent from "./MapComponent";

const url = "http://localhost:8000/api/ParkingLot/createDriver";
const CreatePL = ({ allPL }) => {
  const [msg, setMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [markerPosition, setMarkerPosition] = useState({
    lat: 34.126405,
    lng: 74.835872,
  });
  const [showMap, setShowMap] = useState(false);
  console.log(allPL.length);
  const defaultValue = {
    Name: "",
    WalletAddress: "",
    VehicleType: "",
  };
  const [ParkingLot, setParkingLot] = useState(defaultValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [msg]);

  const handleSubmit = async (e) => {
    console.log(ParkingLot);
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
        // Adding body or contents to send
        body: JSON.stringify(ParkingLot),
      });
      const data = await response.json();
      if (response.ok) {
        setMsg("Success");
      } else {
        setMsg(`Error :  ${data.Error}`);
      }
      setParkingLot(defaultValue);
      console.log(data);
      setIsLoading(false);
    } catch {
      setMsg("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const onChange = (e) => {
    setParkingLot((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = () => {
    setShowMap(true);
  };
  return (
    <>
      <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
        <input
          className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
          value={ParkingLot.Name}
          placeholder="Driver Name"
          name="Name"
          type="text"
          onChange={onChange}
        />
        <input
          className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
          value={ParkingLot.WalletAddress}
          placeholder="Your Wallet Address"
          name="WalletAddress"
          type="text"
          onChange={onChange}
        />
        <input
          className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
          value={ParkingLot.VehicleType}
          placeholder={[
            "Car Type : ",
            "BIKE",
            "AUTO",
            "HATCHBACK",
            "MINI SUV",
            "SEDAN",
            "SUV",
          ]}
          name="VehicleType"
          type="text"
          onChange={onChange}
        />

        <div className="h-[1px] w-full bg-gray-400 my-2" />

        {isLoading ? (
          <Loader />
        ) : (
          <button
            disabled={allPL.length}
            type="button"
            onClick={handleSubmit}
            className={allPL.length!==0?"text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full disabled:opacity-25":"text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"}
          >
            Create Driver
          </button>
        )}
        <h2
          style={
            msg === "Success" ? { color: "#2e7d32" } : { color: "#c62828" }
          }
        >
          {msg}
        </h2>
      </div>
      {showMap && (
        <MapComponent
          setMarkerPosition={setMarkerPosition}
          setShowMap={setShowMap}
          markerPosition={markerPosition}
        />
      )}
    </>
  );
};

export default CreatePL;
