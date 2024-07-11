import React from "react";
import urban from "../../../assets/images/ubtan.png";
import Yousf from "../../../assets/images/yousf.png";
import sandal from "../../../assets/images/sandal.png";
import coco from "../../../assets/images/coconut.png";
import almod from "../../../assets/images/almond.png";
import lavender from "../../../assets/images/lavender.png";
import { Link } from "react-router-dom";
import { UseScrollTop } from "../../hooks/HookScroll.js";
function Pansaricodwidget() {
  const ScrollTop = UseScrollTop();
  return (
    <>
      <section>
        <div className="pansari_img xl:block hidden md:hidden sm:hidden ">
          <div className="flex justify-around items-center xl:flex-row md:flex-row sm:flex-row flex-col">
            <div className="mt-[-5em] mx-4">
              <h1 className="text-[45px] leading-[42px] xl:mb-6 font-bold text-white">
                Pansari's
                <br className="mb-hide" /> Beauty
                <br className="mb-hide" />
                Arena
              </h1>
              <Link
                onClick={ScrollTop}
                to={"/category-product/beauty-arena"}
                className="py-[8px] px-[10px] bg-lgreen text-white"
              >
                VIEW ALL RANGE
              </Link>
            </div>
            <div className="flex xl:mt-[14em] mr-[17.9em]">
              <img src={urban} className=" object-cover mr-[-63px]" />
              <img src={Yousf} className=" object-cover mr-[-63px]" />
              <img src={sandal} className="object-cover mr-[-1px]" />
            </div>
          </div>
        </div>
        <div className="Oil_img xl:block hidden md:hidden sm:hidden mb-10">
          <div className="flex justify-around items-center xl:flex-row md:flex-row sm:flex-row flex-col">
            <div className="xl:mt-[">
              <h1 className="text-[45px] leading-[55px] xl:mb-6 font-bold text-white">
                Extra Virgin
                <br className="mb-hide" />
                Organic <br className="mb-hide" /> Oils
              </h1>
              <Link
                to={"/category-product/oil"}
                className="py-[8px] px-[10px] bg-lgreen text-white"
                onClick={ScrollTop}
              >
                VIEW ALL RANGE
              </Link>
            </div>
            <div className="grid xl:grid-cols-3  grid-cols-1 gap-5 xl:mt-[6.9em]">
              <img src={coco} className="w-[150px] object-cover" />
              <img src={almod} className="w-[150px] object-cover" />
              <img src={lavender} className="w-[150px] object-cover" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Pansaricodwidget;
