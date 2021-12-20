import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import styles from './Signup.module.css'
function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const { error, signup, isPending } = useSignup()
    const handleSignup = (e) => {
        e.preventDefault()
        signup(email, password, displayName)

    }
    return (
        <form onSubmit={handleSignup} className={styles['signup-form']}>
            <h2>Signup</h2>
            <label>
                <span>email:</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label>
                <span>password:</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>

            <label>
                <span>display name:</span>
                <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </label>

            {!isPending && <button className="btn">Signup</button>}
            {isPending && <button className='btn'>Loading ...</button>}
            {error && <p>{error}</p>}
        </form >
    )
}

export default Signup
