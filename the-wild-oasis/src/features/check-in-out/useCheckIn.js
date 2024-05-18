import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useCheckIn() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {mutate:checkin, isLoading: isCheckingIn} = useMutation({
        mutationFn: ({bookingId, breakfast}) => updateBooking(bookingId, {
            status: "checked-in",
            isPaid: true,
            ...breakfast,
        }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ active: true });
            toast.success(`Booking #${data.id} successfully checked in`);
            navigate(`/bookings`);
          },
          onError: (error) => toast.error("There was an error checking in"),
    });

    return {checkin, isCheckingIn}
}