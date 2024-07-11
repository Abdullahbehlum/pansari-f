import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BasketImage from "../../assets/images/empty_cart.png";
import { Breadcrumb, Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RemoveCart } from "../redux/slice/AddCart.js";
import { DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { BaseUrl } from "../utils/BaseUrl.js"
function formatCurrency(price) {
  return new Intl.NumberFormat("en-Pk", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: false,
  }).format(price);
}
function AddToCart() {
  const navigate = useNavigate();
  const addtoCart = useSelector((state) => state.cart.cart);
  const [Counter, setCounter] = useState(1);
  const dispatch = useDispatch();
  const handleRemoveCart = async (productid) => {
    await dispatch(RemoveCart(productid));
    toast.success("remove cart items successfully");
  };
  const handleIncrement = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };
  const handleValueChange = (event) => {
    const value = event.target.value;
    const numericValue = value ? parseInt(value, 10) : 1;
    if (!isNaN(numericValue) && numericValue >= 1) {
      setCounter(numericValue);
    }
  };
  const handleDecrement = () => {
    setCounter((prevCounter) => (prevCounter > 1 ? prevCounter - 1 : 1));
  };
  const ShippingRate = 300;
  const subtotal = addtoCart.reduce((total, item) => total + item.price * Counter, 0);
  const total = subtotal + ShippingRate;
  return (
    <>
      <Breadcrumb
        style={{
          color: "black"
        }}
        separator=">"
        items={[
          {
            title: "Home",
            href: "/",
          },
          {
            title: "Shopping Cart",
          },
        ]}
        className="mx-5 my-3"
      ></Breadcrumb>


      {
        addtoCart.length === 0 && (
          <>
            <section className=" flex flex-col justify-center items-center mb-[40px] mb-2 mt-12 xl:mt-12">
              <img
                src={BasketImage}
                alt="Cart Is Empty"
                className="object-cover xl:w-[300px] mb-3"
              />
              <h3
                className="mb-3 xl:text-[32px]
       text-[25px]  font-bold"
              >
                Your basket is empty
              </h3>
              <Link to={"/"} className="text-blue-500">
                Start shopping now!
              </Link>
            </section>
          </>
        )
      }

      <div className="grid xl:grid-cols-2 place-items-center
       place-content-center grid-cols-1 mt-12 xl:mb-24 mb-5">
        <div className="mt-8 ml-12 mb-hide">
          <div className="flow-root">
            <ul role="list" className="-my-1 ">
              {
                addtoCart.length > 0 && (
                  <>
                    <h3 className="text-2xl font-bold mb-5">
                      Cart
                    </h3>
                  </>
                )
              }
              {Array.isArray(addtoCart) && addtoCart.map((f, i) => (
                <li key={i} className="flex border border-gray-200 
               py-5 px-5  xl:flex-row flex-col justify-center items-center  py-6 my-3">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={`/public/${f.image}`}
                      alt={f.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 justify-center items-center xl:flex-row flex-col ">
                    <h3 className="text-xs xl:text-sm text-center w-[180px]" >
                      {f.name}
                    </h3>
                    <h6 className="xl:px-4 font-bold" > {formatCurrency(f.price * Counter)}</h6>
                  </div>
                  <div className="flex xl:flex-row flex-col
                justify-center items-center    flex-1 xl:items-end xl:justify-between text-sm ">
                    <div className="flex items-center ">
                      <div className="flex items-center justify-center xl:px-4 w-[150px] border-progray border">
                        <div
                          className="flex flex-col items-center cursor-pointer"
                          onClick={handleDecrement}
                        >
                          <iconify-icon icon="ri:subtract-line"></iconify-icon>
                        </div>{" "}
                        <div className="flex flex-col justify-center items-center">
                          <input
                            type="text"
                            className="text-center w-[60px]"
                            value={Counter}
                            onChange={handleValueChange}
                            readOnly
                          />
                        </div>
                        <div
                          className="flex flex-col items-center cursor-pointer"
                          onClick={handleIncrement}
                        >
                          <iconify-icon icon="ic:twotone-plus"></iconify-icon>
                        </div>
                      </div>
                      <div className="mx-3">
                        <Button className="text-lsgreen" onClick={() => handleRemoveCart(f._id)}>
                          <DeleteOutlined />
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="desk-hide">
          {
            addtoCart.length > 0 && (
              <>
                <h3 className="text-2xl pb-4 font-bold text-start mx-[-5px]">
                  Cart
                </h3>
                <hr />
              </>
            )
          }
          {Array.isArray(addtoCart) && addtoCart.map((f, i) => (
            <li key={i} className="flex my-4 border border-progray 
            rounded-md  w-[300px] xl:flex-row flex-col justify-center items-center  py-6">
              <div className="h-[120px]  mb-4  drop-shadow-lg  overflow-hidden rounded-md border border-gray-200">
                <img
                  src={`/public/${f.image}`}
                  alt={f.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 justify-center items-center xl:flex-row flex-col ">
                <h3 className="text-xs xl:text-sm text-center w-[200px]" >
                  {f.name}
                </h3>
                <h6 className="font-bold "> {formatCurrency(f.price * Counter)}</h6>
              </div>
              <div className="flex xl:flex-row flex-col
                justify-center items-center 
                ml-12   flex-1 xl:items-end xl:justify-between text-sm ">
                <div className="flex items-center ">
                  <div className="flex items-center justify-center w-[150px] border-progray border">
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      onClick={handleDecrement}
                    >
                      <iconify-icon icon="ri:subtract-line"></iconify-icon>
                    </div>{" "}
                    <div className="flex flex-col justify-center items-center">
                      <input
                        type="text"
                        className="text-center w-[60px]"
                        value={Counter}
                        onChange={handleValueChange}
                        readOnly
                      />
                    </div>
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      onClick={handleIncrement}
                    >
                      <iconify-icon icon="ic:twotone-plus"></iconify-icon>
                    </div>
                  </div>
                  <div className="mx-3">
                    <Button onClick={() => handleRemoveCart(f._id)}>
                      <DeleteOutlined />
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </div>
        {Array.isArray(addtoCart) && addtoCart.length > 0 && (
          <div>
            <div className=" rounded-md border border-progray py-5 x:py-3 w-[300px] h-auto overflow-hidden xl:w-[400px] pt-6">
              <h3 className="text-2xl text-center mb-6 font-bold text-[#333]">
                Order Summary
              </h3>
              <div className="flex-container items-center mb-4 border-b border-progray pb-2">
                <h4 className="font-semibold">SubTotal</h4>
                <h6>{formatCurrency(subtotal)}</h6>
              </div>
              <div className="flex-container mb-4 border-b border-progray pb-2">
                <h4 className="font-semibold">Shipping</h4>
                <h6>Rs: {ShippingRate}</h6>
              </div>
              <div className="flex-container items-center mb-6 xl:mb-3 border-b border-progray pb-2">
                <h4 className="font-semibold">Total</h4>
                <h6 className="relative xl:left-2 left-0">{formatCurrency(total)}</h6>
              </div>
              <div className="flex justify-center items-center flex-col">
                <Link
                  to={"/cart/checkout"}
                  onClick={() => window.scrollY(0, 0)}
                  className="btn bg-lgreen xl:mx-0 text-center mx-1 hover:bg-orange-500 xl:w-[300px] text-white rounded-sm"
                >
                  Checkout <ShoppingOutlined className="px-1" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

    </>
  );
}

export default AddToCart;
