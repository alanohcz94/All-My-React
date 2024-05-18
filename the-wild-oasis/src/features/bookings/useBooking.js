import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
    // when we define the Id query we used /:(bookingId)
    const {bookingId} = useParams();

    const {
        isLoading,
        data: booking,
        error,
    } = useQuery({
        queryFn: () => getBooking(bookingId),
        queryKey: ["bookings", bookingId],
        retry: false,
    })

    return {isLoading, booking, error}
}