import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { useFirestore } from "../../hooks/useFirestore"

function TransactionForm({ uid }) {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')

    const { response, addDocument } = useFirestore('transactions')
    const handleSubmit = (e) => {
        e.preventDefault()

        addDocument({ name, amount, uid })
    }
    useEffect(() => {
        if (response.success) {
            setName('')
            setAmount('')
        }
    }, [response.success])
    return (
        <>
            <h3>Add a Transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction name:</span>
                    <input type="text" required onChange={(e) => setName(e.target.value)} value={name} />
                </label>
                <label>
                    <span>Amount ($):</span>
                    <input type="number" required onChange={(e) => setAmount(e.target.value)} value={amount} />
                </label>
                {response.isPending && <button className="btn">Loading ...</button>}
                {!response.isPending && <button className="btn">Add Transaction</button>}
            </form>
        </>
    )

}

export default TransactionForm
