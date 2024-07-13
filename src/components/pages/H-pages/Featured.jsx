import React, { useState, useEffect } from "react";
import ghee from "../../../assets/images/desi_ghee.png";
import { Link } from "react-router-dom";
import Banner1 from "../../../assets/images/noor.jpg";
import Banner2 from "../../../assets/images/pansari-herbal-tea.png";
import { toast } from "react-toastify";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl.js"
function Featured() {
  const [FeaturdProductData, setFeaturedProductData] = useState([]);
  const [Loaded, SetLoaded] = useState(false);
  const handleFeaturedProduct = async () => {
    try {
      const { data: res } = await axios.get(`${BaseUrl}/api/v1/products/allproduct`);
      const showAllProduct = res.allproducts;
      setFeaturedProductData(showAllProduct);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleScrollTop = () => {
    window.scrollY(0, 0);
  };

  useEffect(() => {
    if (!Loaded) {
      handleFeaturedProduct();
    }
  }, []);

  return (
    <>
      <section className="xl:mb-16 mb-5 mb-hide">
        <h3 className="text-center xl:text-[32px]  text-[26px] font-semibold mb-5 xl:mb-5">
          Featured Products
        </h3>

        <div className="flex justify-around xl:flex-row md:flex-row sm:flex-row flex-col">
          <div className="overflow-hidden">
            <div className="featured-banner  ">
              <h1 className="xl:text-[32px] font-bold text-lightblues my-6">
                100% Pure <br /> Desi Ghee
              </h1>
              <img
                src={ghee}
                alt="ghee"
                className="object-cover xl:w-[200px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 *:w-[260px]  gap-x-4 grid-flow-row relative xl:right-6">
            {Array.isArray(FeaturdProductData) &&
              FeaturdProductData.map((f, i) => (
                <>
                  {f.FeaturedProduct === true && (
                    <>
                      <div className="py-4 text-center" key={i}>
                        <div className="border border-lightgray mb-2 w-[250px] h-[200px] flex flex-col justify-center items-center p-4">
                          <Link
                            onClick={handleScrollTop}
                            to={`/products/${f._id}`}
                          >
                            <img
                              src={`/${f.image}`}
                              alt={f.name}
                              className={` object-cover ${f._id === "6692334ab63a6fb89d6a5792"
                                  ? "w-[85px]  "
                                  : "w-[170px]"
                                }`}
                            />
                          </Link>
                        </div>
                        <h6 className="text-[11px] text-center text-wrap  mb-1">
                          <Link
                            onClick={handleScrollTop}
                            to={`/products/${f._id}`}
                          >
                            {f.name}
                          </Link>
                        </h6>
                      </div>
                    </>
                  )}
                </>
              ))}
          </div>
        </div>
      </section>

      {/* 2banner section is given */}
      <section className="mb-hide">
        <div className="flex justify-center items-center xl:mx-4 mb-4  ">
          <div className="mr-3">
            <Link to={"/category-product/honey"}>
              <img src={Banner1} alt="Banner1" className=" object-cover" />
            </Link>
          </div>
          <div>
            <Link to={"/category-product/herbal-tea"}>
              <img src={Banner2} alt="Banner1" className=" object-cover" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Featured;
