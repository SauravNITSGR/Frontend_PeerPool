import React, { useState } from 'react'

const getBookings_url = 'http://localhost:8000/api/book/getBookings';
const free_url = 'http://localhost:8000/api/book/freeSlot';


const Bookings = () => {
  const [bookings, setBookings] = useState();


  const getAllBookings = async () => {
    try {
      const response = await fetch(getBookings_url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        // Adding body or contents to send
      });
      const data = await response.json();
      setBookings(data);

      console.log(data);
    } catch (err) {
      console.log(err)
      setMsg("Something went wrong. Please try again.")
    }
  }
  const freeSlot = async ({ slot }) => {
    try {
      const response = await fetch(free_url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        // Adding body or contents to send
        body: JSON.stringify(slot)
      });
      const data = await response.json();

      console.log(data);
    } catch (err) {
      console.log(err)
      setMsg("Something went wrong. Please try again.")
    }
  }


  return (
    <div className='flex flex-col gap-2 flex-wrap'>
      <div className='flex justify-center mt-10 mb-10'>
        <button class="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
          <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span class="relative" onClick={getAllBookings}>Bookings</span>
        </button>
      </div>
      <div className='flex gap-2 flex-wrap'>
        {bookings && bookings.map((slot) => {
          const date = new Date(slot.date).toLocaleString();
          return (
            <div >
              <a class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Booking Time : {date}</h5>
                <hr />
                <h2 class="font-normal text-gray-700 dark:text-gray-400">Your Verification Token : {slot.authToken}</h2>
                <hr />
                <h2 class="font-normal text-gray-700 dark:text-gray-400">Your Slot No. : {slot.slotNo}</h2>
                <div className='flex justify-center mt-10 mb-10'>
                  <button class="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                    <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <span class="relative" onClick={() => freeSlot({ slot })}>Free This Slot</span>
                  </button>
                </div>
              </a>
            </div>

          )
        })}
      </div>
    </div>
  )
}

export default Bookings;