export const isEmailVerification = (): boolean => {
    return process.env.EMAIL_VERIFICATION === "true";
};
