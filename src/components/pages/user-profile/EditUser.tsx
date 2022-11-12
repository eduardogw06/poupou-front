import { useEffect } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { IEditUserPayload } from "../../../types/IEditUserPayload";
import { IUserInfo } from "../../../types/IUserInfo";
import Input from "../../common/Input/Input";
import { FormContainer } from "./EditUser.styles";

interface EditUserProps {
  setValue: (field: string, value: any) => void;
  watch: (field: string) => void;
  error: {
    hasError: boolean;
    message?: string;
  };
  handleSubmit: UseFormHandleSubmit<IEditUserPayload>;
  onSubmit: (data: IEditUserPayload) => Promise<void>;
  register: (field: string) => void;
  userData: IUserInfo;
}

const EditUser = ({
  setValue,
  watch,
  error,
  handleSubmit,
  onSubmit,
  register,
}: EditUserProps) => {
  useEffect(() => {
    register("name");
    register("email");
  }, [register]);

  return (
    <FormContainer
      id="editUserForm"
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        id="name"
        label="Nome"
        type="text"
        variant="outlined"
        size="small"
        autoComplete="off"
        value={watch("name")}
        onChange={(e: any): void => setValue("name", e.target.value)}
        error={error.hasError}
      />
      <Input
        id="email"
        label="E-mail"
        type="email"
        variant="outlined"
        size="small"
        value={watch("email")}
        onChange={(e: any): void => setValue("email", e.target.value)}
        error={error.hasError}
        helperText={error.message}
      />
    </FormContainer>
  );
};

export default EditUser;
