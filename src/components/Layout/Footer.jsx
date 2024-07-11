import React from "react";
import { Link } from "react-router-dom";
import Pansari from "../../assets/images/store-logo.png";
import googleplay from "../../assets/images/google-play.png";
import weAccept from "../../assets/images/we_accept.png";
function Footer() {
  return (
    <>
      {/* Shipping widgets is given */}
      <section className="mb-hide mb-10  overflow-hidden">
        <div className="flex justify-evenly items-center overflow-hidden ">
          <div className="text-center px-12 bg-transparent flex flex-col justify-center items-center">
            <div className="spirte-cod"></div>
            <h3 className="font-bold">Cash on Delivery</h3>
            <p className="text-[12px]">Pay at the time of delivery</p>
          </div>
          <div className=" text-center  px-12 flex flex-col justify-center items-center">
            <div className="sprite prem_quality"></div>
            <h3 className="font-bold">Premium Quality</h3>
            <p className="text-[12px]">
              We deal in 100% Organice &
              <br />
              Premium Quality Products
            </p>
          </div>
          <div className=" text-center overflow-hidden  px-12 flex flex-col justify-center items-center">
            <div className="sprite money_back"></div>
            <h3 className="font-bold">Money Back Guarantee</h3>
            <p className="text-[12px]">
              We offer 100% Refund or <br /> Replacement incase of any quality{" "}
              <br /> issues.
            </p>
          </div>
          <div className=" text-center  px-12 flex flex-col justify-center items-center">
            <div className="sprite help_center"></div>
            <h3 className="font-bold">Cash on Delivery</h3>
            <p className="text-[12px]">Pay at the time of delivery</p>
          </div>
        </div>
      </section>
      <section className=" text-white text-center">
        <div className="mb-hide bg-btngreen border-b py-2 border-progray">
          <ul className="nav-item">
            <li>
              <Link className="hover:text-orange-500" to={"/About-us"}>About Us</Link>
            </li>
            <li>
              <Link className="hover:text-orange-500" to={"/Quality"}>
                Quality Policy
              </Link>
            </li>
            <li>
              <Link className="hover:text-orange-500" to={"/loyalty"}>
                Loyalty Program
              </Link>
            </li>
            <li>
              <Link className="hover:text-orange-500" to={"/hakeem"}>
                Hakeem Feroze Ahmed
              </Link>
            </li>
            <li>
              <Link className="hover:text-orange-500" to={"/herb"}>
                Herbs Index
              </Link>
            </li>
            <li>
              <Link className="hover:text-orange-500" to={"/shipping"}>
                Shipping and Retruns
              </Link>
            </li>
            <li>
              <Link className="hover:text-orange-500" to={"/contactus"}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex bg-btngreen justify-around items-center py-4  xl:flex-row md:flex-row sm:flex-row flex-col">
          <div className="mb-hide">
            <img
              src={Pansari}
              alt="pansari"
              className="w-[100px] object-cover"
            />
          </div>
          <div>
            <ul>
              <li>
                Call Us: <Link to={"tel:03-111-965-965"}>03-111-965-965</Link>
              </li>
              <li>
                Email:{" "}
                <Link to={"mailto:sales@pansari.pk"}>sales@pansari.pk</Link>
              </li>
            </ul>
          </div>
          <div className="mb-hide ">
            <ul className="flex flex-col justify-center items-center">
              <li>Download Our App</li>
              <li>
                <img
                  src={googleplay}
                  alt="googleplay"
                  className="w-[80px] cursor-pointer object-cover"
                />
              </li>
            </ul>
          </div>
          <div className=" flex flex-col justify-center items-center pt-2">
            <p className="mb-hide">Connect With Us</p>
            <ul className="nav-item">
              <li>
                <iconify-icon icon="logos:facebook"></iconify-icon>
              </li>
              <li>
                <iconify-icon icon="skill-icons:instagram"></iconify-icon>
              </li>
              <li>
                <iconify-icon icon="skill-icons:twitter"></iconify-icon>
              </li>
              <li>
                <iconify-icon icon="logos:youtube-icon"></iconify-icon>
              </li>
            </ul>
          </div>
          <div className="mb-hide">
            <h3>We Accept</h3>
            <img
              src={weAccept}
              alt="weAccept"
              className="w-[80px] object-cover "
            />
          </div>
        </div>

        <div className="bg-[#0f352b] p-2 ">
          <p className="text-[12px]">
            2024 Pansari, Pakistan's First Premium Herbal Store.
            <br />
            All Right Reserved.
          </p>
        </div>
      </section>
    </>
  );
}

export default Footer;
