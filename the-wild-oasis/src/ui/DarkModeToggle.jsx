import React from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

const DarkModeToggle = () => {
  const { isDark, toggle } = useDarkMode();

  return (
    <ButtonIcon onClick={toggle}>
      {isDark ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
};

export default DarkModeToggle;
