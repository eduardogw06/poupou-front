import Joi, { ValidationErrorItem } from "joi"
import { ICategoryPayload } from "../../types/ICategoryPayload"


const fieldsValidations = {
    description: Joi.string()
        .min(2)
        .required()
        .messages({
            "string.min": "A categoria deve ter no mínimo {#limit} caracteres",
            "any.required": "Categoria é obrigatória",
            "string.empty": "Categoria é obrigatória"
        }),
    icon: Joi.string()
        .required()
        .messages({
            "any.required": "O ícone da categoria é obrigatório",
            "string.empty": "O ícone da categoria é obrigatóri0"
        }),
}

export type FieldErrors = {
    [key: string]: string
}

const getFieldErrors = (objError: Joi.ValidationResult): FieldErrors => {
    const errors: FieldErrors = {}

    if (objError.error) {
        objError.error.details.forEach((err: ValidationErrorItem) => {
            errors[err.path.join('.')] = err.message
        })
    }

    return errors
}

export const categoriesValidate = (values: ICategoryPayload): FieldErrors => {
    const schema = Joi.object(fieldsValidations)

    return getFieldErrors(schema.validate(values, {
        abortEarly: false,
        allowUnknown: true
    }))
}