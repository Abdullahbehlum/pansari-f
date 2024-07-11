import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FetchAllProducts } from "../redux/slice/ProductSlice.js";
import { useEffect, useState } from "react";
import { Pagination, Select, Skeleton } from "antd";
const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
function formatCurrency(price) {
  return new Intl.NumberFormat("en-Pk", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: false,
  }).format(price);
}

function Herb() {
  const params = useParams();
  const dispatch = useDispatch();
  const [Loaded, SetLoaded] = useState(false);
  const Products = useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const fetchpro = Products.products;
  const { loading, totalPages } = Products;
  const FilteredProducts = fetchpro.filter(
    (product) => product.category === params.slug
  );
  const { Option } = Select;
  useEffect(() => {
    if (!Loaded) {
      dispatch(FetchAllProducts({ page: currentPage, limit }));
      SetLoaded(true);
    }
  }, [dispatch, Loaded, currentPage, limit]);

  const handleAddTocart = async (ProductId) => {
    const cart = dispatch(AddToCart(ProductId));
    if (cart) {
      toast.success("Added to cart successfully");
    }
  };
  const handlePagination = (page) => {
    setCurrentPage(page);
    SetLoaded(false);
  };
  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between  py-4 px-5">
            <h1 className="text-xl capitalize mb-2 xl:text-4xl font-bold tracking-tight text-gray-900">
              {params.slug}
            </h1>
            <div className="flex items-center">
              <div>
                <Select className="w-[160px]" defaultValue={"Sort By"}>
                  {sortOptions.map((sort, index) => (
                    <>
                      <Option key={index}>{sort.name}</Option>
                    </>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          {/* Product box  */}
          <div className="my-4">
            {params.slug && (
              <>
                {loading ? (
                  <>
                    <Skeleton />
                  </>
                ) : (
                  <>
                    <div className="grid xl:grid-cols-4 gap-3  xl:grid-cols-3 grid-cols-2 xl:mx-4">
                      {Array.isArray(FilteredProducts) &&
                        FilteredProducts.map((e, i) => (
                          <>
                            <Link key={i} to={`/products/${e._id}`}>
                              {" "}
                              <div
                                className={`border-[#ececec] 
                           cursor-pointer  ${
                             e.category == "supplements"
                               ? "xl:h-[270px] h-[200px]"
                               : "h-[300px]"
                           }  ${e.category == "herb" && "h-[266px]"}
                           rounded-lg  border flex justify-center items-center flex-col`}
                              >
                                <img
                                  src={`/public/${e.image}`}
                                  alt="herb"
                                  className={` ${
                                    e.category == "supplements"
                                      ? "w-[100px] xl:w-[160px] my-3"
                                      : "w-[230px] h-[230px] xl:h-auto"
                                  }  object-contain overflow-hidden my-0 `}
                                />
                                <h3
                                  className={`text-center text-wrap
                                     px-1 ${
                                       e.category == "supplements"
                                         ? "text-[11px] xl:mb-0 mb-0"
                                         : "xl:text-[13px] text-[12px]   mb-1"
                                     } ${e.category == "herb" && 'px-2'}`}
                                >
                                  {e.name}
                                </h3>
                                <p className="font-extrabold py-2">
                                  {formatCurrency(e.price)}
                                </p>
                                <button
                                  onClick={() => handleAddTocart(ProductData)}
                                  className=" flex justify-between items-center text-xs xl:text-sm 
                                  py-1 px-5  bg-lgreen text-white xl:w-[265px]  rounded-md"
                                >
                                  Add To Cart{" "}
                                  <p className="xl:text-[18px] relative top-[2.4px]">
                                    <iconify-icon icon="pepicons-pop:cart"></iconify-icon>
                                  </p>
                                </button>
                              </div>
                            </Link>{" "}
                          </>
                        ))}
                    </div>
                    <div className="flex justify-center my-4 items-center xl:my-12">
                      {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination
                          key={index}
                          onClick={() => handlePagination(index + 1)}
                          disabled={currentPage === index + 1}
                        >
                          {index + 1}
                        </Pagination>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Herb;
