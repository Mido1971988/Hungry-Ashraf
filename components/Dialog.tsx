import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AlertDialog({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const handleCloseDialog = async (yesOrNo: boolean) => {
    setOpenDialog(false);
    if (yesOrNo) {
      await signOut({ redirect: false });
      router.refresh();
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={() => handleCloseDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Sign Out</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog(false)}>No</Button>
          <Button onClick={() => handleCloseDialog(true)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
