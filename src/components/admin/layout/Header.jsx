import { Layout, Avatar, Button, Input, Dropdown, Menu, Badge } from "antd";
import Logo from "../../../assets/images/store-logo.png";
import human from "../../../assets/images/3d-illustration-human-avatar-profile_23-2150671142.avif";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutReducer, } from "../../redux/slice/AuthSlice.js"
import { toast } from "react-toastify";

function AdminHeader({ isSidebarOpen, toggleSidebar }) {
  const { Header } = Layout;
  const { Search } = Input;
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleLogout = async () => {
    await dispatch(LogoutReducer());
    toast.success("Logout Successfully!");
    navigate("/signin")
  }
  const ProfileDropDownItems = [{
    key: 1,
    label: (
      <>
        <p onClick={handleLogout} >
          Logout
        </p>
      </>
    )
  }]


  return (
    <>
      <Header
        style={{
          backgroundColor: "white",
        }}
        className="border-b border-progray h-min py-1 "
      >
        <div>

          <div className="flex justify-around items-center xl:mx-4 mx-1 ">

            {
              isSidebarOpen ? <>
                <Button onClick={toggleSidebar}  className=""  >
                  <iconify-icon icon="material-symbols:menu-open"></iconify-icon>
                </Button>
              </> : <></>
            }

            <div className="mb-hide">
              <Search
                placeholder="Search......."
                className="w-[500px] py-[18px]"
              />

            </div>
            <div>
              <div className="flex items-center ">

                <Badge count={0} showZero className="mr-3" >
                  <p className="text-[23px] mx-3 cursor-pointer ">
                    <iconify-icon icon="tdesign:notification-filled"></iconify-icon>
                  </p>

                </Badge>    <Dropdown
                  placement="bottomCenter" overlay={
                    <Menu>
                      {ProfileDropDownItems.map(item => (
                        <Menu.Item key={item.key}>
                          {item.label}
                        </Menu.Item>
                      ))}
                    </Menu>
                  } >
                  <Avatar onClick={(e) => e.preventDefault()} src={human} size={39} className="mx-2 cursor-pointer" />
                </Dropdown>

              </div>
            </div>
          </div>
        </div>
      </Header>


    </>
  );
}

export default AdminHeader;
