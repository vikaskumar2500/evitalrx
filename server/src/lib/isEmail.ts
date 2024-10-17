const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

export const isEmail = (input: string) => emailRegex.test(input);
