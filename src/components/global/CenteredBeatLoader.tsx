import React from "react";
import { BeatLoader } from "react-spinners";

export const CenteredBeatLoader = () => {
  return (
    <div className="fixed top-1/2 left-0 right-0 ">
      <BeatLoader
        color="#faba"
        size={20}
        css="display:flex; justify-content:center; align-items:center;"
      />
    </div>
  );
};
