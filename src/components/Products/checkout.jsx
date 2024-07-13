import { useState, useEffect } from "react"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RemoveCart } from "../redux/slice/AddCart.js";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Button, Radio } from "antd"
import { Link } from "react-router-dom";
import { BaseUrl } from "../utils/BaseUrl.js"
function formatCurrency(price) {
  return new Intl.NumberFormat("en-Pk", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: false,
  }).format(price);
}
function checkout() {
  const [SelectedPaymethod, SetSelectedPaymethod] = useState("COD");
  const [AddressList, SetAddressList] = useState(false);
  const [SelectedVariant, setSelectedVariant] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const [OrderData, SetOrderData] = useState({
    fname: "",
    lname: "",
    email: "",
    pnumber: "",
    address1: "",
    address2: "",
    cities: "",
    zipcode: "",
    paymentType: SelectedPaymethod,

  });
  const SelectCitiesOption = [
    {
      label: (
        <>
          <p>{"Islamabad"}</p>
        </>
      ),
      value: "Islamabad",
    },
    {
      label: "Lohare",
      value: "Lahore",
    },
    {
      label: "Karachi",
      value: "Karachi",
    },
    {
      label: "Hyderabad",
      value: "Hyderabad",
    },
    {
      label: "Multan",
      value: "Multan",
    },
  ];

  // Order PLace 
  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(`${BaseUrl}/api/v1/order/create-order`,
        { ...OrderData, subtotal: subtotal, shippingRate: ShippingRate, TotalAmount: total }
      );
      if (res.success === true) {
        toast.success(res.message);
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // Pakistani Phone Number validation is given 
  const pakistanPhoneNumberRegex = /^03\d{9}$/;
  const addtoCart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const handleRemoveCart = async (productid) => {
    await dispatch(RemoveCart(productid));
    toast.success("remove cart items successfully");
  };

  useEffect(() => {
    if (Array.isArray(addtoCart) && addtoCart.length > 0) {
      setSelectedVariant(addtoCart[0].variants[0]);
    }
    if (pakistanPhoneNumberRegex.test(OrderData.pnumber)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    
  }, [addtoCart, OrderData.pnumber, SelectedVariant]);
  const handlePaymentMethod = (paymenttype) => {
    SetSelectedPaymethod(paymenttype)
  }

  const handleVariantChange = (e, f) => {
    const selectedSize = e.target.value;
    const variant = f.variants.find((v) => v.size === selectedSize);
    setSelectedVariant(variant);
  };
  const ShippingRate = SelectedPaymethod === "COD" ? 300 : SelectedPaymethod == "easy" ? 500 : 600;
  const subtotal = addtoCart.reduce((acc, item) => {
    if (Array.isArray(item.variants) && item.variants.length === 0) {
      acc += item.price
    } else {
      acc += SelectedVariant?.price
    }
    return acc
  }, 0);
  const total = subtotal + ShippingRate;
  return (
    <>
      <section className="grid xl:grid-cols-2 grid-cols-1 my-12 xl:mx-7 mx-6 ">
        <div className="my-3">
          <h3 className="text-base font-semibold leading-7 text-gray-900 mb-4">Shipping Information</h3>
          <form>
            <div className="grid xl:grid-cols-2 grid-cols-1 ">
              <div className="block mb-4 xl:mr-2">
                <label htmlFor="fname" className="block text-sm font-medium leading-6 pb-1 text-gray-900">
                  Frist Name
                </label>
                <input type="text"
                  name="fname"
                  onChange={(e) => SetOrderData({ ...OrderData, fname: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                  required />

              </div>
              <div className="block mb-4">
                <label htmlFor="fname" className="block text-sm font-medium leading-6 pb-1 text-gray-900">
                  Last Name
                </label>
                <input type="text"
                  name="lname" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                  onChange={(e) => SetOrderData({ ...OrderData, lname: e.target.value })}
                  required />
              </div>
            </div>
            <div className="grid xl:grid-cols-2 grid-cols-1 ">
              <div className="block mb-4 xl:mr-2">
                <label htmlFor="email"
                  className="block text-sm font-medium leading-6 pb-1 text-gray-900">
                  Email
                </label>
                <input type="text"
                  name="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                  onChange={(e) => SetOrderData({ ...OrderData, email: e.target.value })}
                  required />
              </div>


              {
                SelectedPaymethod === "COD" ? (
                  <>
                    <div className="block mb-4">
                      <label htmlFor="fname" className="block text-sm font-medium leading-6 pb-1 text-gray-900">
                        Phone Number
                      </label>
                      <input type="number"
                        name="pnumber" className="block  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                        onChange={(e) => SetOrderData({ ...OrderData, pnumber: e.target.value })}
                      />
                    </div>
                    {isValid == true ? (
                      <>
                        <br />
                        <span className="text-red-400" >
                          Valid Pakistan Phone Number!
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    <div className="block mb-4 xl:mb-5">
                      <label htmlFor="fname" className="block text-sm font-medium leading-6 pb-1 text-gray-900">
                        Account no
                      </label>
                      <input type="text"
                        name="accountno" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                      // onChange={(e) => SetOrderData({ ...OrderData, accountno: e.target.value })}
                      />
                    </div>
                  </>
                )
              }

            </div>

            <div className="block mb-4 ">
              <label htmlFor="addres1"
                className="block text-sm font-medium leading-6 pb-1 text-gray-900">
                Address 1
              </label>
              <input type="text"
                name="address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                onChange={(e) => SetOrderData({ ...OrderData, address1: e.target.value })}
                required />
            </div>

            <div className="block mb-4 ">
              <label htmlFor="addres1"
                className="block text-sm font-medium leading-6 pb-1 text-gray-900">
                Address 2 (Optional)
              </label>
              <input type="text"
                name="address2" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                onChange={(e) => SetOrderData({ ...OrderData, address2: e.target.value })}
              />
            </div>
            <div className="grid xl:grid-cols-2 grid-cols-1 ">

              <div className="block mb-4 xl:mr-2">
                <label htmlFor="fname" className="block text-sm font-medium leading-6 pb-1 text-gray-900">
                  City
                </label>
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="xl:w-full appearance-none  w-[310px] rounded-md  py-1.5 outline-none
                  px-3 text-black shadow-sm ring-1  ring-inset ring-gray-200 focus:ring-2  focus:ring-gray-200 sm:text-sm sm:leading-6"
                  onChange={(value) => SetOrderData({ ...OrderData, cities: value.target.value })}
                  required    >
                  <option value="ChooseYourCity 
                "  >Choose Your City</option>
                  {
                    SelectCitiesOption.map((c, i) => (
                      <>
                        <option key={i} value={c.value}>
                          {c.label}
                        </option>
                      </>
                    ))
                  }
                </select>

              </div>
              <div className="block mb-4">
                <label htmlFor="fname" className="block text-sm font-medium leading-6 pb-1 text-gray-900">
                  Zip Code
                </label>
                <input type="text"
                  name="zipcode" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                   placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                  onChange={(e) => SetOrderData({ ...OrderData, zipcode: e.target.value })}
                  required />
              </div>

            </div>
           

          </form>
        </div>

        <div className="xl:ml-12 ml-0">
          <div className="flow-root border-b border-gray-300">
            <ul role="list" className="mt-5 mx-4">
              {
                addtoCart.length > 0 && (
                  <>
                    <h3 className="text-2xl font-bold">
                      Cart
                    </h3>

                  </>
                )
              }
              {Array.isArray(addtoCart) && addtoCart.map((f, i) => (
                <li key={i} className="flex xl:flex-row flex-col justify-around items-center  py-6">
                  <div className="xl:h-20 xl:w-20 w-40 h-40 flex-shrink-0 overflow-hidden mr-1 rounded-md border border-gray-200">
                    <img
                      src={`/${f.image}`}
                      alt={f.name}
                      className="h-full w-full object-cover object-center "
                    />
                  </div>

                  <div className="mt-3">
                    <h3 className="text-xs  text-center " >
                      {f.name}
                    </h3>
                    <div className="flex justify-between items-center text-xs" >
                      {f.variants.map((variant, index) => (
                        <label key={index} className="flex justify-center items-center mr-2">
                          <Radio
                          
                            value={variant.size}
                            checked={SelectedVariant && SelectedVariant.size === variant.size}
                            onChange={(e) => handleVariantChange(e, f)}
                            className="xl:mr-2 mr-1"
                          />
                          {variant.size}
                        </label>
                      ))}
                      <Button className="text-xs outline-none border-none shadow-none"
                        onClick={() => handleRemoveCart(f._id)}>
                        <DeleteOutlined />
                      </Button>
                    </div>
                  </div>

                  <div className="mx-3 font-bold text-lg">
                    {SelectedVariant ? formatCurrency(SelectedVariant.price) : formatCurrency(f.price)}
                  </div>

                </li>
              ))}
            </ul>
          </div>
          <div className=" py-5 px-2 border-b border-progray mb-2 ">
            <h3 className="capitalize mb-2 font-bold text-[#333] mb-4">
              payment method
            </h3>
            <div className="grid xl:grid-cols-3 grid-cols-2 xl:text-sm text-xs ">
              <div className="text-xs">
                <Radio value="COD" checked={SelectedPaymethod === "COD"} onClick={() => handlePaymentMethod("cash")} />
                <label htmlFor="cash">
                  Cash On Delivery
                </label>
              </div>
              <div>
                <Radio value="easy" onClick={() => handlePaymentMethod("easy")}
                  checked={SelectedPaymethod === "easy"} /> <label htmlFor="cash">
                  Easy Pasia
                </label>
              </div>
              <div >
                <Radio value="jazz"
                  checked={SelectedPaymethod === "jazz"} onClick={() => handlePaymentMethod("jazz")} /> <label htmlFor="cash">
                  Jazz Cash
                </label>

              </div>
            </div>
          </div>
          <div className="flex justify-between items-center py-3 px-4">
            <h3 className="text-[#333] font-bold">SubTotal</h3>
            <h4 className="text-[#333] font-bold">{formatCurrency(subtotal)}</h4>
          </div>
          <div className="flex justify-between items-center py-3 px-4">
            <h3 className="text-[#333] font-bold">Shipping</h3>
            <h4 className="text-[#333] font-bold">{formatCurrency(ShippingRate)}</h4>
          </div>
          <div className="flex justify-between items-center py-3 px-4">
            <h3 className="text-[#333] font-bold">Total</h3>
            <h4 className="text-[#333] font-bold">{formatCurrency(total)}</h4>
          </div>

          <button onClick={handleCheckout}
            className="bg-lgreen text-white btn w-full mt-2 mb-2 xl:mb-5 rounded ">
            {SelectedPaymethod === "COD" ? 'Order Now' : 'Pay Now '} &nbsp;  <span className="relative top-1 text-[19px]">
              <iconify-icon icon="mdi:truck"></iconify-icon>
            </span>
          </button>
          <Link to={"/"} className="text-gray-600" >
            <p className="text-center" >
              Continue to Shipping  <span className="relative top-1">
                <iconify-icon icon="fluent:arrow-right-12-filled"></iconify-icon>
              </span>
            </p>
          </Link>

        </div>


      </section>
    </>
  )
}
export default checkout