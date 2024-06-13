import React from "react";
import { CircularProgress } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col mt-10 gap-2 items-center">
      <CircularProgress />
    </div>
  );
};

export default Loading;
