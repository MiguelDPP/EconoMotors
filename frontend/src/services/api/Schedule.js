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

  const showSchedules = async () => {
    const response = await axios.get(endPoints.schedule.showSchedules, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });
    return response.data;
  }
  

  const showSchedule = async (id) => {
    const response = await axios.get(endPoints.schedule.showSchedule(id), {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });

    return response.data;
  }

  const updateSchedule = async (id, schedule) => {
    const response = await axios.put(endPoints.schedule.updateSchedule(id), schedule
    , {
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });

    return response.data;
  }

  const deleteSchedule = async (id) => {
    const response = await axios.delete(endPoints.schedule.deleteSchedule(id), {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });

    return response.data;
  }

  const getFullCalendar = async () => {
    const response = await axios.get(endPoints.schedule.getFullCalendar, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });

    return response.data;
  }

  const storeScheduleException = async (schedule) => {
    const response = await axios.post(endPoints.schedule.sheduleException, schedule, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });
    return response.data;
  }

  const removeScheduleException = async (id) => {
    const response = await axios.delete(endPoints.schedule.removeScheduleException(id), {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });

    return response.data;
  }



  return {
    storeSchedule,
    showSchedules,
    showSchedule,
    updateSchedule,
    deleteSchedule,
    getFullCalendar,
    storeScheduleException,
    removeScheduleException,
  }
}

export default Schedule;