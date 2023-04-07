import { Alert, Snackbar } from "@mui/material";
import { IAlertProps } from "../../../types/IAlertProps";

interface IFeedbackProps {
  feedbackOpened: boolean;
  alertProps: IAlertProps;
  handleClose: (redirectUrl?: string) => void;
}

const Feedback = ({
  feedbackOpened,
  alertProps,
  handleClose,
}: IFeedbackProps): JSX.Element => (
  <Snackbar
    open={feedbackOpened}
    autoHideDuration={3000}
    onClose={(): void => handleClose(alertProps.redirectUrl)}
  >
    <Alert
      //   onClose={(): void => handleClose()}
      severity={alertProps.severity}
      sx={{ width: "100%" }}
    >
      {alertProps.message}
    </Alert>
  </Snackbar>
);

export default Feedback;
