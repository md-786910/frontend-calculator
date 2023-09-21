import { Axios } from "./baseurl";
import { Alert } from "./error";
import { email } from "./token";

// crud operation of calculation
export const getCalculationData = async () => {
  try {
    const res = await Axios.get(`/get/${email}`);
    return res;
  } catch (error) {
    Alert(error);
  }
};
// add operation of calculation
export const addCalculationData = async (name, expression, result) => {
  try {
    const res = await Axios.post("/add", {
      name: name,
      expression: expression,
      email: email,
      result: result,
    });
    return res;
  } catch (error) {
    Alert(error);
  }
};
// delete operation of calculation
export const deleteCalculationData = async (id) => {
  try {
    const res = await Axios.delete(`/delete/${email}/${id}`);
    return res;
  } catch (error) {
    Alert(error);
  }
};
