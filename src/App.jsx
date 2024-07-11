import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Loading from "./components/loader/Loading";
import { Skeleton } from "antd";
function App() {

  // user routes
  const Home = lazy(() => import("./components/pages/Home"));
  const AddToCart = lazy(() => import("./components/Products/AddToCart"));
  const Signin = lazy(() => import("./components/pages/user/Login.jsx"));
  const Signup = lazy(() => import("./components/pages/user/Register.jsx"));
  const ProductDetails = lazy(() =>
    import("./components/Products/Productdetails")
  );
  // checkout page

  const Checkout = lazy(() => import("./components/Products/checkout"));

  // Product pages is given
  const HerbProduct = lazy(() => import("./components/pages/Herb"));

  // Admin routes is given
  const AdminPannel = lazy(() => import("./components/admin/Pannel"));
  const AddProduct = lazy(() =>
    import("./components/admin/dashboard/AddProduct")
  );
  const AllProduct = lazy(() =>
    import("./components/admin/dashboard/AllProducts")
  );
  const Dashboard = lazy(() =>
    import("./components/admin/dashboard/Dashboard")
  );
  const AddCategory = lazy(() =>
    import("./components/admin/dashboard/AddCategory")
  );
  const AllCategory = lazy(() =>
    import("./components/admin/dashboard/AllCategory")
  );
  const AllOrders = lazy(() => import("./components/admin/dashboard/Order"));
  const Notfound = lazy(() => import("./components/404page"));

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense
                fallback={
                  <>
                    <Loading />
                  </>
                }
              >
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense
                fallback={
                  <>
                    <Loading />
                  </>
                }
              >
                <AddToCart />
              </Suspense>
            }
          />
          <Route
            path="/signin"
            element={
              <Suspense
                fallback={
                  <>
                    <Loading />
                  </>
                }
              >
                <Signin />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense
                fallback={
                  <>
                    <Loading />
                  </>
                }
              >
                <Signup />
              </Suspense>
            }
          />
          <Route
            path="/category-product/:slug"
            element={
              <Suspense
                fallback={
                  <>
                    <Loading />
                  </>
                }
              >
                <HerbProduct />
              </Suspense>
            }
          />

          <Route
            path={`/products/:productid`}
            element={
              <Suspense
                fallback={
                  <>
                    <Loading />
                  </>
                }
              >
                <ProductDetails />
              </Suspense>
            }
          />
          <Route
            path={`/cart/checkout`}
            element={
              <Suspense
                fallback={
                  <>
                    <Loading />
                  </>
                }
              >
                <Checkout />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense
                fallback={
                  <>
                    <Loading />
                  </>
                }
              >
                <div className="mb-[10em] mx-4 overflow-hidden">
                  <Notfound />
                </div>
              </Suspense>
            }
          />
        </Route>
        {/* Admin Layout  */}

        <Route

          element={
            <Suspense
              fallback={
                <>
                  <Loading />
                </>
              }
            >
              <AdminPannel />
            </Suspense>
          }
        >
          <Route
            path="/admin/dashboard"
            element={
              <Suspense
                fallback={
                  <>
                    <Loading />
                  </>
                }
              >
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="admin/add-product"
            element={
              <Suspense
                fallback={
                  <>
                    <Skeleton />
                  </>
                }
              >
                <AddProduct />
              </Suspense>
            }
          />
          <Route
            path="admin/edit-product/:productid"
            element={
              <Suspense
                fallback={
                  <>
                    <Skeleton />
                  </>
                }
              >
                <AddProduct />
              </Suspense>
            }
          />
          <Route
            path="admin/all-product"
            element={
              <Suspense
                fallback={
                  <>
                    <Skeleton />
                  </>
                }
              >
                <AllProduct />
              </Suspense>
            }
          />
          <Route
            path="admin/add-category"
            element={
              <Suspense
                fallback={
                  <>
                    <Skeleton />
                  </>
                }
              >
                <AddCategory />
              </Suspense>
            }
          />
          <Route
            path="admin/add-category/:category"
            element={
              <Suspense
                fallback={
                  <>
                    <Skeleton />
                  </>
                }
              >
                <AddCategory />
              </Suspense>
            }
          />
          <Route
            path="admin/all-category"
            element={
              <Suspense
                fallback={
                  <>
                    <Skeleton />
                  </>
                }
              >
                <AllCategory />
              </Suspense>
            }
          />
          <Route
            path="admin/all-order"
            element={
              <Suspense
                fallback={
                  <>
                    <Skeleton />
                  </>
                }
              >
                <AllOrders />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense
                fallback={
                  <>
                    <Loading />
                  </>
                }
              >
                <Notfound />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <Suspense
              fallback={
                <>
                  <Loading />
                </>
              }
            >
              <Notfound />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
