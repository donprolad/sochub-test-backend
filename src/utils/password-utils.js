
export const checkPasswordLength = (rule) => (password) =>
    rule.passwordLength === password.length ? true : false

export const check