const API = process.env.NEXT_PUBLIC_API

const endPoints = {
    auth:{
        register: `${API}/api/register`,
        login: `${API}/api/login`,
        userProfile: `${API}/api/user`,
        sendEmail: `${API}/api/recovery`,
        updateUser: `${API}/api/user`,
    }
}

export default endPoints;