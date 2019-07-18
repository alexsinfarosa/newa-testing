import React from "react"
import { Router } from "@reach/router"

import { isAuthenticated, getProfile, login, logout } from "../utils/auth.js"

import { Link } from "gatsby"

import User from "../components/user"

const Home = ({ user }) => (
  <div className="m-4">
    <h2 className="text-4xl">Hi, {user.name ? user.name : "friend"}!</h2>
    <User />
  </div>
)
const Settings = () => <h2 className="text-4xl">Settings Page</h2>
const Billing = () => <h2 className="text-4xl">Billing Page</h2>

function Account() {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <>
      <nav className="text-right text-red-600">
        <Link className="mr-2" to="/account">
          Account
        </Link>
        <Link className="mr-2" to="/account/settings">
          Settings
        </Link>
        <Link className="mr-12" to="/account/billing">
          Billing
        </Link>
        <a
          className="mr-2 text-blue-700"
          href="#logout"
          onClick={e => {
            logout()
            e.preventDefault()
          }}
        >
          Log out
        </a>
      </nav>

      <Router>
        <Home path="/account" user={user}></Home>
        <Settings path="/account/settings"></Settings>
        <Billing path="/account/billing"></Billing>
      </Router>
    </>
  )
}

export default Account
