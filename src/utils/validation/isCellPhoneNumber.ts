export const isCellPhoneNumber = (phoneNumber: string) => {
  const regex = new RegExp(/^((((0{2}?)|(\+){1})46)|0)7[\d]{8}$/);
  return regex.test(phoneNumber);
};
