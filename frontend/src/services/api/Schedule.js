import endPoints from ".";
import Cookie from "js-cookie";
import axios from "axios";

const Schedule = () => {

  const storeSchedule = async (schedule) => {
    const response = await axios.post(endPoints.schedule.registerSchedule, schedule, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });
    return response.data;
  }

  return {
    storeSchedule
  }
}

export default Schedule;