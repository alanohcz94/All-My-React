import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: ({ user }) => {
      // during login, we set this into the website cahce to retrieve the data faster instead of refetching using the API
      queryClient.setQueryData(["user"], user);
      // try to get the displayName if no display name I think "Welcome" is good enough for now
      toast.success(`Welcome ${user?.user_metadata?.fullName || "User"}`);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });

  return { login, isLoading };
}
