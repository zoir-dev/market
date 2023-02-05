import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";

export default function DirectionSnackbar({ open, setOpen, message }) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={10} ref={ref} variant="filled" {...props} />;
  });

  function transition(props) {
    return <Slide {...props} direction="left" />;
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
      >
        <Alert
          style={{ backgroundColor: "rgba(255, 76, 48)" }}
          onClose={handleClose}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
