import Joi from 'joi';
import { INewTargetPayload } from '../../types/INewTargetPayload';
import { startOfDay } from 'date-fns';

const fieldsValidations = {
    description: Joi.string()
        .min(2)
        .required()
        .messages({
            "string.min": "Nome deve ter no mínimo {#limit} caracteres",
            "any.required": "Nome é obrigatório",
            "string.empty": "Nome é obrigatório"
        }),
    target_amount: Joi.number()
        .min(10)
        .required()
        .messages({
            "number.min": "O valor mínimo para um objetivo é de R$ {#limit},00",
            "any.required": "O valor do objetivo é obrigatório"
        }),
    category_id: Joi.string()
        .required()
        .messages({
            "any.required": "Selecione a categoria do objetivo",
            "string.empty": "Selecione a categoria do objetivo"
        }),
    date_begin:
        Joi.alternatives().try(
            Joi.date().when(Joi.ref('$isEdit'), {
                is: false,
                then: Joi.date().min(Joi.ref('$todayDate')).messages({
                    "date.min": "A data de início do objetivo deverá ser hoje ou uma data futura",
                })
            }),
            Joi.string()
                .messages({
                    "string.empty": "Informe a data de início do objetivo"
                }),
        )
            .messages({ "any.required": "Informe a data de início do objetivo", })
            .required(),

    date_end:
        Joi.alternatives().try(
            Joi.date()
                .greater('now')
                .messages({
                    "date.greater": "A data limite do objetivo deverá ser uma data futura",
                }
                ),
            Joi.string()
                .messages({
                    "string.empty": "Informe a data limite do objetivo",
                }),
        )
            .messages({ "any.required": "Informe a data limite do objetivo", })
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

export function targetsValidate(values: INewTargetPayload, isEdit: boolean = false): FieldErrors {
    const schema = Joi.object(fieldsValidations)

    return getFieldErrors(schema.validate(values, {
        abortEarly: false,
        allowUnknown: true,
        context: {
            todayDate: startOfDay(new Date()),
            isEdit
        }
    }))
}