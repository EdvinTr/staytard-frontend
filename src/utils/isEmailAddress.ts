export const isEmailAddress = (email: string) => {
  return /^\S+@\S+\.\S+$/.test(email);
};
