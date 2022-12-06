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
    const response = await axios.post(endPoints.tool.tecn, tecnomecanical, {
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

  const getNecessaryGasoline = async () => {
    const response = await axios.get(endPoints.tool.getNecessaryGasoline, {
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
    const response = await axios.get(endPoints.tool.tecns, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });
    return response.data;
  }
  const deleteGasoline = async (id) => {
    const response = await axios.delete(endPoints.tool.deleteGasoline(id), {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });
    return response.data;
  }
  const deleteOil = async (id) => {
    const response = await axios.delete(endPoints.tool.deleteOil(id), {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });
    return response.data;
  }
  const deleteTecnomecanical = async (id) => {
    const response = await axios.delete(endPoints.tool.deleteTecnomecanical(id), {
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
    getTecnomecanical,
    deleteGasoline,
    deleteOil,
    deleteTecnomecanical,
    getNecessaryGasoline
  }
}

export default Tools;