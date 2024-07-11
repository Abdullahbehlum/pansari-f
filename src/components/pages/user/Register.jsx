import { Link, useNavigate } from "react-router-dom";
import "../../styles/bg-images.css";
import axios from "axios";
import Honey from "../../../assets/images/honey_signup.png"
import { toast } from "react-toastify"
import * as yup from "yup"
import { useFormik } from "formik";
import { BaseUrl } from "../../utils/BaseUrl.js"
const UserSchema = yup.object({
  uname: yup.string().required().min(4),
  email: yup.string().trim().required().email(),
  password: yup.string().trim().required().min(8),
  confirmpassword: yup.string().required().oneOf([yup.ref('password'), null], "Password does not match"),
})
function Register() {
  const navigate = useNavigate();
  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: {
        uname: "",
        email: "",
        password: "",
        confirmpassword: "",
      },
      validationSchema: UserSchema,
      onSubmit: async (values) => {
        try {

          const { data: res } = await axios.post(`${BaseUrl}/api/v1/auth/signup`, values);
          if (res?.User) {
            toast.success(res.message);
            navigate("/signin")
          }
        } catch (errors) {
          toast.error(errors.response.data.message);
        }
      }
    })
  // abdullah4@gmail.com/

  return (
    <>
      <section className=" bg-[#f1f1f1] pb-5 mt-[-2em] xl:mt-[-1em]
      pt-8 xl:pt-0  xl:pb-0 ">
        <div className="flex justify-around items-center
         xl:flex-row md:flex-row sm:flex-row xl:mt-[-0.6em] mt-0 flex-col">
          <div
            className={`shadow-xl xl:w-[550px] w-[330px] xl:left-12 left-0
               xl:mb-24 mb-0 xl:top-12  top-0  border border-[#ccc]
           relative  text-[13px]   rounded-md  bg-white  py-[43px] px-[22px]`}>
            <div className="text-[12px] text-loggray text-start mb-3 ">
              Already have an Memnber    <Link className="text-blue-500" to={"/signin"}>Sign in</Link>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="block mb-3 text-[13px] ">
                <p className="font-bold text-loggray mb-1">Name</p>
                <input
                  type="text"
                  placeholder="Name...."
                  autoComplete="off"
                  className={`py-[6px]
                px-[6px] w-full border border-[#ccc] w-[220px]
                rounded-sm hover:border-gray-600
                 ${errors.uname ? 'border border-red-400' : ''}
               ${values.uname && 'border border-lgreen'} focus:border-gray-600 outline-none mb-2`}
                  name="uname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.uname}
                />
                {
                  errors.uname && (
                    <>
                      <span className="text-red-500" >
                        {errors.uname}
                      </span>
                    </>
                  )
                }
              </div>
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
              <div className="block mb-3 text-[13px]">
                <p className="font-bold mb-1 text-loggray"> Confirm Password</p>
                <input
                  type="text"
                  placeholder="Confirm Password...."
                  autoComplete="off"
                  className={`py-[6px] ${errors.confirmpassword ? 'border border-red-400' : ''}
               ${values.confirmpassword && 'border border-lgreen'}   px-[6px] w-full border border-[#ccc]
                  rounded-sm hover:border-gray-600 focus:border-gray-600 outline-none mb-2
                  `}
                  name="confirmpassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmpassword}

                />
                {
                  errors.confirmpassword && (
                    <>
                      <span className="text-red-500" >
                        {errors.confirmpassword}
                      </span>
                    </>
                  )
                }
              </div>
              <div className="text-[12px] text-loggray text-end mb-2 hover:text-orange-600">
                <Link to={"#"}>Forgot Password?</Link>
              </div>
              <button className=" p-[5px] bg-lgreen text-white w-full">
                {"Create New Account"}
              </button>

            </form>
          </div>
          <div>
            <img src={Honey} alt="Honey" className="xl:h-[550px] h-[350px] object-contain" />
          </div>
        </div>
      </section>

    </>
  );
}

export default Register;