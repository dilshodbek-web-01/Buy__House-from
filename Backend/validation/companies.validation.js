import Joi from "joi";

const companyValidation = (data) => {

  const schema = Joi.object({
    company_name: Joi.string().min(2).max(64).required(),
    company_imgpath: Joi.string().min(2).max(128),
    created_by_user_id: Joi.string().min(2).max(64),
  });

  return schema.validate(data);
};

export default companyValidation;
