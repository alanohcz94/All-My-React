import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckOut() {
    const queryClient = useQueryClient();

    const {mutate:checkout, isLoading: isCheckingOut} = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, {
            status: "checked-out",
        }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ active: true });
            toast.success(`Booking #${data.id} successfully checked out`);
          },
          onError: (error) => toast.error("There was an error checking out"),
    });

    return {checkout, isCheckingOut}
}