import { forwardRef } from "react";
import {
  NumberFormatValues,
  NumericFormat,
  NumericFormatProps,
} from "react-number-format";
import Input from "../Input/Input";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values: NumberFormatValues): void => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator="."
        decimalSeparator=","
        valueIsNumericString
        decimalScale={2}
        prefix="R$ "
      />
    );
  }
);

const InputMoney = ({ ...props }): JSX.Element => {
  return (
    <Input
      {...props}
      InputProps={{
        inputComponent: NumericFormatCustom as any,
      }}
    />
  );
};

export default InputMoney;
