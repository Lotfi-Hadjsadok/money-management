import { useEffect, useState } from "react"
import { auth } from '../firebase/config'
import { useAuthContext } from "./useAuthContext"
export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const { dispatch } = useAuthContext()
    const [isCancelled, setIsCancelled] = useState(false)

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)
        try {
            const response = await auth.createUserWithEmailAndPassword(email, password)
            if (!response) {
                throw new Error('Could not complete signup')
            }
            await response.user.updateProfile({ displayName })

            dispatch({ type: 'LOGIN', payload: response.user })

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        }
        catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }
    useEffect(() => {
        return setIsCancelled(true)
    }, [])
    return { error, isPending, signup }
}