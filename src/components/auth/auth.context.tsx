import { createContext, useState, Dispatch, PropsWithChildren } from "react";

type AuthContextState = {
    authToken: string;
    setAuthToken: Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextState>({
    authToken: ""
} as AuthContextState);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [ authToken, setAuthToken ] = useState("");

    const value = { authToken, setAuthToken};
    return <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>
}