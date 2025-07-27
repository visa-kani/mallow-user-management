import { ButtonComponent } from "../component-styles";

type ButtonProps = {
  children: React.ReactNode;
  btnClass?: string;
  onClick?: () => void;
  btnType?: "button" | "submit" | "reset" | undefined;
  btnMode: string;
  btnSize?: string;
  btnStyle?: React.CSSProperties;
  btnDisabled?: boolean;
};

export const Button = (props: ButtonProps) => {
  const {
    children,
    btnClass,
    onClick,
    btnType,
    btnMode,
    btnSize,
    btnStyle,
    btnDisabled,
  } = props;
  return (
    <ButtonComponent
      btnMode={btnMode}
      style={btnStyle}
      btnSize={btnSize}
      className={btnClass}
      onClick={onClick}
      type={btnType}
      disabled={btnDisabled}
    >
      {children}
    </ButtonComponent>
  );
};
