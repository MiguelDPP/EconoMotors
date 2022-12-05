import { useState, useContext, createContext } from "react";
//No se para que son 
import Cookie from "js-cookie";
import axios from "axios";
import endPoints from "@services/api";

//Creamos el contexto
const AuthContext = createContext({});

export function ProviderAuth({children}){
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
export const useAuth = () =>{
    return useContext(AuthContext);
}

function useProvideAuth(){

    //Estas son las variables globales que se van a tener en cuenta en la autenticacion
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [informationGlobal, setInformationGlobal] = useState({});

    //Peticion a la API para el registro del usuario
    const register = async (data) =>{
        const response = await axios.post(endPoints.auth.register, data ,{
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response;
    }
    //Peticion a la API para actuailizar los usuarios
    const updateUser = async (data) =>{
        const response = await axios.patch(endPoints.auth.userProfile, data ,{
            headers: {
                Authorization: `Bearer ${Cookie.get("access_token")}`,
            }
        });
        return response;
    }

    //Peticion a la API para obtener los datos del usuario
    const getUser = async () => {
        const data = await axios.get(endPoints.auth.userProfile,{
            headers: {
                Authorization: `Bearer ${Cookie.get("access_token")}`,
            }
        });
        setUser(data.data.user);
        return data;
    }

    //Peticion a la API para el Inicio de Sesión
    const signin = async (email, password) =>{
        const options ={
            Headers:{
                accept: "*/*",
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
        }

        const {
            data: {access_token},
        } = await axios.post(endPoints.auth.login, {email, password}, options);
        if(access_token){
            Cookie.set("access_token", access_token, {expires: 5});
            return access_token;
        }
    };

    //Enviar Email con una nueva contraseña
    const sendEmail = async (email) => {
        const {message} = await axios.post(endPoints.auth.sendEmail, {email},{
         headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
         }
        });
        return message;
    }

    return {
        user,
        setUser,
        error,
        setError,
        register,
        getUser,
        signin,
        sendEmail,
        updateUser,
        informationGlobal,
        setInformationGlobal,
    }

}