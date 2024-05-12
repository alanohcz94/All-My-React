import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { formatDate, formatCurrency } from "../../utils/helpers";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const navigation = useNavigation();
  const [withPriority, setWithPriority] = useState(false);
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const totalPrice = useSelector(getTotalCartPrice);
  const priority = withPriority ? totalPrice * 0.2 : 0;
  const totalPriorityPice = totalPrice + priority;
  const dispatch = useDispatch();

  const cart = useSelector(getCart);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl mb-8 font-semibold">
        Ready to order? {"Let's"} go!
      </h2>

      {/* Optional if action is not include it will use the current action page for it<Form method="POST" action="/order/nwe"></Form> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            defaultValue={username}
            type="text"
            name="customer"
            required
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="text-xs mt-2 text-red-500 bg-red-100 p-2 rounded-md">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === "error" && (
              <p className="text-xs mt-2 text-red-500 bg-red-100 p-2 rounded-md">
                {errorAddress}
              </p>
            )}
          </div>
          {isLoadingAddress && <p>Loading...</p>}
          {!position.latitude && !position.longitude && (
            <span className="absolute z-50 right-[1px] top-[3px] md:top-[-3.5px]">
              <Button
                type="primary"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Address
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="my-2 mx-2 h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order prioritsy?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Submitting Order"
              : `Order now for $${formatCurrency(totalPriorityPice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const res = await request.formData();
  const data = Object.fromEntries(res);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority == "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please enter a number, to be contacted for your pizza.";

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  // Create new order and redirect
  const newOrder = await createOrder(order);
  // hacky approach not recommanded to do this doing this will deactivate some redux performance approach DO NOT OVER USE
  store.dispatch(clearCart());
  //once createOrder is created we need to redirect the page on the /order/:orderId
  // cannot navigate function because navigate function use to call the useNavigate Hook we cannot call Hooks in functions only components
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
