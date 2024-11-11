import joi from "joi";

export const exportDataSchema = joi.object({
  sleepTime: joi.number().required().messages({
    "number.empty": "sleep Time is required",
  }),
  requestsPerSecond: joi.number().required().messages({
    "number.empty": "Requests PerSecond is required",
  }),
  apiUrl: joi.string().required().messages({
    "string.empty": "Api url is required",
  }),
});

export const getUserListSchema = joi.object({
  name: joi.string().optional().messages({
    "string.base": "Name must be a string.",
  }),
  email: joi.string().optional().messages({
    "string.base": "email must be a string.",
  }),
  age: joi.number().optional().messages({
    "number.base": "age must be a number.",
  }),
  gender: joi.string().optional().messages({
    "string.base": "gender must be a string.",
  }),
  dob: joi.string().optional().messages({
    "string.base": "dob must be a string.",
  }),
  country: joi.string().optional().messages({
    "string.base": "country must be a string.",
  }),
  id: joi.string().optional().messages({
    "string.base": "id must be a string.",
  }),
  pageIndex: joi.number().required().messages({
    "number.base": "pageIndex must be a number.",
  }),
  pageSize: joi.number().required().messages({
    "number.base": "pageSize must be a number.",
  }),
});
