import endPoints from ".";
import Cookie from "js-cookie";
import axios from "axios";

const Failures = () => {
  const registerFailure = async (data) => {
    const response = await axios.post(endPoints.failure.registerFailure, data, {
      headers: {
        Authorization: `Bearer ${Cookie.get("token")}`,
      },
    });
    return response.data;
  };
  
  const updateFailure = async (id, data) => {
    const response = await axios.put(endPoints.failure.updateFailure(id), data, {
      headers: {
        Authorization: `Bearer ${Cookie.get("token")}`,
      },
    });
    return response.data;
  }

  const showFailures = async () => {
    const response = await axios.get(endPoints.failure.showFailures, {
      headers: {
        Authorization: `Bearer ${Cookie.get("token")}`,
      },
    });
    return response.data;
  }

  const showFailure = async (id) => {
    const response = await axios.get(endPoints.failure.showFailure(id), {
      headers: {
        Authorization: `Bearer ${Cookie.get("token")}`,
      },
    });
    return response.data;
  }

  const deleteFailure = async (id) => {
    const response = await axios.delete(endPoints.failure.deleteFailure(id), {
      headers: {
        Authorization: `Bearer ${Cookie.get("token")}`,
      },
    });
    return response.data;
  }

  const getComponents = async () => {
    const response = await axios.get(endPoints.failure.getComponents, {
      headers: {
        Authorization: `Bearer ${Cookie.get("token")}`,
      },
    });
    return response.data;
  }

  return {
    registerFailure,
    updateFailure,
    showFailures,
    showFailure,
    deleteFailure,
    getComponents,
  }

}

export default Failures;