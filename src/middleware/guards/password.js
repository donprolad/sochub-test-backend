import Joi from "joi";

const passwordSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .pattern(new RegExp("^[a-z0-9@.]"))
    .required(),

  password: Joi.string()
    .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{12,}$/)
    .required(),
}).xor("password", "access_token");

export const loginGuard = async (req, res, next) =>
  await passwordSchema
    .validateAsync(req.body)
    .then((validatedEmailAndPassword) =>
      validatedEmailAndPassword
        ? next()
        : res.status(400).json({
            success: false,
            message: "Invalid login credentials.",
            data: validatedEmailAndPassword,
          })
    )
    .catch((err) =>
      res.status(400).json({
        success: false,
        message: "Error occurred, unable to validate password.",
        err,
      })
    );
