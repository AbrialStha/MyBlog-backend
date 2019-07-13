import validator from 'validator'
import { isEmpty } from "../../utils/helper";
import { ObjectID } from "bson";

interface create_cateogry_input {
    name: string
}

export const validateCreateCategoryInput = (data: create_cateogry_input) => {
    let errors: { [key: string]: string } = {};
    data.name = !isEmpty(data.name) ? data.name : "";
    if (validator.isEmpty(data.name)) errors.name = "Name cannot be empty";
    else if (!validator.isLength(data.name, { min: 2 })) {
        errors.name = "Name must have minimum 2 charecter";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}