import { useContext } from "react";
import { redirect } from "react-router-dom";
import { clearLocalAuthToken } from "../../utils/auth";
import { AuthContext } from "./auth.context";

export function useLogout() {
    const { setAuthToken } = useContext(AuthContext);

    setAuthToken("");

    clearLocalAuthToken();
    return redirect('/');
}