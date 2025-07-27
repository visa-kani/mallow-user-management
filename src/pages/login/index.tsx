import { useEffect, useState } from "react";
// ************************** Reusable Components ***********************
import { getUserData, setUserData } from "../../utils/common";
import { Input } from "../../component/form-elements/input";
import { Button } from "../../component/button";
// ************************** Icons *************************************
import { FaRegUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
// ************************** Styles ************************************
import { LoginWrapper } from "../pages-styles";
// ************************** Packages *********************************
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
// ************************** Redux *************************************
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../redux/slice/loginSlice";

type FormData = {
  email: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [btnLoader, setBtnLoader] = useState<boolean>(false);
  const [remainder, setRemainder] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<FormData | null>(null);

  useEffect(() => {
    const currentData = getUserData();
    if (currentData) {
      setUserDetails(currentData);
    }
  }, []);
  const initialValues: FormData = {
    email: userDetails?.email || "",
    password: userDetails?.password || "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .trim(),

    password: Yup.string()
      .required("Password is required")
      .trim()
      .test(
        "password-strength",
        "Password must be at least 8 characters",
        (value) => !!value && value.length >= 8
      )
      .test(
        "password-letter",
        "Password must contain at least one letter (a-z or A-Z)",
        (value) => !!value && /[a-zA-Z]/.test(value)
      )
      .test(
        "password-number",
        "Password must contain at least one number (0-9)",
        (value) => !!value && /[0-9]/.test(value)
      )
      .test(
        "password-special-char",
        "Password must contain at least one special character (!@#$%^&* etc)",
        (value) => !!value && /[!@#$%^&*(),.?":{}|<>]/.test(value)
      ),
  });

  const onSubmit = (values: FormData) => {
    setBtnLoader(true);
    dispatch(LoginUser(values));
    setUserData(values);
    navigate("/user-management");
    toast.success("User logged in successful");
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });
  const UserIcon = FaRegUser({}) as JSX.Element;
  const PasswordLockIcon = FaLock({}) as JSX.Element;
  const PasswordUnLockIcon = FaUnlock({}) as JSX.Element;

  return (
    <LoginWrapper>
      <div className="w-[500px] border-2 px-10 pb-8 pt-6 rounded-lg bg-white">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              labelName="Email"
              placeholder="Enter the email address"
              error={true}
              errorValue={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""
              }
              leftIcon={UserIcon}
            />
          </div>
          <div>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              labelName="Password"
              placeholder="Enter the password"
              error={true}
              errorValue={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
              leftIcon={
                showPassword ? (
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {PasswordUnLockIcon}
                  </span>
                ) : (
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {PasswordLockIcon}
                  </span>
                )
              }
            />
          </div>
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              checked={remainder}
              onChange={() => setRemainder(!remainder)}
              className="mr-2 w-[16px] h-[16px]"
            />{" "}
            Remember me
          </div>
          <div className="mt-5">
            <Button btnType="submit" btnDisabled={btnLoader} btnMode="primary">
              {btnLoader ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </LoginWrapper>
  );
};
