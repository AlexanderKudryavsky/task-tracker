export const required = value => {
    if(value)return undefined;
    return "Required"
};
export const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;