import { Swiper, SwiperSlide } from "swiper/react";
import MobileBanner from "../../../assets/images/mob_banner.jpg";
import "swiper/css";
import "swiper/css/effect-fade";
import {UseScrollTop} from "../../hooks/HookScroll.js"
import { Autoplay, EffectFade } from "swiper/modules";
import b1 from "../../../assets/images/1746551250_Pansri-Pakistan-Fist-Herbal-Store.png";
import b2 from "../../../assets/images/1908646202_Cures-By-Nature.png";
import b3 from "../../../assets/images/1233917549_Go-Herbal.png";
import b4 from "../../../assets/images/141656326_Slider-Banner-Nature-Love-Club.png";
import b5 from "../../../assets/images/924485016_Web-Main-Banner.png";
import cb1 from "../../../assets/images/89df0f88f22be0940e8eadc9cc661ae4.png";
import cb2 from "../../../assets/images/03c2e6ef7dcad01981966010d144d83e.png";
import cb3 from "../../../assets/images/f181bcf578f74de1e5696492d4ce84ad.jpg";
import cb4 from "../../../assets/images/9628e7ca363a1c3f4a46a91b7a169319.png";
import cb5 from "../../../assets/images/f282b27d26aa6978a72d1b48ac49912d.jpg";
import sb1 from "../../../assets/images/49c60a890ef13a3aeb325f86405173ff.jpg";
import sb2 from "../../../assets/images/1946c6e05326c6c5018c161634c9339b.png";
import { Link, useNavigate, useParams } from "react-router-dom";
function Hero() {
  const navi = useNavigate();
  const ScrollTop = UseScrollTop()
  return (
    <>
      <section className="mb-5 mb-hide"></section>

      {/* Desktop Hero Section is given */}
      <section className=" hidden xl:block overflow-hidden mb-4 my-8">
        <div className=" grid grid-cols-3 overflow-hidden ">
          <div className="w-[100%] relative left-[40px]  *:mb-3">
            <Swiper
              autoplay={true}
              effect={"fade"}
              modules={[Autoplay, EffectFade]}
              className="w-[585px] "
            >
              <SwiperSlide>
                <img
                  src={b1}
                  alt="image"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={b2}
                  alt="image"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={b3}
                  alt="image"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={b4}
                  alt="image"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={b5}
                  alt="image"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </SwiperSlide>
            </Swiper>

            <ul className="flex w-[141.9%] *:mr-3">
              <li>
                <Link to={`/category-product/men-health`}>
                  <img src={sb1} className="object-cover w-[490px]" />
                </Link>
              </li>
              <li>
                <Link to={`/category-product/women-health`}>
                  <img src={sb2} className="object-cover w-[490px]" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="relative left-[220px]  *:mb-3">
          <Link onClick={ScrollTop}  to={"/products/66923241b63a6fb89d6a56f2"} className="mb-3">
            <img src={cb1} className="object-cover w-[284px]" />
           </Link>
            <Link onClick={ScrollTop}  to={"/category-product/oil"} className="mb-3">
              <img src={cb5} className="object-cover w-[284px]" />
            </Link>
          </div>
          <div className="relative left-[92px] *:mb-3">
           <Link to={`/products/6692303bb63a6fb89d6a55e8`}>
           <img src={cb2} className="object-cover w-[287px] cursor-pointer" />
           </Link>
            <img
              src={cb3}
              onClick={() => navi("/")}
              className="object-cover w-[287px] cursor-pointer"
            />
            <img
              src={cb4}
              onClick={() => navi("/")}
              className="object-cover w-[287px] cursor-pointer"
            />
          </div>
        </div>
      </section>

      <section className="desk-hide">
        <img src={MobileBanner} alt="Mb" className="w-[400px] object-cover" />
      </section>
    </>
  );
}

export default Hero;