import React from "react";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "./cartSlice";

const UpdateItem = ({ pizzaId, currentQuantity }) => {
  const disptach = useDispatch();
  return (
    <div className="flex gap-2 items-center md:gap-4">
      <Button
        type="round"
        onClick={() => {
          disptach(increaseQuantity(pizzaId));
        }}
      >
        +
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => {
          disptach(decreaseQuantity(pizzaId));
        }}
      >
        -
      </Button>
    </div>
  );
};

export default UpdateItem;
