import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { loginUser } from "../../services/userService"

export const Login = () => {
  const [email, set] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    return loginUser({email: email, password: password}).then((authResponse) => {
      if (authResponse.valid === true) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: authResponse.token,
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="auth-container">
      <section>
        <form className="auth-form" onSubmit={handleLogin}>
          <h1 className="header">Log in</h1>
          <h2>Please sign in</h2>
          <fieldset className="auth-fieldset">
              <input
                type="email"
                value={email}
                className="auth-form-input"
                onChange={(evt) => set(evt.target.value)}
                placeholder="Email address"
                required
                autoFocus
              />
              <input
                type="password"
                value={password}
                className="auth-form-input"
                onChange={(evt) => setPassword(evt.target.value)}
                placeholder="Password"
                required
              />

          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <button type="submit">Sign in</button>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="register-link">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  )
}

