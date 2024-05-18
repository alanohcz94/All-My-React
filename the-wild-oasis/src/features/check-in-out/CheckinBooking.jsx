import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import {useState, useEffect} from 'react';
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "./useCheckIn";
import {useSettings} from '../../features/settings/useSettings'

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const {isLoading, booking} = useBooking();
  const [confirmedPaid, setConfirmPaid] = useState(false);
  const [addBk, setAddBk] = useState(false);
  const moveBack = useMoveBack();
  const {checkin, isCheckingIn} = useCheckIn();
  const { settings, isLoading: isSettingLoading } = useSettings();

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = settings?.breakfastPrice * numNights * numGuests

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false)
    setAddBk(booking?.hasBreakfast ?? false)
  },[booking?.isPaid, booking?.hasBreakfast]);
  
  function handleCheckin() {
    if(!confirmedPaid) return;

    if(addBk) {
      checkin({bookingId, breakfast: {
        hasBreakfast: true,
        extraPrice: optionalBreakfastPrice,
        totalPrice: totalPrice+optionalBreakfastPrice
      }})
    } else {
      checkin({bookingId, breakfast: {}});
    }
  }

  if(isLoading || isSettingLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && <Box>
        <Checkbox 
          checked={addBk} 
          onChange={() => {
          setAddBk((add) => !add);
          setConfirmPaid(false);
        }}
          id="breakfast"
        >Want to add Breakfast for ${optionalBreakfastPrice}?</Checkbox>
      </Box>}

      <Box>
        <Checkbox
          checked={confirmedPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmedPaid || isCheckingIn}
          id="confirm"
        >I confirm that {guests.fullName} has paid the total amount {!addBk ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}</Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmedPaid || isCheckingIn} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>

      
    </>
  );
}

export default CheckinBooking;
