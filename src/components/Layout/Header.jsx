import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageBanner from "../../assets/images/Website-Top-ImmuneBooster.png";
import Pansari from "../../assets/images/logo.png";
import "iconify-icon";
import { Menu } from "antd";
import { Drawer, Fade, Tooltip, styled, tooltipClasses } from "@mui/material";
import AppLogo from "../../assets/images/app-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FetchAllProducts } from "../redux/slice/ProductSlice.js";
const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
    color: "white",
    fontSize: "1em",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "black",
  },
});

function Headers() {
  const [MobileMenu, SetMobileMenu] = useState(false);
  const [MobileSearch, SetMobileSearch] = useState(false);
  const addtoCart = useSelector((state) => state.cart.itemCount);
  const [SearchVal, SetSearchVal] = useState("");
  const [SearchSuggester, SetSearchSuggester] = useState();
  const dispatch = useDispatch();
  const [Loaded, SetLoaded] = useState(false);
  const Products = useSelector((state) => state.products);
  const MenuItem = [
    {
      label: (
        <>
          <div
            className="absolute right-[10px] focus:shadow-lg"
            onClick={() => SetMobileMenu(false)}
          >
            <iconify-icon icon="material-symbols:close"></iconify-icon>
          </div>
        </>
      ),
    },
    {
      label: (
        <>
          <img src={Pansari} className="w-[100px] object-cover" />
        </>
      ),
    },
    {
      label: (
        <Link className="hover:text-orange-500" to={"/About-us"}>
          About us
        </Link>
      ),
    },
    {
      label: (
        <Link className="hover:text-orange-500" to={"/Quality"}>
          Quality Policy
        </Link>
      ),
    },
    {
      label: (
        <Link className="hover:text-orange-500" to={"/loyalty"}>
          Loyalty Program
        </Link>
      ),
    },
    {
      label: (
        <Link className="hover:text-orange-500" to={"/hakeem"}>
          Hakeem Feroze Ahmed
        </Link>
      ),
    },
    {
      label: (
        <Link className="hover:text-orange-500" to={"/herb"}>
          Herbs Index
        </Link>
      ),
    },
    {
      label: (
        <Link className="hover:text-orange-500" to={"/shipping"}>
          Shipping and Retruns
        </Link>
      ),
    },
    {
      label: (
        <Link className="hover:text-orange-500" to={"/contactus"}>
          Contact Us
        </Link>
      ),
    },
  ];

  useEffect(() => {
    if (!Loaded) {
      dispatch(FetchAllProducts());
    }
  }, [dispatch]);
  const handleSubmitSearch = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {/* Web Top section  */}
      <section className="mb-hide">
        <div className="bg-lightgray border-b-[#ccc] xl:px-12 px-2 text-[12px] xl:text-[14px]">
          <div className="flex flex-col xl:flex-row md:flex-row sm:flex-row justify-between items-center xl:mx-5 mx-1">
            <div>
              <ul className="nav-item ">
                <li>
                  <i className="fa-solid fa-phone"></i>
                </li>
                <li className="text-gray-500">
                  <Link to="tel:03-111-965-965">03-111-965-965</Link>
                </li>
                <li>
                  <i className="fa-brands fa-whatsapp"></i>
                </li>
                <li className="text-gray-500">
                  <Link to="tel:0332-1309589">0332-1309589</Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="nav-item text-[11px] xl:text-[14px] ">
                <li>
                  <Link to="#" className="text-[#00483c] hover:text-orange-600">
                    ORGANIC KITCHEN
                  </Link>
                </li>

                <li>
                  <Link to="#" className="text-[#00483c] hover:text-orange-600">
                    DAWAKHANA
                  </Link>
                </li>

                <li>
                  <Link to="#" className="text-[#00483c] hover:text-orange-600">
                    DEKHBHAAL
                  </Link>
                </li>

                <li>
                  <Link to="#" className="text-[#00483c] hover:text-orange-600">
                    AANSA
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="desk-hide">
        <div className="bg-orange-600">
          <ul className="nav-item text-center">
            <li className="text-white">
              <h3>Call Us:</h3>
            </li>
            <li>
              <Link className="text-white" to="tel:03-111-965-965">
                03-111-965-965
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <section className="xl:mb-4 ">
        <img src={ImageBanner} alt="Top-banner" className="object-cover  " />
      </section>
      <section className="desk-hide">
        <div className="flex justify-around items-center bg-cgray py-5">
          <div>
            <img src={AppLogo} className="w-[45px] object-cover" />
          </div>
          <div>
            <h3 className="text-[11px] mb-2">
              Avail 5% Exclusive Discount On <br /> Our Mobile App
            </h3>
            <Link
              to={"#"}
              className="bg-btngreen text-white text-[11px] p-[7px]"
            >
              Download Now
            </Link>
          </div>
        </div>
      </section>
      {/* Search Header is given */}
      <section>
        <div
          className="flex border-[#ccc] border-b xl:pb-[16px]
           xl:justify-around justify-between items-center"
        >
          <div className="xl:mx-0 mx-4">
            <ul className="nav-item">
              <li>
                <i
                  className="text-[28px] font-bold desk-hide relative top-[-6px] "
                  onClick={() => SetMobileMenu(!MobileMenu)}
                >
                  <iconify-icon icon="heroicons:bars-3-center-left"></iconify-icon>{" "}
                </i>
              </li>
              <li>
                <div>
                  <Link to={"/"}>
                    <img
                      src={Pansari}
                      alt="Pansari"
                      className="xl:w-[150px]  object-cover w-[100px]  relative top-2 "
                    />
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          <div className="mb-hide">
            <div className="flex ">
              <input
                type="search"
                placeholder="Search...."
                className="border border-progray
            py-[4px] rounded-lg px-[12px] xl:w-[600px]  outline-none"
                onChange={(v) => {
                  SetSearchVal(v.target.value);
                  const filteredSuggestions =
                    Array.isArray(Products) &&
                    Products.filter((p) =>
                      p.name.toLowerCase().startsWith(SearchVal.toLowerCase())
                    );

                  SetSearchSuggester(filteredSuggestions);
                }}
                value={SearchVal}
              />
              <button
                onClick={handleSubmitSearch}
                className="relative bg-lgreen text-white right-4 py-[8px]  px-[22px]"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            {Array.isArray(SearchSuggester) &&
              SearchSuggester.map((s) => (
                <>
                  <div className="shadow-md bg-white text-center text-black">
                    {s.name}
                  </div>
                </>
              ))}
          </div>
          <div className="mb-hide">
            <div className="flex justify-around items-center">
              <div className="cursor-pointer xl:mr-12 mr-5">
                <CustomTooltip
                  title={`${
                    addtoCart === 0
                      ? "Basket is Empty"
                      : `${addtoCart} item Basket`
                  }`}
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                >
                  <div className="spirte-img"></div>
                  {` ${addtoCart} Items`}
                  <br />{" "}
                  <Link to={"/cart"} className="hover:text-orange-600">
                    {"Backet"}
                  </Link>
                </CustomTooltip>
              </div>
              <div className="cursor-pointer">
                <div className="user-img"></div>
                <Link to={"/signin"} className="hover:text-orange-600">
                  {"Sign IN | Join "} <br /> {"Your Account"}
                </Link>
              </div>
            </div>
          </div>

          <div className="desk-hide xl:mx-0 mx-4 relative top-2 ">
            <i
              className="text-[28px] font-bold pr-2"
              onClick={() => SetMobileSearch(true)}
            >
              <iconify-icon icon="ic:outline-search"></iconify-icon>
            </i>

            <i className="text-[28px] font-bold  pr-2 ">
              <Link to={"/signin"}>
                <iconify-icon icon="ph:user-bold"></iconify-icon>
              </Link>
            </i>

            <i className="text-[28px] font-bold pr-2 ">
              <Link to={"/cart"}>
                {" "}
                <iconify-icon icon="solar:cart-3-linear"></iconify-icon>
              </Link>
            </i>
          </div>
        </div>
      </section>
      <section className="mb-hide">
        <div className="bg-lblues text-orange-600 border border-[#ccc]">
          <p className="text-[12px] font-semibold">
            <marquee behavior="scroll" direction="left">
              Free Delivery is not available on Oils. Free Delivery is available
              for Prepaid order (paid via Bank Transfer or Easy Paisa) only, not
              available for Cash On Delivery.
            </marquee>
          </p>
        </div>
      </section>

      {MobileMenu && (
        <>
          <Drawer
            open={MobileMenu}
            OnClose={() => SetMobileMenu(false)}
            anchor="left"
          >
            <Menu className="py-2 px-3" items={MenuItem}></Menu>
          </Drawer>
        </>
      )}
      {MobileSearch && (
        <>
          <Drawer
            open={MobileSearch}
            OnClose={() => SetMobileSearch(false)}
            anchor="top"
          >
            <div className="py-4 px-2">
              <div className="mb-4">
                <i
                  className="absolute right-3 "
                  onClick={() => SetMobileSearch(false)}
                >
                  <iconify-icon icon="material-symbols:close"></iconify-icon>
                </i>
              </div>
              <br />
              <div className="flex mb-5">
                <input
                  type="text"
                  placeholder="Search...."
                  className="border border-[#ccc]
            py-[4px] rounded-sm px-[12px] w-[335px]   outline-none"
                />
                <button className="relative right-8">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </Drawer>
        </>
      )}
    </>
  );
}

export default Headers;
