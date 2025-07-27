import {
  ErrorElement,
  InputComponent,
  LabelElement,
} from "../component-styles";

export type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  labelName?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  IconPosition?: string;
  errorValue?: any;
  error?: boolean;
  name?: string;
  inputSize?: string;
  required?: boolean;
};

export const Input = (props: InputProps) => {
  const {
    type,
    placeholder,
    value,
    className,
    onChange,
    labelName,
    leftIcon,
    rightIcon,
    errorValue,
    error,
    onBlur,
    onKeyPress,
    name,
    inputSize,
    required,
  } = props;
  return (
    <div className="mb-1">
      {labelName ? <LabelElement>{required ? <span className="text-[#f44336] mr-1">*</span> : null}{labelName}</LabelElement> : null}
      <div className="relative">
        <InputComponent
          inputSize={inputSize}
          IconPosition={
            leftIcon && rightIcon
              ? "both"
              : leftIcon && !rightIcon
              ? "left"
              : !leftIcon && rightIcon
              ? "right"
              : ""
          }
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={className}
          onBlur={onBlur}
          onKeyPress={onKeyPress}
          name={name}
        />
        {leftIcon ? (
          <div className={`absolute ${inputSize === "sm" ? "left-[8px] top-[9px]" : "left-3 top-4"} `}>{leftIcon} </div>
        ) : null}
        {rightIcon ? (
          <div className="absolute right-3 top-3">{rightIcon}</div>
        ) : null}
      </div>
      {error ? (
        <ErrorElement>
          <span>{errorValue}</span>
        </ErrorElement>
      ) : null}
    </div>
  );
};
