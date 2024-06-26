export const validateEmail = new RegExp(
  "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
);

export const validatePassword = new RegExp(
  "^(?=.*?[A-Za-z])(?=.*?[0-9]).{7,}$",
);

export const validateBirthDate = (birthDate: string) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(birthDate)) {
    return false;
  }

  const [day, month, year] = birthDate.split("/").map(Number);

  const today = new Date();
  const age = today.getFullYear() - year;
  switch (true) {
    case age < 18:
      return false;
    case age === 18 && month > today.getMonth() + 1:
      return false;
    case age === 18 && month === today.getMonth() + 1 && day > today.getDate():
      return false;
    case age > 18 && (month > 12 || month < 1):
      return false;
    case age > 18 && (day > 31 || day < 1):
      return false;
    case age > 110:
      return false;
    default:
  }

  return true;
};
