import { CloudUploadOutlined } from "@ant-design/icons";
import "../../styles/FileInput.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ReactQuill from "react-quill";
import { Select } from "antd";
import { useParams } from "react-router-dom";
import { BaseUrl } from "../../utils/BaseUrl.js"
function AddProduct() {
  const { productid } = useParams();
  const [ProductData, SetProductData] = useState({
    Pname: "",
    price: "",
    iventoryCount: "",
    sizes: [
      { size: "", price: "" },
      { size: "", price: "" },
      { size: "", price: "" },
    ],

    categories: "",
    shortdescription: "",
    longdescription: "",
    image: null,
  });
  const [allcategorys, SetAllCategory] = useState([]);
  const [Loaded, SetLoaded] = useState(false);
  const { Option } = Select;
  const handleAddProduct = async (e) => {
    try {
      e.preventDefault();
      const form = new FormData();
      if (
        ProductData.Pname === "" ||
        ProductData.price === "" ||
        ProductData.iventoryCount === 0 ||
        ProductData.longdescription === "" ||
        ProductData.image === null
      ) {
        toast.error("Product creation data is required!");
      }
      form.append("name", ProductData.Pname);
      form.append("price", ProductData.price);
      form.append("iventoryCount", ProductData.iventoryCount);
      ProductData.sizes.forEach((size, index) => {
        form.append(`variants[${index}][size]`, size.size);
        form.append(`variants[${index}][price]`, size.price);
      });
      form.append("shortdescription", ProductData.shortdescription);
      form.append("longdescription", ProductData.longdescription);
      form.append("category", ProductData.category);
      form.append("product-image", ProductData.image);
      const Url = productid
        ? `${BaseUrl}/api/v1/products/edit-product/${productid}`
        : `${BaseUrl}/api/v1/products/create`;
      const Method = productid ? "PUT" : "POST";
      const { data: response } = await axios({
        url: Url,
        method: Method,
        data: form,
      });

      if (response.success === true) {
        toast.success(response.message);
        SetProductData({
          Pname: "",
          price: "",
          iventoryCount: "",
          sizes: [
            {
              size: "",
              price: "",
            },
            {
              size: "",
              price: "",
            },
            {
              size: "",
              price: "",
            },
          ],
          shortdescription: "",
          longdescription: "",
          image: null,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
  const handledescription = (value) => {
    SetProductData({
      ...ProductData,
      longdescription: value,
    });
  };
  const handleSizeChange = (index, fieldName, value) => {
    const updatedSizes = [...ProductData.sizes];
    updatedSizes[index][fieldName] = value;
    SetProductData((prevState) => ({
      ...prevState,
      sizes: updatedSizes,
    }));
  };

  const handleAddSize = () => {
    SetProductData((prevState) => ({
      ...prevState,
      sizes: [...prevState.sizes, { size: "", price: "" }],
    }));
  };

  const handleRemoveSize = (index) => {
    const updatedSizes = [...ProductData.sizes];
    updatedSizes.splice(index, 1);
    SetProductData((prevState) => ({
      ...prevState,
      sizes: updatedSizes,
    }));
  };

  return (
    <>
      <div
        className="bg-white py-[19px]
     flex flex-col justify-center items-center  overflow-hidden   rounded-lg"
      >
        <h1
          className="text-[#333] border-lgreen border-b  text-start
          xl:mb-6 xl:py-2 py-0 mb-5 xl:font-semibold font-bold xl:text-[19px] text-lg  "
        >
          {productid ? "Edit Product" : "Create Products"}
        </h1>
        <form onSubmit={handleAddProduct}>
          <div className="flex justify-between flex-grow xl:flex-row md:flex-row sm:flex-row flex-col">
            <p className="xl:mt-2 mb-2 text-start font-semibold text-[12px]">
              Name <span className="text-red-500">*</span>{" "}
            </p>{" "}
            <input
              type="text"
              placeholder="Name"
              className="py-[10px] px-[10px] border outline-none 
          xl:mb-6 mb-5 border-progray ml-3 focus:border-gray-300 rounded xl:w-[780px] w-[285px]"
              onChange={(e) =>
                SetProductData({ ...ProductData, Pname: e.target.value })
              }
              value={ProductData.Pname}
            />
          </div>

          <div className="flex justify-between xl:flex-row md:flex-row sm:flex-row flex-col">
            <p className="xl:mt-2 mb-2 text-start font-semibold text-[12px]">
              Price <span className="text-red-500">*</span>{" "}
            </p>{" "}
            <input
              type="text"
              placeholder="price"
              name="price"
              className="py-[10px] px-[10px] border outline-none 
          xl:mb-6 mb-5 border-progray ml-3 focus:border-gray-300 rounded xl:w-[780px] w-[285px]"
              onChange={(e) =>
                SetProductData({ ...ProductData, price: e.target.value })
              }
              value={ProductData.price}
            />
          </div>
          <div className="flex justify-between xl:flex-row md:flex-row sm:flex-row flex-col">
            <p className="xl:mt-2 mb-2 text-start font-semibold text-[12px]">
              Quantity <span className="text-red-500">*</span>{" "}
            </p>{" "}
            <input
              type="number"
              placeholder="Quantity"
              name="Iventory Count"
              className="py-[10px] px-[10px] border outline-none 
          xl:mb-6 mb-5 border-progray ml-3 focus:border-gray-300 rounded xl:w-[780px] w-[285px]"
              onChange={(e) =>
                SetProductData({
                  ...ProductData,
                  iventoryCount: e.target.value,
                })
              }
              value={ProductData.iventoryCount}
            />
          </div>

          <div className="relative bottom-2 ">
            <button type="button" className="btn" onClick={handleAddSize}>
              Add Size
            </button>
          </div>
          {ProductData.sizes.map((size, index) => (
            <div key={index}>
              <label>Size {index + 1}:</label>
              <input
                type="text"
                value={size.size}
                className="py-[10px] px-[10px] border outline-none 
          xl:mb-6 mb-5 border-progray ml-3 focus:border-gray-300 rounded mx-2 "
                onChange={(e) =>
                  handleSizeChange(index, "size", e.target.value)
                }
                placeholder="Enter size"
              />
              <input
                type="number"
                value={size.price}
                onChange={(e) =>
                  handleSizeChange(index, "price", e.target.value)
                }
                placeholder="Enter price"
                className="py-[10px] px-[10px] border outline-none 
          xl:mb-6 mb-5 border-progray ml-3 focus:border-gray-300 rounded mx-2 "
              />
              <button
                className="btn bg-green-500 focus:bg-green-300"
                type="button"
                onClick={() => handleRemoveSize(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between xl:flex-row md:flex-row sm:flex-row flex-col">
            <p className="xl:mt-6 mb-2 text-start font-semibold text-[12px]">
              short description <span className="text-red-500">*</span>{" "}
            </p>{" "}
            <textarea
              cols={4}
              rows={4}
              placeholder="short description"
              name="shortdescription"
              className="py-[10px] px-[10px] border outline-none 
          xl:mb-6 mb-5 border-progray ml-3 focus:border-gray-300 rounded xl:w-[780px] w-[285px]"
              onChange={(e) =>
                SetProductData({
                  ...ProductData,
                  shortdescription: e.target.value,
                })
              }
              style={{ whiteSpace: "pre-line" }}
              value={ProductData.shortdescription}
            />
          </div>
          <div className="flex justify-between xl:flex-row md:flex-row sm:flex-row flex-col xl:mb-16">
            <p className="xl:mt-6 mb-2  text-start font-semibold text-[12px]">
              Long Description <span className="text-red-500">*</span>{" "}
            </p>{" "}
            <ReactQuill
              theme="snow"
              placeholder=" Long Description"
              className=" xl:w-[780px] w-[285px]"
              onChange={handledescription}
              value={ProductData.longdescription}
            />
          </div>
          <div className="flex justify-between xl:flex-row md:flex-row sm:flex-row flex-col xl:mb-5">
            <p className="xl:mt-6 mb-2  text-start font-semibold text-[12px]">
              Category <span className="text-red-500">*</span>{" "}
            </p>{" "}
            <Select
              defaultValue={"Choose a Category"}
              placement="bottomLeft"
              onChange={(value) =>
                SetProductData({ ...ProductData, category: value })
              }
              className="xl:w-[780px] w-[285px] xl:h-[60px] h-auto"
            >
              {allcategorys.map((c) => (
                <>
                  <Option key={c.slug}>{c.Categoryname}</Option>
                </>
              ))}
            </Select>
          </div>

          <div className="flex justify-between xl:items-center xl:flex-row md:flex-row sm:flex-row flex-col xl:mb-6 mb-5">
            <p className="xl:mt-4 mb-2 font-semibold mr-3  text-[12px]">
              Product Image <span className="text-red-500">*</span>{" "}
            </p>{" "}
            <div className="drop-file-input ml-5">
              <div className="drop-file-input__label">
                <CloudUploadOutlined className="text-[42px] text-[#333]" />
                <p>Drag & Drop your files here</p>
              </div>
              <input
                type="file"
                name="product-image"
                onChange={(e) =>
                  SetProductData({ ...ProductData, image: e.target.files[0] })
                }
              />
            </div>
          </div>
          <div className="flex justify-center items-center flex-col">
            <img
              src={ProductData.image && URL.createObjectURL(ProductData.image)}
              className="w-[120px] object-cover mb-3"
            />
          </div>
          <div className="flex justify-center items-center xl:flex-row flex-col">
            <button className="btn bg-lgreen xl:w-[285px] w-[150px] text-white rounded">
              {productid ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default AddProduct;
