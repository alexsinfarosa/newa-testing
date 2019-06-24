import React from "react"
import { isAuthenticated } from "../utils/auth"

function Login() {
  if (!isAuthenticated()) {
    return (
      <section>
        <h2>Redirecting you to the login screen...</h2>
      </section>
    )
  }
}

export default Login
