import React from "react";
import Image1 from "../../../assets/images/flabyouless.png";
import bottale1 from "../../../assets/images/beetroth.png";
import bottale2 from "../../../assets/images/spinach.png";
import bottale3 from "../../../assets/images/Ashwagandah.png";
import bottale4 from "../../../assets/images/Ginseng.png";
import { Link } from "react-router-dom";
import { UseScrollTop } from "../../hooks/HookScroll.js"
function WeightLoss() {
  const ScrollTop = UseScrollTop();
  return (
    <>
      <div className="banner_img xl:block hidden md:hidden sm:hidden mb-10">
        <div className="flex justify-around items-center xl:flex-row md:flex-row sm:flex-row flex-col">
          <div className="xl:mt-[">
            <h1 className="text-[32px] xl:text-[45px] leading-[44px] xl:mb-6 font-semibold text-white">
              Pansari's
              <br className="mb-hide" /> Herbal
              <br className="mb-hide" />
              Supplements
            </h1>
            <Link to={"/category-product/supplements"} className="py-[8px] px-[10px] bg-lgreen text-white">
              VIEW ALL RANGE
            </Link>
          </div>
          <div className="grid xl:grid-cols-4 overflow-hidden  grid-cols-1 gap-5 xl:mt-[6.9em]">
            <Link to={`/products/6692334ab63a6fb89d6a5792`} onClick={ScrollTop}>
              <img src={bottale1} className="w-[150px] object-cover" />
            </Link>

            <img src={bottale2} className="w-[150px] object-cover" />
            <Link to={`/products/66922f4eb63a6fb89d6a5599`} onClick={ScrollTop}>
              <img src={bottale3} className="w-[150px] object-cover" />
            </Link>
            <img src={bottale4} className="w-[150px] object-cover" />
          </div>
        </div>
      </div>
    </>
  );
}

export default WeightLoss;
