import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const CommonPopup = ({ isOpen, setOpen, children }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setOpen(false);
    }, 300); // Changed to 300ms for a smoother transition
  };

  return (
    <>
      {isOpen && (
        <div
          className={`fixed z-50 top-0 left-0 w-full min-h-screen flex items-center justify-center backdrop-blur-3xl ${
            isClosing ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
        >
          <div className="max-h-[90vh] bg-white p-5 rounded-md shadow-lg">
            <div
              onClick={handleClose}
              className="float-right text-white cursor-pointer ml-5 bg-red-500 rounded-md p-1"
            >
              <AiOutlineClose />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default CommonPopup;
