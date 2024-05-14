import Joi from "joi";

export const passwordSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .pattern(new RegExp("^[a-z0-9@.]"))
    .required(),

  password: Joi.string()
    .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{12,}$/)
    .required(),
}).xor("password", "access_token");

export const registrationSchema = Joi.object({
  user: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .pattern(new RegExp("^[a-z0-9@.]"))
      .required(),
    password: Joi.string()
      .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{12,}$/)
      .required(),
  }),
  organization: Joi.string().required(),
}).xor("password", "access_token");

export const forgottenPasswordSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .pattern(new RegExp("^[a-z0-9@.]"))
    .required(),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .pattern(new RegExp("^[a-z0-9@.]"))
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{12,}$/)
    .required(),
  confirm_password: Joi.ref("password"),
})
  .xor("password", "access_token")
  .with("password", "confirm_password");
