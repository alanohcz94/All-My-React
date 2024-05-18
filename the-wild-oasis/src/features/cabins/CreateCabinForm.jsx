import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEdit = Boolean(editId);
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const inProgress = isCreating || isEditing;

  // The variable inside the "{}" are function hooks provided by the library react-hook-form
  // getValues return all the values from the entire form used in this component
  // when we pass things inside useForm they are options
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEdit)
      editCabin(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    // We can use the OnSuccess handler not only in the useMutation but also where the mutate happens
    else
      createCabin(
        { ...data, image: image },
        {
          // it is able to access the data return from the apiCabin,
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    // possible to be used to send data to a monitoring error services
    console.log(errors);
  }

  return (
    // OnError will be called if the validation failed
    <Form onSubmit={handleSubmit(onSubmit, onError)}
    type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        {/* There is no need to use useState or any controlled item to be added to be input component because we are using the react-hook-form library to control it*/}
        <Input
          type="text"
          id="name"
          disabled={inProgress}
          {...register("name", {
            required: "This is a required field",
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={inProgress}
          {...register("maxCapacity", {
            required: "This is a required field",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
            max: {
              value: 20,
              message: "Capacity is limited to 8",
            },
          })}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={inProgress}
          {...register("regularPrice", {
            required: "This is a required field",
            min: {
              value: 1,
              message: "Price should be atleast 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={inProgress}
          defaultValue={0}
          {...register("discount", {
            required: "This is a required field",
            validate: (value) =>
              // if the first statement returns false it will return the message behind and it will be the returned error message
              // getValues is an object type
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={inProgress}
          defaultValue=""
          {...register("description", {
            required: "This is a required field",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          // When it is in edit the file upload is going to be empty event with the default values
          // we added the required: "isEdit ? false" is because we want to image to stay the same and it is not required fill
          {...register("image", {
            required: isEdit ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        {/* The reset button works as it is a normal HTML attribute that works and acts as a reset button instead of a submit button */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={inProgress}>
          {isEdit ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
