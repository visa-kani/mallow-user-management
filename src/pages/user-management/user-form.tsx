// ************************** Reusable Components ***********************
import { Input } from "../../component/form-elements/input";

type UserFormProps = {
    formik: any
};

export const UserForm = (props: UserFormProps) => {
    const {formik} = props
  return (
    <div>
      <form>
        <div>
          <Input
            type="text"
            name="first_name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.first_name}
            labelName="First Name"
            placeholder="Enter the first name"
            error={true}
            errorValue={
              formik.touched.first_name && formik.errors.first_name
                ? formik.errors.first_name
                : ""
            }
            required={true}
          />
        </div>
        <div>
          <Input
            type="text"
            name="last_name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.last_name}
            labelName="Last Name"
            placeholder="Enter the last name"
            error={true}
            errorValue={
              formik.touched.last_name && formik.errors.last_name
                ? formik.errors.last_name
                : ""
            }
            required={true}
          />
        </div>
        <div>
          <Input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            labelName="Email"
            placeholder="Enter the email"
            error={true}
            errorValue={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
            required={true}
          />
        </div>
        <div>
          <Input
            type="text"
            name="avatar"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.avatar}
            labelName="Profile"
            placeholder="Enter the Profile URL"
            error={true}
            errorValue={
              formik.touched.avatar && formik.errors.avatar
                ? formik.errors.avatar
                : ""
            }
            required={true}
          />
        </div>
      </form>
    </div>
  );
};
