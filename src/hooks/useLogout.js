import { useEffect, useState } from "react"
import { auth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"


export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    const logout = async () => {
        setIsPending(true)
        setError(null)
        try {
            await auth.signOut()
            dispatch({ type: 'LOGOUT' })
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        }
        catch (error) {
            if (!isCancelled) {
                console.log(error.message)
                setError(error.message)
                setIsPending(false)
            }
        }

    }
    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    }, [])
    return { error, isPending, logout }
}