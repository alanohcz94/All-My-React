import { useMutation } from "@tanstack/react-query";
import { signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: ({ user: { email } }) => {
      toast.success(
        `Successfully created user account. Please confirm new account in email ${email}`
      );
    },
  });

  return { signUp, isLoading };
}
