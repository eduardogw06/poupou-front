export interface IUpdateMailPayload {
    mail_id: string;
    description: string;
    warning: string;
    subject: string;
    content: string;
    active: boolean;
}