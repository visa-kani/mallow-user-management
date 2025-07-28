import { removeUserData } from "../utils/common";
import { useNavigate } from "react-router-dom";
import { ImSwitch } from "react-icons/im";

export const Header = () => {
  const navigate = useNavigate();
  const logOutIcon = ImSwitch({}) as JSX.Element;
  return (
    <div className="bg-black sticky top-0 z-10">
      <div className="text-lg font-semibold px-5 py-4 flex justify-end">
        <div
          onClick={() => {
            removeUserData();
              window.location.href = "/";
            navigate("/");
          }}
          className="flex items-center gap-2 align-middle cursor-pointer text-[#f44336]"
        >
          <span className="text-white mr-2 align-middle">Elon Musk</span> {logOutIcon}
        </div>
      </div>
    </div>
  );
};
