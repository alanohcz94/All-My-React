import supabase from "./supabase";

export async function updateCurrentUser({ fullName, password, avatar }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error: updateError } = await supabase.auth.updateUser(
    updateData
  );

  if (updateError) throw new Error(updateError.message);

  // 2. Upload the avatar image
  if (!avatar) return data;
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: imageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (imageError) throw new Error(imageError.message);

  // 3. Update avatar in the user
  const { data: updateImage, error: updateImageError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabase.supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateImageError) throw new Error(updateImageError.message);

  return updateImage;
}

export async function signUpApi({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error)
    throw new Error("Unable to create user please check the form contents");

  return data;
}

export async function loginApi(email, password) {
  const query = supabase.auth.signInWithPassword({
    email,
    password,
  });

  let { data, error } = await query;

  if (error) {
    throw new Error("Password and Email does not match");
  }
  return data;
}

export async function getCurrentUser() {
  // This function will get the user from the current local storage session
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // fetch the user from the server once again
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logoutApi() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
