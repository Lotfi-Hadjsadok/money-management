import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import styles from './Login.module.css'
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isPending, error } = useLogin()
    const handleLogin = (e) => {
        e.preventDefault()
        login(email, password)
    }
    return (
        <form onSubmit={handleLogin} className={styles['login-form']}>
            <h2>Login</h2>
            <label>
                <span>email:</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label>
                <span>password:</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>


            {!isPending && <button className="btn">Login</button>}
            {isPending && <button className="btn" disabled>Loading ...</button>}
            {error && <p>{error}</p>}
        </form >
    )
}

export default Login
