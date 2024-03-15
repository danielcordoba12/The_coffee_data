import axios from "axios";

export default axios.create({
    baseURL:'http://192.168.100.160:4000/'
})

export  const localhost = "192.168.100.160";