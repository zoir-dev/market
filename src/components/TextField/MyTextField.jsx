import { useField } from "formik";
import { TextField } from "@mui/material";
function MyTextField(props) {
  const [field, meta] = useField({ ...props });
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <div>
      <TextField
        size="small"
        variant="outlined"
        style={{ marginBottom: "10px", width: "400px" }}
        label={props.label}
        placeholder={props.placeholder}
        error={!!errorText}
        helperText={errorText}
        {...field}
      />
    </div>
  );
}

export default MyTextField;
