import { IoClose } from "react-icons/io5";
import { Button } from "../button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  centerModal?: boolean;
  SubmitTxt?: string;
  onSubmit?: () => void;
  width?: string;
  submitBtnStyle?: React.CSSProperties;
  disableBtn?: boolean;
  closeBtn?: boolean;
  loader?: boolean;
};

const closeIcon = IoClose({}) as JSX.Element;

const Modal = (props: ModalProps) => {
  const {
    isOpen,
    onClose,
    children,
    title,
    centerModal,
    SubmitTxt,
    onSubmit,
    width,
    loader,
    closeBtn,
  } = props;
  return (
    <div
      className={`fixed inset-0 bg-[#0000004f] backdrop-blur-[4px] flex items-center ${
        centerModal ? "justify-center" : "justify-end"
      } z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={`bg-white rounded-l-lg shadow-lg ${
          width ? width : " w-full"
        } max-w-md ${
          centerModal
            ? ""
            : `h-[100vh] transform transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`
        }`}
      >
        <div className="flex justify-between">
          {title ? (
            <div className={`font-semibold text-xl mt-3 mx-3`}>{title}</div>
          ) : null}
          {closeBtn ? (
            <div
              onClick={onClose}
              className={`font-semibold text-2xl mt-4 mx-4 cursor-pointer`}
            >
              {closeIcon}
            </div>
          ) : null}
        </div>

        <div className="p-4">
          {children}
          <div
            className={`${
              centerModal
                ? "flex justify-end w-[100%]"
                : "fixed bottom-8 right-4 w-[60%]"
            } `}
          >
            <div
              className={`flex gap-2 justify-end mt-4 ${
                centerModal ? "w-[50%]" : ""
              }`}
            >
              <Button
                btnDisabled={loader}
                btnSize="sm"
                onClick={onClose}
                btnMode={"secondary"}
              >
                Cancel
              </Button>
              <Button
                btnDisabled={loader}
                btnSize="sm"
                onClick={onSubmit}
                btnMode={SubmitTxt === "Delete" || SubmitTxt === "Deleting..." ? "danger" : "primary"}
              >
                {SubmitTxt ? SubmitTxt : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
