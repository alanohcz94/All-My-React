import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleteing, mutate: deleteBookingMutate } = useMutation({
    mutationFn: deleteBooking,
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking successfully deleted");
    },
  });

  return { isDeleteing, deleteBookingMutate };
}
