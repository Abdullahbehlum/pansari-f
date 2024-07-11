import React from "react";
import Notf from "../assets/images/Oops! 404 Error with a broken robot-rafiki.png";
import { Link } from "react-router-dom";
function NotFoundpage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <div className="xl:w-[500px] xl:h-[450px] w-auto">
          <img src={Notf} alt="404" className="object-cover" />
        </div>
        <p className="mb-4 text-center">
          Oops! The page you're looking for can't be found.{" "}
          <br className="mb-hide" /> Let's get you back on track.
        </p>
        <Link
          to={"/"}
          className="btn capitalize bg-lgreen text-white rounded-sm"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
}

export default NotFoundpage;
