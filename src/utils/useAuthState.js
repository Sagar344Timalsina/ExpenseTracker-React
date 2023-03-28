import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
function useAuthState  () {
    const [authUser, setAuthUser] = useState("");

    // useEffect(() => {
    //     const listen = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setAuthUser(user)
    //         }
    //         else { setAuthUser(null) }
    //         console.log(listen)
    //     })
    // }, []);
    return [authUser, setAuthUser]
}
export default useAuthState;