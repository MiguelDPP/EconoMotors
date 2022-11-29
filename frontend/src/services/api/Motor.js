import endPoints from ".";
import Cookie from "js-cookie";
import axios from "axios";

const Motor = () => {
  const storeMotorcycle = async (motorcycle) => {
    const response = await axios.post(endPoints.moto.regiterMotorcycle, motorcycle, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });
    return response.data;
  }


  return {
      storeMotorcycle,
  }
}

export default Motor;