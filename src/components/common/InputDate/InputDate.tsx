import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { StyledDatePicker } from "./InputDate.styles";

interface InputDateProps {
  label: string;
  value: void;
  onChange: (event) => void;
  slotProps?: any;
}

const InputDate = ({
  label,
  value,
  onChange,
  slotProps,
}: InputDateProps): JSX.Element => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledDatePicker
        label={label}
        value={value}
        onChange={(event) => onChange(event)}
        slotProps={slotProps}
      />
    </LocalizationProvider>
  );
};

export default InputDate;
