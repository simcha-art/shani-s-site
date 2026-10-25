import { createContext, useState } from "react";

interface Login {
    isLogged: null | string,
    updateLogged: ( ) => void
}

export const LoggedContext = createContext<Login>({isLogged: null, updateLogged: () => {}})


function LoginContext({children} : {children: React.ReactNode}) {
    const [isLogged, setLogged] = useState(localStorage.getItem("token"))
    function updateLogged() {
        setLogged(localStorage.getItem("token"))
    }
  return (
    <LoggedContext.Provider value={{isLogged, updateLogged}}>
        {children}
    </LoggedContext.Provider>
  )
}

export default LoginContext

