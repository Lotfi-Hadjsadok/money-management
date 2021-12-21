import { useState } from 'react'
import { useEffect, useReducer } from 'react/cjs/react.development'
import { db, timestamp } from '../firebase/config'

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}
const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: null, error: null }
        case 'ADDED_DOC':
            return { ...state, isPending: false, document: action.payload, success: true }
        case 'DELETED_DOC':
            return { ...state, isPending: false, document: null, success: true }
        case 'ERROR':
            return { ...state, isPending: false, error: action.payload, success: false }

        default:
            return state
    }
}
export const useFirestore = (collection) => {

    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)
    const ref = db.collection(collection)
    const sureDispatch = (action) => {
        if (!isCancelled)
            dispatch(action)
    }

    //add doc
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })

        try {

            const createdAt = timestamp
            const addedDoc = await ref.add(doc)

            sureDispatch({ type: 'ADDED_DOC', payload: { ...addedDoc, createdAt } })
        }
        catch (err) {
            sureDispatch({ type: 'ERROR', payload: err.message })

        }
    }

    // delete doc
    const deleteDocument = async id => {
        dispatch({ type: 'IS_PENDING' })
        try {
            const deletedDoc = await ref.doc(id).delete()
            sureDispatch({ type: 'DELETED_DOC', payload: deletedDoc })
        } catch (error) {
            sureDispatch({ type: 'ERROR', payload: error.message })
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response }
}