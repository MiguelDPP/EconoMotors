import endPoints from ".";
import Cookie from "js-cookie";
import axios from "axios";

const Tools = () => {
  const storeGasoline = async (gasoline) => {
    const response = await axios.post(endPoints.tool.gasoline, gasoline, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });
    return response.data;
  }
  const storeOil = async (oil) => {
    const response = await axios.post(endPoints.tool.oil, oil, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });
    return response.data;
  }
  const storeTecnomecanical = async (tecnomecanical) => {
    const response = await axios.post(endPoints.tool.tecnomecanical, tecnomecanical, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });
    return response.data;
  }

  const getGasolines = async () => {
    const response = await axios.get(endPoints.tool.gasolines, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });
    return response.data;
  }

  const getOils = async () => {
    const response = await axios.get(endPoints.tool.oils, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });
    return response.data;
  }
  const getTecnomecanical = async () => {
    const response = await axios.get(endPoints.tool.tecnomecanical, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });
    return response.data;
  }


  return {
    storeGasoline,
    storeOil,
    storeTecnomecanical,
    getGasolines,
    getOils,
    getTecnomecanical
  }
}

export default Tools;