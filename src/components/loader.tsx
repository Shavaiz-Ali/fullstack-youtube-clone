import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="h-8 w-8 rounded-full border-2 border-white border-t-main animate-spin" />
    </div>
  );
};

export default Loader;
