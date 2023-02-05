import { Button, CircularProgress, Paper } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useState } from "react";
import MyTextField from "../TextField/MyTextField";
import { auth } from "../../features/firebase";
import { useNavigate } from "react-router-dom";
import { setUser } from "../Slices/userSlice";
import { useDispatch } from "react-redux";

const validationScheme = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Must be 6 characters or more")
    .required("Password is required"),
});

function Login() {
  const [uploading, setUploading] = useState(false);
  const [initial, setInitial] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function Cancel() {
    setInitial({
      email: "",
      password: "",
    });
    setUploading(false);
  }

  const SignIn = async (user) => {
    setUploading(true);
    await auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        dispatch(
          setUser({
            name: user.username,
            user: user.email,
            password: user.password,
          })
        );
        navigate("/");
        Cancel();
      })
      .catch((error) => {
        Cancel();
      });
    Cancel();
  };
  return (
    <div className="auth_div">
      <Paper style={{ padding: "40px 40px" }}>
        <h1 className="auth_h1">Sign In</h1>
        <div>
          <Formik
            initialValues={initial}
            validationSchema={validationScheme}
            onSubmit={(user) => {
              SignIn(user);
            }}
          >
            {() => (
              <Form>
                <MyTextField label="Email" placeholder="Email" name="email" />
                <MyTextField
                  label="Password"
                  placeholder="Password"
                  name="password"
                />
                {uploading ? (
                  <Button variant="outlined" fullWidth disabled>
                    <h4 style={{ fontWeight: "500" }}>Signing In...</h4>
                    <CircularProgress
                      style={{ marginLeft: "5px", color: "#bbbbbb" }}
                      size={20}
                    />
                  </Button>
                ) : (
                  <Button variant="outlined" fullWidth type="submit">
                    <h4 style={{ fontWeight: "500" }}>Sign In</h4>
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

export default Login;
