const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

export const isPhone = (input: string) => phoneRegex.test(input);
