const API = process.env.NEXT_PUBLIC_API

const endPoints = {
    auth:{
        register: `${API}/api/register`,
        login: `${API}/api/login`,
        userProfile: `${API}/api/user`,
        sendEmail: `${API}/api/recovery`,
    },
    moto:{
        brands: `${API}/api/brands`,
        motor: (brand) => `${API}/api/motorcycles/${brand}`,
        presentations: (motor) => `${API}/api/presentations/${motor}`,
        regiterMotorcycle: `${API}/api/motorcycle`,
        updateMotorcycle: `${API}/api/motorcycle`,
    },
    tool:{
        gasoline: `${API}/api/gasoline`,
        gasolines: `${API}/api/gasolines`,
        deleteGasoline:(id) => `${API}/api/gasoline/${id}`,
        oil: `${API}/api/oil`,
        oils: `${API}/api/oils`,
        deleteOil:(id) => `${API}/api/oil/${id}`,
        tecn: `${API}/api/Tecnomecanical`,
        tecns: `${API}/api/Tecnomecanicals`,
        deleteTecnomecanical:(id) => `${API}/api/tecnomecanical/${id}`,
        getNecessaryGasoline: `${API}/api/getNecessaryGasolineGlobal/`,
    },
    schedule:{
        registerSchedule: `${API}/api/schedule`,
        updateSchedule: (id) => `${API}/api/schedule/${id}`,
        showSchedules: `${API}/api/schedules`,
        showSchedule: (id) => `${API}/api/schedule/${id}`,
        deleteSchedule: (id) => `${API}/api/schedule/${id}`,
        getFullCalendar: `${API}/api/full-schedule`,
        sheduleException: `${API}/api/schedule-exception`,
        removeScheduleException: (id) => `${API}/api/schedule-exception/${id}`,
    },
    failure: {
        registerFailure: `${API}/api/failure`,
        updateFailure: (id) => `${API}/api/failure/${id}`,
        showFailures: `${API}/api/failures`,
        showFailure: (id) => `${API}/api/failure/${id}`,
        deleteFailure: (id) => `${API}/api/failure/${id}`,
        getComponents: `${API}/api/components`,
    },
    statistics: {
        getNecessaryGasolineGlobal: `${API}/api/getNecessaryGasolineGlobal`,
        getDataAge: `${API}/api/getDataAge`,
        getCostByYear: (year) => `${API}/api/getCostByYear/${year}`,
        getCostByYearGasoline: (year) => `${API}/api/getCostByYearGasoline/${year}`,
    }
}

export default endPoints;