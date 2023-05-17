import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";

import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";
import { useTheme } from "styled-components";
import { DefaultTheme } from "../../../types/DefaultTheme";
import { CustomDialog } from "./Dialog.styles";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface CustomDialogProps {
  isOpen: boolean;
  title: string;
  handleClose: () => void;
  children: JSX.Element;
  buttons?: JSX.Element;
  fullWidth?: boolean;
}

const Dialog = ({
  isOpen,
  title,
  handleClose,
  children,
  fullWidth = true,
  buttons,
}: CustomDialogProps): JSX.Element => {
  const theme = useTheme() as DefaultTheme;
  const { title: themeTitle } = theme;
  const { text: textColor } = theme.colors;

  return (
    <CustomDialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth={fullWidth}
      PaperProps={{
        style: {
          backgroundColor: themeTitle === "dark" ? "#1A1A40" : "#FFF",
        },
      }}
    >
      <DialogTitle sx={{ color: `${textColor}` }}>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>{buttons}</DialogActions>
    </CustomDialog>
  );
};

export default Dialog;
