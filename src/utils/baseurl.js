import axios from "axios";
import { api } from "./api";

export const Axios = axios.create({
  baseURL: api,
});
