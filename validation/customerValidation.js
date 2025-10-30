const Joi = require('joi');

const customerSchema = Joi.object({
    customerName: Joi.string().min(3).max(30).required(),
    phoneNumber: Joi.string().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    dateOfBirth: Joi.date().required(),
    timeOfBirth: Joi.string().required(),
    wallet: Joi.number().required()
});

const validateCustomer = (data) => {
    return customerSchema.validate(data);
};

module.exports = validateCustomer;
