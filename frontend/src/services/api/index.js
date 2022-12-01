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
    schedule:{
        registerSchedule: `${API}/api/schedule`,
        updateSchedule: (id) => `${API}/api/schedule/${id}`,
        showSchedules: `${API}/api/schedules`,
        showSchedule: (id) => `${API}/api/schedule/${id}`,
        deleteSchedule: (id) => `${API}/api/schedule/${id}`,
    },
}

export default endPoints;