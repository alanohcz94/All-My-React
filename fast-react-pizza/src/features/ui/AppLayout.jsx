import React from "react";
import Header from "./Header";
import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../cart/CartOverview";
import Loader from "./Loader";

const AppLayout = () => {
  // useNavigation
  // This hook tells you everything you need to know about a page navigation to build pending
  // navigation indicators and optimistic UI on data mutations
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-screens grid-row-[auto_1fr_auto] ">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="max-w-3xl mx-auto">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
};

export default AppLayout;
