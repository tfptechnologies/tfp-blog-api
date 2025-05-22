const Joi = require('joi');

const createCommentSchema = Joi.object({
    content: Joi.string().required().min(1).max(1000),
    blogId: Joi.string().required()
});

const updateCommentSchema = Joi.object({
    content: Joi.string().required().min(1).max(1000)
});

module.exports = {
    createCommentSchema,
    updateCommentSchema
};
