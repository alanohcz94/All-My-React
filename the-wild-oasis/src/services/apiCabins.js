import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins are not able to be loaded or viewed");
  }

  return data;
}

export async function deleteCabin(id) {
  console.log("id");
  console.log(id);
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select();

  // When deleting the cabin I will need to remove the picture from the Storage as well
  // Add delete the picture from storage

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be delete");
  }

  return data;
}

// has create and edit
export async function createEditCabin(newCabin, id) {
  const hasImageUrl = newCabin.image?.startsWith?.(supabaseUrl);
  // Note: for image if it contents any "/" slashes they will create folders for it
  // Format the image
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imageURL = hasImageUrl
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  // The image data needs to get the URL to be passed into the cabins DB row called image only then we can display and retrieve the image path.
  // if !id use create method else edit
  query = !id
    ? query.insert([{ ...newCabin, image: imageURL }])
    : query.update({ ...newCabin, image: imageURL }).eq("id", id);

  // The select() helps to return the data with the inserted values
  // data will return empty if we do not have the select()
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Unable to create Cabin");
  }

  // Create image
  if (hasImageUrl) return data;
  // Only if it is successful then upload the image
  let imageQuery = supabase.storage.from("cabin-images");
  if (newCabin?.image) {
    imageQuery = imageQuery.upload(imageName, newCabin.image);
  }

  const { error: storeError } = await imageQuery;

  // Delete the Cabin if there was an error uploading the image
  if (storeError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storeError);
    throw new Error("Unable to store cabin Image");
  }

  return data;
}

// Unused
// only create
export async function createCabin(newCabin) {
  // Note: for image if it contents any "/" slashes they will create folders for it
  // Format the image
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imageURL = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Only if it is successful then upload the image
  const { error: storeError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // Delete the Cabin if there was an error uploading the image
  if (storeError) {
    // await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storeError);
    throw new Error("Unable to store cabin Image");
  }

  // Created cabin
  // The image data needs to get the URL to be passed into the cabins DB row called image only then we can display and retrieve the image path.
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imageURL }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Unable to create Cabin");
  }

  return data;
}
