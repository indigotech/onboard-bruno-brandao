export const validateEmail = new RegExp(
  "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
);

export const validatePassword = new RegExp(
  "^(?=.*?[A-Za-z])(?=.*?[0-9]).{7,}$",
);
