import React from "react";

const Loader = () => {
  return (
    <div className="absolute bg-slate-200/30 backdrop-blur-sm inset-0 flex items-center justify-center">
      <span>
        <img
          className=""
          src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700"
          alt="Loading..."
        />
      </span>
    </div>
  );
};

export default Loader;
