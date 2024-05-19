import React from "react";
import Stat from "./Stat";
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
  // 1. number of bookings
  const numBookings = bookings.legth;

  // 2. total Sales
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

  //3. confirmed stays check ins and out
  const checkIns = confirmedStays.length;

  // 4. Occupancy rate
  /** logic not 100% accurate
   * number of checked-in nights divide by all available nights (num of days * num of Cabins)
   */
  const occupation =
    confirmedStays.reduce((acc, booking) => acc + booking.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
};

export default Stats;
