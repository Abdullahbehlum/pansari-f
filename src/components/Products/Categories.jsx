import React, { useEffect, useState } from "react";
import herb from "../../assets/images/herbs.jpg";
import WeekProduct from "../../assets/images/prod_week.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { BaseUrl } from "../utils/BaseUrl.js"
function Categories() {
  const [AllCategory, SetAllCategory] = useState([]);
  const [Loaded, SetLoaded] = useState(false);
  const handleAllCategories = async () => {
    try {
      const { data: res } = await axios.get(`${BaseUrl}/api/v1/category/allcategories`);
      const showAllCategories = res.Allcategory;
      SetAllCategory(showAllCategories);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (!Loaded) {
      handleAllCategories();
    }
  }, []);
  return (
    <>
      <section>
        <div className="grid xl:grid-cols-3 place-content-center place-items-center grid-cols-2 *:w-[150px] *:mb-[20px]">
          {Array.isArray(AllCategory) ? (
            AllCategory.map((c, i) => (
              <>
                <Link to={`/category-product/${c.slug}`} key={i}>
                  <div
                    key={i}
                    className="border-[#ececec] border flex justify-center items-center flex-col p-3"
                  >
                    <img
                      src={`/public/${c.Categoryimage}`}
                      alt={c.Categoryname}
                      className="w-[100px] mb-1 object-cover"
                    />
                    <h3 className="text-center">{c.Categoryname}</h3>
                  </div>
                </Link>
              </>
            ))
          ) : (
            <></>
          )}
        </div>
      </section>
      <section className="my-5 flex flex-col justify-center items-center">
        <h3 className="text-[30px] font-bold text-center my-4">
          Product of the Week
        </h3>
        <div
          className="border-[#ececec] border flex
       p-2  justify-center items-center w-[300px] flex-col p-3"
        >
          <img src={WeekProduct} alt="herb" className="w-full object-cover" />
        </div>
      </section>
    </>
  );
}

export default Categories;
