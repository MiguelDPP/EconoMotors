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

  const updateMotorcycle = async (motorcycle) => {
    console.log(motorcycle);
    const response = await axios.patch(endPoints.moto.updateMotorcycle, motorcycle, {
      headers: {
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });

    return response.data;
  }


  return {
      storeMotorcycle,
      updateMotorcycle
  }
}

export default Motor;