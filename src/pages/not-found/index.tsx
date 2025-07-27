import { useEffect } from "react";
import { Button } from "../../component/button";
import { useSelector } from "react-redux";

export const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <div className="text-center">
        <div className="text-9xl font-bold">404</div>
        <h1 className="text-3xl font-medium text-gray-500 my-5">
          Page Not Found
        </h1>
      </div>
    </div>
  );
};
