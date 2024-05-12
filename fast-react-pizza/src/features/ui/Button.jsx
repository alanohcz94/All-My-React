import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, disabled, to, type, onClick }) => {
  const base =
    "text-sm bg-yellow-400 tracking-wide rounded-full uppercase font-semibold text-stone-800  inline-block hover:bg-yellow-200 transition-colors duration-500 focus:outline-none focus:ring active:bg-state-400 disabled:cursor-not-allowed focus:bg-yellow-300 focus:ring-yellow-300 focus:ring-offset-2";

  const styles = {
    primary: base + "py-3 px-4 md:px-6 md:py-4",
    small: base + "py-2 px-4 md:px-5 md-py-2.5 text-xs",
    round: base + "py-1 px-2.5 md:px-3.5 md-py-2 text-xs",
    secondary:
      "text-sm py-2.5 px-4 md:px-6 md:py-3.5 border-2 border-stone-300 tracking-wide rounded-full uppercase font-semibold text-stone-700  inline-block hover:bg-stone-200 transition-colors duration-500 focus:outline-none focus:ring active:bg-state-400 disabled:cursor-not-allowed focus:bg-stone-300 focus:ring-stone-300 focus:ring-offset-2 focus:text-stone-800 hover:text-stone-800",
  };

  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
};

export default Button;
