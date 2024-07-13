import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Breadcrumb, Radio, Rate, Tabs } from "antd";
import { useDispatch } from "react-redux";
import { AddToCart } from "../redux/slice/AddCart.js";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BaseUrl } from "../utils/BaseUrl.js"
import { useForm } from "react-hook-form";
const ReviewSchema = Yup.object().shape({
  headline: Yup.string()
    .required("Headline for review 1 is required")
    .max(50, "Headline must be at most 50 characters"),
  reviewhere: Yup.string()
    .required("Headline for review 2 is required")
    .max(50, "Headline must be at most 50 characters"),
  name: Yup.string()
    .required("Name is required")
    .max(50, "Name must be at most 50 characters"),
});
function formatCurrency(price) {
  return new Intl.NumberFormat("en-Pk", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: false,
  }).format(price);
}
function Productdetails() {
  const [Loaded, SetLoaded] = useState(false);
  const dispatch = useDispatch();
  const [ProductData, setProductData] = useState({});
  const { productid } = useParams();
  const [Counter, setCounter] = useState(1);
  const [AddReview, setAddReview] = useState(false);
  const navigate = useNavigate();
  const [SelectedVariant, setSelectedVariant] = useState(null);
  const [RatingStar, setRatingStar] = useState(0);
  const [AllReview, setAllReview] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ReviewSchema),
    mode: "all",
  });

  const handleAddReview = async (data, e) => {
    try {
      e.preventDefault();
      console.log({ data });
      const { data: res } = await axios.post(`${BaseUrl}/api/v1/products/review`, {
        ...data,
        starValue: RatingStar,
      });
      console.log(res);
      if (res.success === true) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleAllReviews = async () => {
    try {
      const { data: res } = await axios.get(`${BaseUrl}/api/v1/products/all-review`);
      if (res.success === true) {
        setAllReview(res.review);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    const handleFeaturedProduct = async () => {
      try {
        const { data: res } = await axios.get(`${BaseUrl}/api/v1/products/${productid}`);
        const showAllProduct = res.allproducts;
        setProductData(showAllProduct);
      } catch (error) {
        toast.error(error.message);
      }
    };
    handleFeaturedProduct();
  }, [productid]);
  useEffect(() => {
    if (!Loaded) {
      handleAllReviews();
    }
  }, []);

  const TabsItem = [
    {
      label: "Description",
      key: 1,
      children: (
        <div
          dangerouslySetInnerHTML={{ __html: ProductData.longdescription }}
        />
      ),
    },
    {
      label: "Review",
      key: 2,
      children: (
        <>
          <div className="xl:mx-6 ">
            <div className="flex justify-between items-center pb-4">
              <div>
                {" "}
                <h3 className="text-[29px] font-bold mb-4">Product Reviews</h3>
              </div>
              <div>
                <button
                  onClick={() => setAddReview(!AddReview)}
                  className="btn transition-all bg-lgreen hover:bg-orange-500 text-white"
                >
                  Write a Review
                </button>
              </div>
            </div>

            {AddReview ? (
              <>
                <div className="py-7 mx-3 text-[22px] font-semibold">
                  Write Your Own Review
                </div>
                <form
                  className="xl:my-6 my-1 transition-all"
                  onSubmit={handleSubmit(handleAddReview)}
                >
                  <div className="block mb-4">
                    <p className="text-black pb-2">
                      <span className="text-red-400">* </span> Rating
                    </p>
                    <Rate
                      id="rating"
                      onChange={(value) => setRatingStar(value)}
                    />
                    <br />
                    {errors.rating && (
                      <span className=" text-red-600">
                        {errors.rating.message}
                      </span>
                    )}
                  </div>
                  <div className="block mb-4">
                    <p className="pb-2">
                      * Write a headline for your review here:
                    </p>
                    <input
                      type="text"
                      className={`py-[6px]
                px-[6px] w-full border border-[#ccc] w-[45%]
                rounded-sm hover:border-gray-600 focus:border-gray-600 outline-none mb-2
                     `}
                      {...register("headline")}
                    />
                    <br />
                    {errors.headline && (
                      <span className=" text-red-600">
                        {errors.headline.message}
                      </span>
                    )}
                  </div>
                  <div className="block mb-4">
                    <p className="pb-2">
                      * Write a headline for your review here:
                    </p>
                    <textarea
                      className={`py-[6px]
                px-[6px] w-full border border-[#ccc] w-[45%]
                rounded-sm hover:border-gray-600 focus:border-gray-600 outline-none mb-2
                     `}
                      cols={4}
                      rows={4}
                      {...register("reviewhere")}
                    />
                    <br />
                    {errors.reviewhere && (
                      <span className=" text-red-600">
                        {errors.reviewhere.message}
                      </span>
                    )}
                  </div>

                  <div className="block mb-4">
                    <p className=" pb-2">Enter your name:</p>
                    <input
                      type="text"
                      className={`py-[6px]
                px-[6px] w-full border border-[#ccc] w-[45%]
                rounded-sm hover:border-gray-600 focus:border-gray-600 outline-none mb-2
                     `}
                      {...register("name")}
                    />
                    <br />
                    {errors.name && (
                      <span className=" text-red-600">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <ul className="nav-item">
                    <li>
                      <button className="btn bg-lgreen hover:bg-orange-400 text-white rounded">
                        Save My Review{" "}
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setAddReview(false)}
                        className="btn border-lgreen transition-all bg-transparent border text-black rounded"
                      >
                        Cancel
                      </button>
                    </li>
                  </ul>
                </form>
              </>
            ) : (
              <>
                <div className="flex flex-col justify-center items-center my-8">
                  <div className="border-b border-l-gray-800 pb-6">
                    {AllReview.map((v, i) => (
                      <>
                        <span className="mr-3 text-[42px] font-bold" key={i}>
                          {i == 1 && v.starValue}
                        </span>
                      </>
                    ))}
                    <Rate disabled={true} className="mr-2" value={"5"} />
                    <span className="mr-2 text-sm">
                      {AllReview.length} customer reviews
                    </span>{" "}
                  </div>
                </div>
                {/* Show Review is given */}
                <div className="mx-4">
                  {AllReview.map((r, i) => (
                    <>
                      <span key={i}>{r.name}</span>
                    </>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      ),
    },
  ];

  const renderShortDescription = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    const formattedText = lines.map((line, index) => (
      <ul className="list-disc mx-3" key={index}>
        <li>{line}</li>
      </ul>
    ));
    return <ul>{formattedText}</ul>;
  };

  const handleIncrement = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };
  const handleValueChange = (event) => {
    const value = event.target.value;
    const numericValue = value ? parseInt(value, 10) : 0;
    if (!isNaN(numericValue) && numericValue >= 0) {
      setCounter(numericValue);
    }
  };
  const handleDecrement = () => {
    setCounter((prevCounter) => (prevCounter > 1 ? prevCounter - 1 : 1));
  };
  const handleAddTocart = async (ProductId) => {
    const cart = dispatch(AddToCart(ProductId));
    if (cart) {
      toast.success("Added to cart successfully");
    }
  };
  useEffect(() => {
    if (
      Array.isArray(ProductData.variants) &&
      ProductData.variants.length > 0
    ) {
      setSelectedVariant(ProductData.variants[0]);
    }
  }, [ProductData]);

  const handleSelectedVariant = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <>
      <Breadcrumb className="xl:mx-5 xl:mt-8 text-xs mx-3 mb-3">
        <Breadcrumb.Item>
          <Link className="focus:text-orange-400" to={"/"}>
            Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <p>{ProductData.name}</p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="mb-hide">
        <div className="flex justify-around xl:flex-row flex-col py-12 xl:py-16 ">
          <div className="flex w-[320px] flex-col justify-center items-center  ">
            <img
              src={`/${ProductData.image}`}
              alt={ProductData.name}
              className={`  ${ProductData._id === "6692334ab63a6fb89d6a5792"
                ? "w-[160px] xl:mb-4 mb-0"
                : "w-[650px]  xl:mb-3 mb-0"
                } xl:mt-2 mt-0`}
            />

            <div className="relative xl:left-[-6em] left-2">
              <img
                src={`/${ProductData.image}`}
                alt={ProductData.name}
                className={`${ProductData._id === "6692334ab63a6fb89d6a5792"
                  ? "w-[40px]"
                  : "w-[80px]"
                  } `}
              />
            </div>
          </div>
          <div className="w-[450px]  py-3">
            <div className="border-progray border-b pb-6">
              <h3 className={`font-semibold leading-9  mb-6 xl:text-[32px]`}>
                {ProductData.name}
              </h3>
              <div className="flex items-center xl:flex-row md:flex-row sm:flex-row flex-col">
                <div>
                  {Array.isArray(AllReview) &&
                    AllReview.map((c, i) => (
                      <>
                        <span className="mr-2 text-[#333] text-xl font-bold">
                          {i == 1 && c.starValue}
                        </span>
                      </>
                    ))}
                  <Rate disabled={true} className="mr-2" value={"5"} />
                  <span className="mr-2">
                    {AllReview.length} customer reviews
                  </span>
                </div>
                <div>{ProductData.sold} Sold</div>
              </div>
            </div>

            <div className="pt-4 leading-8">
              {renderShortDescription(ProductData.shortdescription)}
            </div>
          </div>

          <div className="w-[300px]">
            <ul className="nav-item">
              <li>Share</li>
              <li>
                <Link to={"facebook::"}>
                  <iconify-icon icon="logos:facebook"></iconify-icon>
                </Link>
              </li>
              <li>
                <Link to={"instagram::"}>
                  <iconify-icon icon="skill-icons:instagram"></iconify-icon>
                </Link>
              </li>
              <li>
                <Link to={"twitter::"}>
                  <iconify-icon icon="devicon:twitter"></iconify-icon>
                </Link>
              </li>
            </ul>
            <div className="border-progray border mb-3">
              <div className="text-center text-white py-[4px] bg-lgreen">
                Order Now
              </div>
              <div className="px-4 py-2 mb-3 ">
                <h4 className="text-[22px] font-bold">
                  {ProductData.variants && SelectedVariant ? (
                    <>{formatCurrency(SelectedVariant.price * Counter)}</>
                  ) : (
                    <>{formatCurrency(ProductData.price * Counter)}</>
                  )}
                </h4>
                <h6 className="text-xs text-red-500 mb-2">
                  {"Get our app to avail exclusive 5% discount"}
                </h6>
                <h6 className="mb-0">
                  {ProductData.iventoryCount ? (
                    <>
                      <span className=" text-logreen rounded-sm">
                        {"In Stock"}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="bg-red-400 text-white py-[4px] px-[12px] rounded-sm">
                        {"Out of Stock"}
                      </span>
                    </>
                  )}
                </h6>
                {/* Variant is given */}
                {SelectedVariant && ProductData.variants ? (
                  <>
                    <div
                      className="flex justify-around items-center text-xs
                    mb-3 "
                    >
                      <h6 className="text-sm font-semibold" >Size</h6>
                      {Array.isArray(ProductData.variants) &&
                        ProductData.variants.map((variant, i) => (
                          <>
                            <div className="flex justify-center items-center flex-wrap">
                              <Radio
                                key={i}
                                onClick={() => handleSelectedVariant(variant)}
                                className={`py-1 text-xs   text-[#333] `}
                                value={variant.size}
                                name={variant.size}
                                checked={variant === SelectedVariant}
                              />
                              <label>{variant.size}</label>
                            </div>
                          </>
                        ))}
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div className="flex mb-3">
                  <div className="mr-3">
                    <h6>Quantity</h6>
                  </div>
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
                      />
                    </div>
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      onClick={handleIncrement}
                    >
                      <iconify-icon icon="ic:twotone-plus"></iconify-icon>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleAddTocart(ProductData)}
                  className="btn flex justify-between items-center bg-lgreen text-white w-full rounded-md"
                >
                  Add To Cart{" "}
                  <p className="text-[18px]">
                    <iconify-icon icon="pepicons-pop:cart"></iconify-icon>
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[80%] mb-12">
          <Tabs
            defaultActiveKey="1"
            className="overflow-hidden mx-5 w-full "
            items={TabsItem}
          />
        </div>
      </div>
      <div className="desk-hide mx-3">
        <div className="flex flex-col justify-center items-center ">
          <div>
            <img
              src={`/${ProductData.image}`}
              alt={ProductData.name}
              className={`  ${ProductData._id === "6692334ab63a6fb89d6a5792"
                ? "w-[100px]  "
                : "w-[200px] object-contain  "
                }`}
            />
          </div>
        </div>
        <h3 className="font-extrabold text-center text-[#444] text-xl text-wrap pb-4 mx-2">
          {ProductData.name}
        </h3>
        <div className="flex justify-between items-center mx-4 mb-2">
          <div>
            <h4 className="text-[22px] font-bold">
              {ProductData.variants && SelectedVariant ? (
                <>{formatCurrency(SelectedVariant.price * Counter)}</>
              ) : (
                <>{formatCurrency(ProductData.price * Counter)}</>
              )}
            </h4>
          </div>
          <div>
            <h6 className="mb-0">
              {ProductData.iventoryCount ? (
                <>
                  <span className=" text-logreen rounded-sm">{"In Stock"}</span>
                </>
              ) : (
                <>
                  <span className="bg-red-400 text-white py-[4px] px-[12px] rounded-sm">
                    {"Out of Stock"}
                  </span>
                </>
              )}
            </h6>
          </div>
        </div>
        <h6 className="text-sm text-red-500 font-semibold mb-3 mx-2">
          {"Get our app to avail exclusive 5% discount"}
        </h6>
        <div>
          {SelectedVariant && ProductData.variants ? (
            <>
              <div
                className=" text-xs overflow-hidden
                    mb-3 "
              >
                <h6 className="pr-1 text-[16px] relative left-3 mb-1">Size</h6>
                <div className="flex  items-center overflow-hidden">
                  {Array.isArray(ProductData.variants) &&
                    ProductData.variants.map((variant, i) => (
                      <>
                        <Radio
                          key={i}
                          onClick={() => handleSelectedVariant(variant)}
                          className={`py-2 text-xs px-2   text-[#333] n `}
                          value={variant.size}
                          name={variant.size}
                          checked={variant === SelectedVariant}
                        />
                        <label>{variant.size}</label>
                      </>
                    ))}
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="flex justify-between items-center mx-4 mb-2 overflow-hidden">
          <div>
            <div className="flex mb-3 items-center justify-center">
              <div className="mr-1">
                <h6 className="text-xs relative top-1">Quantity</h6>
              </div>
              <div className="flex items-center justify-center text-xs w-[90px] relative top-[6px] h-[33px] border-progray border">
                <div
                  className="flex flex-col items-center cursor-pointer px-2"
                  onClick={handleDecrement}
                >
                  <iconify-icon icon="ri:subtract-line"></iconify-icon>
                </div>{" "}
                <div className="flex flex-col justify-center items-center">
                  <input
                    type="text"
                    className="text-center w-[30px]"
                    value={Counter}
                    onChange={handleValueChange}
                    readOnly
                  />
                </div>
                <div
                  className="flex flex-col items-center cursor-pointer px-2"
                  onClick={handleIncrement}
                >
                  <iconify-icon icon="ic:twotone-plus"></iconify-icon>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => handleAddTocart(ProductData)}
              className="btn flex justify-between items-center
               bg-lgreen text-white  text-sm rounded-md "
            >
              Add To Cart &nbsp;
              <p className="text-[16px] relative top-[1.5px]">
                <iconify-icon icon="pepicons-pop:cart"></iconify-icon>
              </p>
            </button>
          </div>
        </div>
        <hr />
        <div className="flex justify-around items-center pt-9 px-1 text-sm pb-12 overflow-hidden">
          <div>
            <Rate value={"4"} disabled={true} style={{
              fontSize: "18px"
            }} />{" "}
          </div>
          <div>
            <span className=" text-sm text-logreen">
              {AllReview.length} reviews
            </span>{" "}
            <span className="mr-1">|</span>
            <button
              onClick={() => {
                setAddReview(!AddReview);
                if (!AddReview) {
                  setTimeout(() => {
                    document
                      .getElementById("reviewFormContainer")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 0);
                }
              }}
              className=" transition-all   text-logreen"
            >
              Write a Review
            </button>
          </div>
        </div>
        <hr />
        <div className="py-4 leading-8 text-sm mx-3">
          {renderShortDescription(ProductData.shortdescription)}
        </div>
        <button className="lines ">Description</button>
        <hr />
        <div
          className="py-2 px-2 text-sm"
          dangerouslySetInnerHTML={{ __html: ProductData.longdescription }}
        />
        <hr />
        <div id="reviewFormContainer" className="py-4 mx-2 pb-4">
          <div>
            {" "}
            <h3 className="text-[29px] font-bold mb-1">Product Reviews</h3>
          </div>
          <div>
            <button
              onClick={() => {
                setAddReview(!AddReview);
              }}
              className="btn transition-all bg-lgreen hover:bg-orange-500 focus:bg-orange-500 text-white"
            >
              Write a Review
            </button>
          </div>
        </div>
        {AddReview && (
          <>
            <div
              id="reviewFormContainer"
              className="py-7 mx-3 text-[22px] font-semibold"
            >
              Write Your Own Review
            </div>
            <form
              className="xl:my-6 my-1 transition-all"
              onSubmit={handleSubmit(handleAddReview)}
            >
              <div className="block mb-4">
                <p className="text-black pb-2">
                  <span className="text-red-400">* </span> Rating
                </p>
                <Rate id="rating" onChange={(value) => setRatingStar(value)} />
                <br />
                {errors.rating && (
                  <span className=" text-red-600">{errors.rating.message}</span>
                )}
              </div>
              <div className="block mb-4">
                <p className="pb-2">* Write a headline for your review here:</p>
                <input
                  type="text"
                  className={`py-[6px]
                px-[6px] w-full border border-[#ccc] w-[45%]
                rounded-sm hover:border-gray-600 focus:border-gray-600 outline-none mb-2
                     `}
                  {...register("headline")}
                />
                <br />
                {errors.headline && (
                  <span className=" text-red-600">
                    {errors.headline.message}
                  </span>
                )}
              </div>
              <div className="block mb-4">
                <p className="pb-2">* Write a headline for your review here:</p>
                <textarea
                  className={`py-[6px]
                px-[6px] w-full border border-[#ccc] w-[45%]
                rounded-sm hover:border-gray-600 focus:border-gray-600 outline-none mb-2
                     `}
                  cols={4}
                  rows={4}
                  {...register("reviewhere")}
                />
                <br />
                {errors.reviewhere && (
                  <span className=" text-red-600">
                    {errors.reviewhere.message}
                  </span>
                )}
              </div>

              <div className="block mb-4">
                <p className=" pb-2">Enter your name:</p>
                <input
                  type="text"
                  className={`py-[6px]
                px-[6px] w-full border border-[#ccc] w-[45%]
                rounded-sm hover:border-gray-600 focus:border-gray-600 outline-none mb-2
                     `}
                  {...register("name")}
                />
                <br />
                {errors.name && (
                  <span className=" text-red-600">{errors.name.message}</span>
                )}
              </div>
              <ul className="nav-item">
                <li>
                  <button className="btn bg-lgreen hover:bg-orange-400 text-white rounded">
                    Save My Review{" "}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setAddReview(false)}
                    className="btn border-lgreen transition-all bg-transparent border text-black rounded"
                  >
                    Cancel
                  </button>
                </li>
              </ul>
            </form>
          </>
        )}
        <hr />
        <h4 className="text-[29px] font-bold mb-1 py-4">
          {"Related Products"}{" "}
        </h4>
      </div>
    </>
  );
}

export default Productdetails;
