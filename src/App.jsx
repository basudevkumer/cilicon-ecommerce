import { lazy, Suspense } from "react";
//  lazy Imports
const Home = lazy(() => import("@pages/Home"));
const About = lazy(() => import("@pages/About"));
const Shop = lazy(() => import("@/pages/Shop"));
const ProductDetails = lazy(() => import("./pages/ProductDetailsPage"));
const ShoppingCardPg = lazy(() => import("./pages/ShoppingCardPg"));
const UpdateCard = lazy(() => import("./pages/UpdateCard"));
const Compare = lazy(() => import("./pages/Compare"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const CustomerSupport = lazy(() => import("./pages/CustomerSupport"));
const NeedHelp = lazy(() => import("./pages/NeedHelp"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const Signup = lazy(() => import("./components/account/Signup"));
const SignIn = lazy(() => import("./components/account/SignIn"));

// for tanstack query &Non-lazy
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import PageSkeleton from "./components/Skeleton/skeletonBestDealCard/PageSkeleton";
import PageNotFounds from "./components/commonComponent/pageNotFound/PageNotFounds";
import RootLayout from "./components/rootLayout/RootLayout";

// Reusable Suspense Wrapper

const S = ({ children }) => {
  return <Suspense fallback={<PageSkeleton />}>{children}</Suspense>;
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route
                path="/"
                element={
                  <S>
                    <Home />
                  </S>
                }
              />
              <Route
                path="/about"
                element={
                  <S>
                    <About />
                  </S>
                }
              />
              <Route
                path="/shop"
                element={
                  <S>
                    <Shop />
                  </S>
                }
              />
              <Route
                path="/product-details/:id"
                element={
                  <S>
                    <ProductDetails />
                  </S>
                }
              />
              <Route
                path="/shopping-card"
                element={
                  <S>
                    <ShoppingCardPg />
                  </S>
                }
              />

              <Route
                path="/compare"
                element={
                  <S>
                    <Compare />
                  </S>
                }
              />

              <Route
                path="/customer-support"
                element={
                  <S>
                    <CustomerSupport />
                  </S>
                }
              />
              <Route
                path="/need-help"
                element={
                  <S>
                    <NeedHelp />
                  </S>
                }
              />

              <Route
                path="/signup"
                element={
                  <S>
                    <Signup />
                  </S>
                }
              />
              <Route
                path="/login"
                element={
                  <S>
                    <SignIn />
                  </S>
                }
              />
              <Route
                path="/order-success"
                element={
                  <S>
                    <OrderSuccess />
                  </S>
                }
              />
              <Route
                path="/update-card"
                element={
                  <S>
                    <UpdateCard />
                  </S>
                }
              />

              {/* protected route */}
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute>
                    <S>
                      {" "}
                      <Wishlist />
                    </S>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <S>
                      {" "}
                      <Checkout />
                    </S>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/order-success"
                element={
                  <ProtectedRoute>
                    <S>
                      {" "}
                      <OrderSuccess />
                    </S>
                  </ProtectedRoute>
                }
              />
              {/* 404 page not fond */}
              <Route path="*" element={<PageNotFounds/>} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
