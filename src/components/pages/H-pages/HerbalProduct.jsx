import React from "react";
import remide from "../../../assets/images/remedies.jpg";
import { Link } from "react-router-dom";
function HerbalProduct() {
  return (
    <>
      <section className="mb-hide my-10 text-center">
        <h3 className="text-[30px] font-bold mb-6">
          Ready to use Herbal Remedies
        </h3>
        <div
          className="grid grid-cols-4 place-content-center place-items-center grid-rows-1 my-5 *:w-[280px] mx-4
         *:mb-4"
        >
          <div className=" flex justify-center items-center flex-col ">
            <img
              src={remide}
              alt="herb"
              className="mb-3 border-[#ececec] border  py-5 px-14 object-cover"
            />
            <Link to={"#"}>Long & Thick Hair</Link>
          </div>
          <div className=" flex justify-center items-center flex-col ">
            <img
              src={remide}
              alt="herb"
              className="mb-3 border-[#ececec] border  py-5 px-14 object-cover"
            />
            <Link to={"#"}>Glowing Complexion</Link>
          </div>
          <div className=" flex justify-center items-center flex-col ">
            <img
              src={remide}
              alt="herb"
              className="mb-3 border-[#ececec] border  py-5 px-14 object-cover"
            />
            <Link to={"#"}>Spotless Skin</Link>
          </div>

          <div className=" flex justify-center items-center flex-col ">
            <img
              src={remide}
              alt="herb"
              className="mb-3 border-[#ececec] border  py-5 px-14 object-cover"
            />
            <Link to={"#"}>Chest Congestion</Link>
          </div>
        </div>
        <Link
          to={"#"}
          className="bg-lgreen border-lgreen py-[12px]  text-white w-[400px] hover:bg-[#ff7e00] px-[12px] uppercase text-[11px]"
        >
          VIEW ALL REMEDIES
        </Link>
      </section>
    </>
  );
}

export default HerbalProduct;
