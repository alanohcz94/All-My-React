import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import Empty from "../../ui/Empty";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

// Here to we can add in Edit of the Booking Details feature

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();
  const { isLoading, booking } = useBooking();
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckOut();
  const { status, id: bookingId } = booking || {};
  const { isDeleteing, deleteBookingMutate } = useDeleteBooking();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="Booking" />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "checked-in" && (
          <Button disabled={isCheckingOut} onClick={() => checkout(bookingId)}>
            Check-Out
          </Button>
        )}
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check-In
          </Button>
        )}
        {status === "checked-out" && (
          <Modal>
            <Modal.Open opens="delete">
              <Button variation="danger">Delete Booking</Button>
            </Modal.Open>

            <Modal.Window name="delete">
              <ConfirmDelete
                onConfirm={() =>
                  deleteBookingMutate(bookingId, {
                    onSettled: () => navigate(-1),
                  })
                }
                disabled={isDeleteing}
              />
            </Modal.Window>
          </Modal>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
