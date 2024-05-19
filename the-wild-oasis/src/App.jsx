import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import CheckIn from "./pages/CheckIn";
import ProtectoredRoute from "./ui/ProtectoredRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
// Creating React Query is just like setting up a context API or redux as well.
/*
  First we create a place where the data lives
  second we provide the data into the application
*/
// Set up the cache
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime = The time limit the data will stay fresh in the cache until it refetches again
      // calculation is in miniseconds
      // staleTime: 60 * 1000,
      staleTime: 2000,
    },
  },
});

const App = () => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        {/* 
        This is an installed Dev Tool that needs to be installed into npm
        cmd $ npm i @tanstack/react-query-devtools@<versionNum>
       */}
        <ReactQueryDevtools initialIsOpen={false} />

        <GlobalStyles />

        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectoredRoute>
                  <AppLayout />
                </ProtectoredRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<CheckIn />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          hutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            sucess: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
};

export default App;

/*
  Features: That I can add on 
  - Create new bookings from this application 
    -> example: a new guest appears in the hotel and wants to book the night or more we need to create the booking for them and then check with room is able to be booked
  - Edit booking
  - check in and check out times ???
  - cabins doesn't have fix price through the entire year (staff can set the price for every single day base on promotions price or something)
  - I believe discount should be calculated as precentage instead of pirce pirce
  - Add restaurents feature
    -> bill it during checkout
  - generate a PDF invoice and be mailed to the User
  - during checkout we can also do a feedback form for each customers 
    -> feedback form can be generated and probably show statistics as well
*/
