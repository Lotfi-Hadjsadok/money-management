import { useEffect, useState } from "react"
import { auth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"


export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    const login = async (email, password) => {
        setIsPending(true)
        setError(null)
        try {
            const response = await auth.signInWithEmailAndPassword(email, password)
            dispatch({ type: 'LOGIN', payload: response.user })
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
    return { error, isPending, login }
}