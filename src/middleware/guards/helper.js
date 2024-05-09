export const guard = (schema) => async (req, res, next) =>
    await schema.validateAsync(req.body)
        .then(validated => validated ? next() : res.status(400).json({
            success: false,
            message: "Invalid or malformed request data.",
            error: validated
        }))

        .catch(error => res.status(400).json({
            success: false,
            message: "Error occurred, unable to validate request",
            error
        }))
