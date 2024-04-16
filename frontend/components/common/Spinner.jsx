import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

const Spinner = ({ loading, size }) => {
  return (
    <MoonLoader
      color={"#499afa"}
      loading={loading}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Spinner;
