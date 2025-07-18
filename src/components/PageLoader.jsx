import React from "react";
import Loading from "./Loading";

const PageLoader = ({ text = "Please Wait", isDark = true }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen z-[999999999999] grid place-content-center backdrop-blur-[2px] ${
        isDark ? "bg-black/[0.6] " : "bg-white"
      }`}
    >
      <Loading />
      <p
        className={`$${
          isDark ? "text-white" : "text-black"
        } font-bold text-center mt-5 text-20 loading-dots`}
      >
        {`${text} `}
      </p>
    </div>
  );
};

export default PageLoader; 