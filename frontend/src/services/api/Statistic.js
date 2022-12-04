import endPoints from ".";
import Cookie from "js-cookie";
import axios from "axios";

const Statistic = () => {
    const getNecessaryGasolineGlobal = async () => {
      const response = await axios.get(endPoints.statistics.getNecessaryGasolineGlobal, {
        headers: {
          Authorization: `Bearer ${Cookie.get("access_token")}`,
        },
      });

      return response.data;
    }

    const getDataAge = async () => {
      const response = await axios.get(endPoints.statistics.getDataAge, {
        headers: {
          Authorization: `Bearer ${Cookie.get("access_token")}`,
        },
      });

      return response.data;
    }

    const getCostByYear = async ($year) => {
      const response = await axios.get(endPoints.statistics.getCostByYear($year), {
        headers: {
          Authorization: `Bearer ${Cookie.get("access_token")}`,
        },
      });

      return response.data;
    }

    const getCostByYearGasoline = async ($year) => {
      const response = await axios.get(endPoints.statistics.getCostByYearGasoline($year), {
        headers: {
          Authorization: `Bearer ${Cookie.get("access_token")}`,
        },
      });

      return response.data;
    }

    return {
        getNecessaryGasolineGlobal,
        getDataAge,
        getCostByYear,
        getCostByYearGasoline,
    }
}

export default Statistic;