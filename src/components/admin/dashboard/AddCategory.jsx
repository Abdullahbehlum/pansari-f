import { CloudUploadOutlined } from "@ant-design/icons";
import "../../styles/FileInput.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl.js"
import { useNavigate, useParams } from "react-router-dom";
function AddCategory() {
  const { categoryid } = useParams();
  const [AddCategorys, SetAddCategory] = useState({
    Categoryname: "",
    Categoryimage: null,
  });
  const navigate = useNavigate();
  const handleAddCategory = async (e) => {
    try {
      e.preventDefault();
      const form = new FormData();
      form.append("Categoryname", AddCategorys.Categoryname);
      form.append("imagecategory", AddCategorys.Categoryimage);
      const categoryId = categoryid ? categoryid : null; // Handle null for new categories

      const Url = categoryId
        ? `${BaseUrl}api/v1/category/updateCategory/${categoryId}`
        : `${BaseUrl}/api/v1/category/create`;
      const Method = categoryId ? "PUT" : "POST";
      const { data: response } = await axios({
        method: Method,
        url: Url,
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      if (response.success === true) {
        toast.success(response.messages);
        SetAddCategory({
          Categoryname: "",
          Categoryimage: [],
        });
        navigate("/admin/all-category");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div
        className="bg-white py-[19px]
     flex flex-col justify-center items-center  overflow-hidden   rounded-lg"
      >
        <h1
          className="text-[#333] border-lgreen border-b  
          xl:mb-6 xl:py-2 py-0 mb-5 xl:font-semibold font-bold xl:text-[19px] text-lg  "
        >
          {categoryid ? "Edit Category" : " Add Category"}
        </h1>
        <form onSubmit={handleAddCategory}>
          <div className="flex justify-between xl:flex-row md:flex-row sm:flex-row flex-col">
            <p className="xl:mt-2 mb-2 text-start font-semibold text-[12px]">
              Category Name <span className="text-red-500">*</span>{" "}
            </p>{" "}
            <input
              type="text"
              placeholder="Name"
              name="Categoryname"
              value={AddCategorys.Categoryname}
              className="py-[10px] px-[10px] border outline-none 
          xl:mb-6 mb-5 border-progray ml-3 focus:border-gray-300 rounded xl:w-[780px] w-[285px]"
              onChange={(e) => {
                SetAddCategory({
                  ...AddCategorys,
                  Categoryname: e.target.value,
                });
              }}
            />
          </div>

          <div className="flex justify-between xl:items-center xl:flex-row md:flex-row sm:flex-row flex-col xl:mb-6 mb-5">
            <p className="xl:mt-4 mb-2 font-semibold mr-3 text-[12px]">
              Category Image <span className="text-red-500">*</span>{" "}
            </p>{" "}
            <div className="drop-file-input">
              <div className="drop-file-input__label">
                <CloudUploadOutlined className="text-[42px] text-[#333]" />
                <p>Drag & Drop your files here</p>
              </div>
              <input
                type="file"
                name="imagecategory"
                onChange={(e) => {
                  SetAddCategory({
                    ...AddCategorys,
                    Categoryimage: e.target.files[0],
                  });
                }}
              />
            </div>
          </div>
          <div className="flex justify-center items-center flex-col">
            {AddCategorys.Categoryimage && (
              <>
                <img
                  src={
                    AddCategorys.Categoryimage &&
                    URL.createObjectURL(AddCategorys.Categoryimage)
                  }
                  alt={AddCategorys.Categoryimage.name}
                  className="w-[100px] object-cover  mb-3"
                />
              </>
            )}
          </div>
          <div className="flex justify-center items-center xl:flex-row flex-col">
            <button className="btn bg-lgreen xl:w-[285px] w-[150px] text-white rounded">
              {categoryid ? "Update Category" : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddCategory;
