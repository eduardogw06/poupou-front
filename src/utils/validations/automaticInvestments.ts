import Joi from "joi"
import { INewAutomaticInvestmentPayload } from "../../types/INewAutomaticInvestmentPayload"
import { automaticInvestmentsDays } from "../../config/automaticInvestmentsDays"

const fieldsValidations = {
    target_id: Joi.string()
        .required()
        .messages({
            "any.required": "Selecione o objetivo a ser investido",
            "string.empty": "Selecione o objetivo a ser investido"
        }),
    amount: Joi.alternatives()
        .try(
            Joi.number()
                .min(1)
                .required()
                .messages({
                    "number.min": "O valor mínimo para um aporte automático é de R$ {#limit},00",
                    "any.required": "O valor do aporte automático é obrigatório"
                }),
            Joi.string()
                .messages({
                    "string.empty": "O valor do aporte automático é obrigatório"
                })
        )
        .messages({ "any.required": "O valor do aporte automático é obrigatório", })
        .required(),
    day: Joi.number()
        .required()
        .valid(...automaticInvestmentsDays)
        .messages({
            'any.only': `Selecione o dia do aporte automático`,
        }),

}

export type FieldErrors = {
    [key: string]: string
}

function getFieldErrors(objError: Joi.ValidationResult) {
    const errors: FieldErrors = {}

    if (objError.error) {
        objError.error.details.forEach((err) => {
            errors[err.path.join('.')] = err.message
        })
    }

    return errors
}

export const automaticInvestmentsValidate = (values: INewAutomaticInvestmentPayload): FieldErrors => {
    const schema = Joi.object(fieldsValidations)

    return getFieldErrors(schema.validate(values, {
        abortEarly: false,
        allowUnknown: true,
    }))
}
