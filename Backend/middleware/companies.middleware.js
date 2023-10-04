import companyValidation  from "../validation/companies.validation.js";

const companyValidate = function (req, res, next) {
  try {
    const { error } = companyValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export default companyValidate;
