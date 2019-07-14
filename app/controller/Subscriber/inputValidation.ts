import validator from 'validator'
import { isEmpty } from "../../utils/helper";

interface AddSubscriber_input {
    email: string
}

export const validateAddSubscriberInput = (data: AddSubscriber_input) => {
    let errors: { [key: string]: string } = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    if (validator.isEmpty(data.email)) errors.email = "Email cannot be empty";
    else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}