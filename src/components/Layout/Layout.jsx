import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../loader/Loading";

function Layout() {
  const Header = lazy(() => import("./Header"));
  const Footer = lazy(() => import("./Footer"));
  return (
    <>
      <div className="mb-8 xl:mb-3">
        <Suspense
          fallback={
            <>
              <Loading />
            </>
          }
        >
          <Header />
        </Suspense>
      </div>
      <div>
        <Outlet />
      </div>
      <Suspense
        fallback={
          <>
            <Loading />
          </>
        }
      >
        <Footer />
      </Suspense>
    </>
  );
}

export default Layout;
