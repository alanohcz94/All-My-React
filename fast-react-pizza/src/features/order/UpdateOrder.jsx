import React from "react";
import Button from "../ui/Button";
import { useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";

const UpdateOrder = ({ order }) => {
  const fetcher = useFetcher();

  return (
    // fetcher.Form will not navigate to a new page is something like e.preventDefault it submits the data but it never moves away to a new route
    // it will revalidate the page ???
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Order Priority</Button>
    </fetcher.Form>
  );
};

export default UpdateOrder;

// we will write an action to the order when it is sent from this page for the fetcher to perform the task
// This action here has to connect to the page inorder to be called Go to Apps.jsx and add where your route is at
export async function action({ request, params }) {
  //   console.log("update order");
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
