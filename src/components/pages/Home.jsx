import React, { Suspense, lazy } from "react";

function Home() {
  const Weightloss = lazy(() => import("./H-pages/WeightLoss"));
  const Hero = lazy(() => import("./H-pages/Hero"));
  const FeaturedProduct = lazy(() => import("./H-pages/Featured"));
  const Categories = lazy(() => import("../Products/Categories"));
  const HerbalProducts = lazy(() => import("../pages/H-pages/HerbalProduct"));
  const Shippingwidgets = lazy(() => import("../pages/H-pages/pansaricodwidget"));
  return (
    <>
    <div className="mb-[30px] xl:mb-0">
    <Suspense fallback={<></>}>
        <Hero />
      </Suspense>
    </div>
      <div className="desk-hide">
        <Suspense fallback={<></>}>
          <Categories />
        </Suspense>
      </div>
      <Suspense fallback={<></>}>
        <Weightloss />
      </Suspense>
      <Suspense fallback={<></>}>
        <FeaturedProduct />
      </Suspense>
      <Suspense fallback={<></>}>
        <HerbalProducts />
      </Suspense>
      <Suspense fallback={<></>}>
        <Shippingwidgets />
      </Suspense>
    </>
  );
}

export default Home;
