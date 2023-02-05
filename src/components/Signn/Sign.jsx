import { Button, CircularProgress, Paper } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useState } from "react";
import MyTextField from "../TextField/MyTextField";
import { useDispatch } from "react-redux";
import { auth } from "../../features/firebase";
import { setUser } from "../Slices/userSlice";
import { useNavigate } from "react-router-dom";

const validationScheme = yup.object({
  username: yup
    .string()
    .min(2, "Must be 2 characters or more")
    .required("UserName is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Must be 6 characters or more")
    .required("Password is required"),
});

function Sign() {
  const [uploading, setUploading] = useState(false);
  const [initial, setInitial] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function Cancel() {
    setInitial({
      username: "",
      email: "",
      password: "",
    });
    setUploading(false);
  }
  const SignUp = async (user) => {
    setUploading(true);
    await auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: user.username,
        });
        dispatch(
          setUser({
            username: user.displayName,
            email: user.email,
            password: user.password,
          })
        );
        navigate("/");
        Cancel();
      })
      .catch((error) => alert(error));
    Cancel();
  };
  return (
    <div className="auth_div">
      <Paper style={{ padding: "40px 40px" }}>
        <h1 className="auth_h1">Sign Up</h1>
        <div>
          <Formik
            initialValues={initial}
            validationSchema={validationScheme}
            onSubmit={(user) => {
              SignUp(user);
            }}
          >
            {() => (
              <Form>
                <MyTextField
                  label="UserName"
                  placeholder="UserName"
                  name="username"
                />
                <MyTextField label="Email" placeholder="Email" name="email" />
                <MyTextField
                  label="Password"
                  placeholder="Password"
                  name="password"
                />
                {uploading ? (
                  <Button variant="outlined" fullWidth disabled>
                    <h4 style={{ fontWeight: "500" }}>Signing Up...</h4>
                    <CircularProgress
                      style={{ marginLeft: "5px", color: "#bbbbbb" }}
                      size={20}
                    />
                  </Button>
                ) : (
                  <Button variant="outlined" fullWidth type="submit">
                    <h4 style={{ fontWeight: "500" }}>Sign Up</h4>
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </Paper>
    </div>
  );
}

export default Sign;
