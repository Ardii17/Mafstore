import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../contextAPI";

const Notification = () => {
  const theme = useContext(ThemeContext);

  return (
    <div
      className={`${
        theme?.notification ? "right-0" : "-right-96"
      } fixed transition-all w-[22rem] h-screen bg-blue-800 z-40 px-4 py-2`}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-white text-lg font-semibold tracking-wider">
          Notification
        </p>
        <i
          className="bx bx-x text-white text-2xl cursor-pointer"
          onClick={() => theme?.handleNotification(false)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 p-2 shadow-md rounded-lg items-center border-[1.5px] cursor-pointer border-blue-700">
          <i className="bx bx-bell text-white text-2xl" />
          <div>
            <p className="text-white whitespace-nowrap ">Pengembalian Barang</p>
            <p
              className="text-white text-sm whitespace-nowrap"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Lorem ipsum dolor, sit amet consectetur f...
            </p>
          </div>
        </div>
        <div className="flex gap-2 p-2 shadow-md rounded-lg items-center border-[1.5px] cursor-pointer border-blue-700">
          <i className="bx bx-bell text-white text-2xl" />
          <div>
            <p className="text-white whitespace-nowrap ">Pengembalian Barang</p>
            <p
              className="text-white text-sm whitespace-nowrap"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Lorem ipsum dolor, sit amet consectetur f...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
