import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { registerUser } from "../../services/userService"

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: ""
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    const newUser = {
      ...user,
    }

    registerUser(newUser).then((registeredUser) => {
      if (registeredUser.token) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: registeredUser.token,
          })
        )
      
        navigate("/")
      }
      else {
        window.alert(registeredUser.message)
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
        registerNewUser()
  }

  const updateUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="header">Register Here</h1>
        <h2>Please Register</h2>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="first_name"
              className="auth-form-input"
              placeholder="Enter your first name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="last_name"
              className="auth-form-input"
              placeholder="Enter your last name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="auth-form-input"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="password"
              id="password"
              className="auth-form-input"
              placeholder="Create password"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <button type="submit">Register</button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}
