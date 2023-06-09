
import { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { Loader } from ".";

const url = 'http://localhost:8000/api/ParkingLot/updateDriver';

const Update = ({ setShowUpdate, parkingLot,setHide }) => {
  const [ParkingLot, setParkingLot] = useState(parkingLot);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setHide(false)
    setShowUpdate(false)
  }
  const onChange = (e) => {
    setParkingLot((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async(e) => {
    console.log(ParkingLot);
    e.preventDefault();
    setIsLoading(true);
    
    try{
      const response=await fetch(`${url}/${parkingLot._id}`,{
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        // Adding body or contents to send
        body: JSON.stringify(ParkingLot)
      });
      const data = await response.json();
      if(response.ok){
        console.log(data)
      }
      else{
        console.log(data)
      }
      setParkingLot(ParkingLot);
      console.log(data);
      setIsLoading(false);
    }catch{
      console.log("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  };

  return (
    <div className="updateContainer" >
      <div className="flex justify-end item-center w-[80%] ml-20 mb-2">
        <span style={{ fontSize: '20px', fontWeight: 'bold', WebkitTextStroke: '1px #3F3F3F', width: '100%' }}>Update Details Here</span>
        <IoIosCloseCircle fontSize={28} style={{ cursor: 'pointer' }} onClick={handleClick} />
      </div>
      <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
        <input className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" value={ParkingLot.Name} placeholder="Parking Lot Name" name="Name" type="text" onChange={onChange} />
        <input className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" value={ParkingLot.WalletAddress} placeholder="Your Wallet Address" name="WalletAddress" type="text" onChange={onChange} />
        <input className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" value={ParkingLot.Fee} placeholder="Fee/kilometer (ETH)" name="Fee" type="number" onChange={onChange} />
        <input className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" value={ParkingLot.TotalSlots} placeholder="Total Slots" name="TotalSlots" type="number" onChange={onChange} />
        {/* <input className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" value={ParkingLot.Lattitude} placeholder="Lattitude" name="Lattitude" type="number" onChange={onChange} />
        <input className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" value={ParkingLot.Longitude} placeholder="Longitude" name="Longitude" type="number" onChange={onChange} /> */}

        <div className="h-[1px] w-full bg-gray-400 my-2" />

        {isLoading
          ? <Loader />
          : (
            <button
              type="button"
              onClick={handleSubmit}
              className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
            >
              Update Parking Lot
            </button>
          )}
      </div>
    </div>
  )
}

export default Update;