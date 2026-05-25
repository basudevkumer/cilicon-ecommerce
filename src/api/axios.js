// axios import
import axios from "axios";

//  instatance of axios with custom configuration
 export  const instance = axios.create({
  baseURL: "https://dummyjson.com/",
  timeout: 4000,
});
