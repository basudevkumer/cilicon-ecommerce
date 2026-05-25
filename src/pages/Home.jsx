import React, { useEffect, useState, lazy, Suspense } from "react";
import WidgetContainer from "@/components/home/header/widgets/widgetContainer/Index";
import Category from "@/components/home/category/categoryDataFetch/Index";
import FeatureNav from "@/components/home/feature/Index";
import CategoryHeading from "@/components/home/category/categoryHeading/Index";
import FeatureProduct from "@/components/home/featureProduct/Index";
import Subscribe from "@/components/home/subscribe/Index";
import HomeProdctAd from "@/components/home/HomeAd/Index";
import BestDealContainter from "@/components/home/bestDealsContainer/Index";

const HomePopUp = lazy(() => import("@/components/home/homePopUp/HomePopUp"));

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsOpen(true);
    }, 7000);
    return () => clearTimeout(timerId);
  }, []);

  const handlePopUp = () => setIsOpen(false);

  return (
    <>
      <WidgetContainer />
      <FeatureNav />
      <CategoryHeading />
      <Category />
      <FeatureProduct />
      <HomeProdctAd />
      <BestDealContainter />
      <Subscribe />

      {/* {isOpen && (
        <Suspense fallback={null}>
          <HomePopUp eventHandle={handlePopUp} />
        </Suspense>
      )} */}
    </>
  );
};

export default Home;