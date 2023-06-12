import React, { useContext,useState } from "react";

import AllParkingLot from "./AllParkingLot";
import "./AllParkingLot.css";
import Update from "./Update";


const ParkingLotsProvider = ({allPL}) => {
  const [showUpdate,setShowUpdate]=useState(false);
  const [parkingLot,setParkingLot]=useState(false);
  const [hide,setHide]=useState(false);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4 justify-center items-center">
          <h3 className="text-white text-3xl text-center my-2">
            Your Bookings
          </h3>
        {showUpdate && <Update setShowUpdate={setShowUpdate} setHide={setHide} parkingLot={parkingLot}/>}
        <div className="flex flex-wrap justify-center items-center mt-10 w-[80%]" style={hide?{filter:'blur(4px)',pointerEvents:'none',userSelect:'none'}:{}}>
          {allPL.map((item) => {
            return(
            <AllParkingLot key={item._id} parkingLot={item} setShowUpdate={setShowUpdate} setParkingLot={setParkingLot} setHide={setHide} />
          )}
          )}
        </div>
      </div>
    </div>
  );
};

export default ParkingLotsProvider;
