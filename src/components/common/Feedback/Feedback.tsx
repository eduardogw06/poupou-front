import { Alert, Snackbar } from "@mui/material";
import { IAlertProps } from "../../../types/IAlertProps";

interface IFeedbackProps {
  feedbackOpened: boolean;
  alertProps: IAlertProps;
  handleClose: () => void;
}

const Feedback = ({
  feedbackOpened,
  alertProps,
  handleClose,
}: IFeedbackProps): JSX.Element => (
  <Snackbar open={feedbackOpened} autoHideDuration={50} onClose={handleClose}>
    <Alert severity={alertProps.severity} sx={{ width: "100%" }}>
      {alertProps.message}
    </Alert>
  </Snackbar>
);

export default Feedback;
