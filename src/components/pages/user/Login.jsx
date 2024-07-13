import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/bg-images.css";
import CustomLogin from "../../../assets/images/customer_login.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LoginReducer } from "../../redux/slice/AuthSlice.js"
import { BaseUrl } from "../../utils/BaseUrl.js"
const SiginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is requird")
    .email("Invalid email address "),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(26, "Password must be at most 26 characters"),

});
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleBlur, handleChange, handleSubmit, errors, values } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: SiginSchema,
      onSubmit: async (values) => {
        try {
          const { data: res } = await axios.post(`${BaseUrl}/api/v1/auth/signin`, values);
          console.log(res);
          if (res?.token) {
            toast.success(res.message);
            {
              res?.user.role === "user" ?
                navigate("/profile") :
                navigate("/admin/dashboard")
            }

            const token = localStorage.setItem("auth", res?.token);
            await dispatch(LoginReducer({ token: token, userRole: res.user.role }));

          }

        } catch (error) {
          toast.error(error.response.data.error);
        }

      }
    })
  return (
    <>
      <section className="mb-3">
        <div className="sign-image mb-hide">
          <div
            className={`shadow-xl w-[300px] ${errors.email || errors.password ? "h-[330px]" : 'h-[290px]'}  
              }  border border-[#ccc]
           relative xl:mt-[50px] text-[13px] xl:absolute xl:right-[44px] rounded-md  bg-white  xl:py-[43px] xl:px-[22px]`}
          >
            <form onSubmit={handleSubmit}>
              <div className="block mb-3 text-[13px]  ">
                <p className="font-bold text-loggray mb-1">Email</p>
                <input
                  type="text"
                  placeholder="Email Address...."
                  autoComplete="off"
                  className={`py-[6px]
                px-[6px] w-full border border-[#ccc]
                rounded-sm hover:border-gray-600
                 ${errors.email ? 'border border-red-400' : ''}
               ${values.email && 'border border-lgreen'} focus:border-gray-600 outline-none mb-2`}
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}

                  value={values.email}
                />
                {
                  errors.email && (
                    <>
                      <span className="text-red-500" >
                        {errors.email}
                      </span>
                    </>
                  )
                }
              </div>
              <div className="block mb-3 text-[13px]">
                <p className="font-bold mb-1 text-loggray">Password</p>
                <input
                  type="text"
                  placeholder="Password...."
                  autoComplete="off"
                  className={`py-[6px]
                  px-[6px] w-full border border-[#ccc]
                   ${errors.password ? 'border border-red-400' : ''}
               ${values.password && 'border border-lgreen'}
                  rounded-sm hover:border-gray-600 focus:border-gray-600 outline-none mb-2
                  `}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}

                />
                {
                  errors.password && (
                    <>
                      <span className="text-red-500" >
                        {errors.password}
                      </span>
                    </>
                  )
                }
              </div>

              <div className="text-[12px] text-loggray text-end mb-2 hover:text-orange-600">
                <Link to={"#"}>Forgot Password?</Link>
              </div>
              <button className=" p-[5px] bg-lgreen text-white w-full">
                {"Sign in"}
              </button>
              <div className="text-[12px] text-loggray text-center mt-2">
                Don't have an account?  <Link className="hover:text-orange-600" to={"/signup"}>Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="desk-hide mb-8">
        {/* desktop */}
        <div className="w-[355px]">
          <img src={CustomLogin} alt="CustomLogin" className="object-cover" />
        </div>
        <div
          className="shadow-xl  border border-[#ccc] mx-4
            text-[14px]  rounded-md  bg-white  py-[33px] px-[22px]"
        >
          <form onSubmit={handleSubmit}>
            <div className="block mb-3 text-[13px]  ">
              <p className="font-bold text-loggray mb-1">Email</p>
              <input
                type="text"
                placeholder="Email Address...."
                autoComplete="off"
                className={`py-[6px]
                px-[6px] w-full border border-[#ccc]
                rounded-sm hover:border-gray-600
                 ${errors.email ? 'border border-red-400' : ''}
               ${values.email && 'border border-lgreen'} focus:border-gray-600 outline-none mb-2`}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}

                value={values.email}
              />
              {
                errors.email && (
                  <>
                    <span className="text-red-500" >
                      {errors.email}
                    </span>
                  </>
                )
              }
            </div>
            <div className="block mb-3 text-[13px]">
              <p className="font-bold mb-1 text-loggray">Password</p>
              <input
                type="text"
                placeholder="Password...."
                autoComplete="off"
                className={`py-[6px]
                  px-[6px] w-full border border-[#ccc]
                   ${errors.password ? 'border border-red-400' : ''}
               ${values.password && 'border border-lgreen'}
                  rounded-sm hover:border-gray-600 focus:border-gray-600 outline-none mb-2
                  `}
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}

              />
              {
                errors.password && (
                  <>
                    <span className="text-red-500" >
                      {errors.password}
                    </span>
                  </>
                )
              }
            </div>

            <div className="text-[12px] text-loggray text-end mb-2 hover:text-orange-600">
              <Link to={"#"}>Forgot Password?</Link>
            </div>
            <button className=" p-[5px] bg-lgreen text-white w-full">
              {"Sign in"}
            </button>

          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
