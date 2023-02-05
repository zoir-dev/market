import * as yup from "yup";

const UseYup = (props) => {
  let Yup;
  Yup = props
    ? yup.object({
        username: yup
          .string()
          .min(2, "Must be 2 characters or more")
          .required("Name is required"),
        email: yup.string().email().required("Email is required"),
        password: yup
          .string()
          .min(6, "Must be 6 characters or more")
          .required("Password is required"),
      })
    : yup.object({
        email: yup.string().email().required("Email is required"),
        password: yup
          .string()
          .min(6, "Must be 6 characters or more")
          .required("Password is required"),
      });

  return Yup;
};
export default UseYup;
