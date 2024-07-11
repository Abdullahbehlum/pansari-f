import { Layout } from "antd";
import AdminHeader from "./layout/Header";
import { Outlet } from "react-router-dom";
import { Suspense, lazy, useMemo, useState } from "react";
import Sidebar from "./layout/Sidebar";

function AdminPannelLayout() {
  const { Content, Footer } = Layout;
  const Footers = lazy(() => import("./layout/Footer"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Layout>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Layout>
          <AdminHeader isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <Content
            style={{ padding: "20px", backgroundColor: "transparent" }}
          >
            <Outlet />
          </Content>
          <Footer
            style={{ textAlign: "center", backgroundColor: "transparent" }}
          >
            <div className="bg-transparent">
              <Suspense fallback={<></>}>
                <Footers />
              </Suspense>
            </div>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default AdminPannelLayout;
