import { useState, useContext, createContext, useEffect } from 'react';

const AlertContext = createContext({});

export const ProviderAlert = ({ children }) => {
    const alert = useProvideAlert();
    return <AlertContext.Provider value={alert}>{children}</AlertContext.Provider>;
};

export const useAlert = () => {
    return useContext(AlertContext);
};

const useProvideAlert = (options) => {
    const defaultOptions = {
      active: false,
      message: '',
      type: '',
      autoClose: true,
      header: ''
    };

    

    const [alert, setAlert] = useState({
      ...defaultOptions,
      ...options,
    });


    useEffect(() => {
      if (alert.active) {
        setTimeout(() => {
          setAlert(
            defaultOptions
          );
        }, 3000);
      }
    }, [alert]);
    const toggleAlert = () => {
      setAlert(!alert.active);
    };
  
    return {
      alert,
      setAlert,
      toggleAlert,
    };
  };
    