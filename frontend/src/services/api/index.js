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
    },
}

export default endPoints;