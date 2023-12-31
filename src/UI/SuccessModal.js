import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function SuccessModal(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.close}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {props.title || "New Surprise Bag"}
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {props.children}
        </DialogContent>
        <DialogActions>
          {props.orderSurpriseBag && (
            <Button
              autoFocus
              onClick={() => props.orderSurpriseBag(props.bagId)}
            >
              Continue
            </Button>
          )}
          <Button onClick={props.close}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
