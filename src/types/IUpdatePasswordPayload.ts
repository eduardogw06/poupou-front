export interface IUpdatePasswordPayload {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
}