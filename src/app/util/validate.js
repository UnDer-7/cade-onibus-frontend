export const Validate = {
  email: (email) => {
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailRegex.test(email);
  },
  password: (password) => {
    return password.length < 5
  },
  onibus: (onibus) => {
    return onibus.length < 1
  }
};
