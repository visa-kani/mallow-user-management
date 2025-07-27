import { RotatingLines } from "react-loader-spinner";

export const Loader = () => {
  return (
    <RotatingLines
      visible={true}
      width={"96px"}
      strokeWidth="4"
      strokeColor={"#448ef7"}
      animationDuration="0.75" // ✅ Changed to string
      ariaLabel="rotating-lines-loading"
    />
  );
};
