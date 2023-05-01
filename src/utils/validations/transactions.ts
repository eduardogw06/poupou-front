import Joi from "joi"
import { INewTransactionPayload } from "../../types/INewTransactionPayload"

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
                    "number.min": "O valor mínimo para um aporte é de R$ {#limit},00",
                    "any.required": "O valor do aporte é obrigatório"
                }),
            Joi.string()
                .messages({
                    "string.empty": "O valor do aporte é obrigatório"
                })
        )
        .messages({ "any.required": "O valor do aporte é obrigatório", })
        .required(),

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

export function transactionsValidate(values: INewTransactionPayload, isEdit: boolean = false): FieldErrors {
    const schema = Joi.object(fieldsValidations)

    return getFieldErrors(schema.validate(values, {
        abortEarly: false,
        allowUnknown: true,
    }))
}