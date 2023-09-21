export const Alert = (error) => {
  alert(error?.response?.data?.message || error?.message);
};
