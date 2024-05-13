import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  // We are writting this is because we want to re-validate the query and fetch the newly added cabins from the server
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("New cabin successfully created");
    },
    onError: (error) => toast.error(error.message),
  });

  return { isCreating, createCabin };
}
