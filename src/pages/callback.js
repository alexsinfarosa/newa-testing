import React from "react"
import { handleAuthentication } from "../utils/auth.js"

function Callback() {
  handleAuthentication()

  return (
    <section>
      <h2>Logging you in...</h2>
    </section>
  )
}

export default Callback
