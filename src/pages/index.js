import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { isBrowser } from "../utils/utils"

const IndexPage = () => {
  const [lat, setLat] = React.useState(null)
  const [lon, setLon] = React.useState(null)
  const [errorMsg, setErrorMsg] = React.useState("")

  React.useEffect(() => {
    if (isBrowser) {
      if ("geolocation" in navigator) {
        // geolocation is supported
        navigator.geolocation.getCurrentPosition(
          position => {
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)
          },
          error => {
            setErrorMsg(error.message)
          }
        )
      } else {
        // geolocation is not supported
        console.log("geolocation is not enabled on this browser")
      }
    }
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <section>
        <nav className="mr-4 text-right">
          <Link className="mr-2" to="/account">
            Log in
          </Link>
        </nav>
        <h2 className="mb-4 text-center text-4xl">Landing Page</h2>

        <p className="w-1/2 m-auto text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, tempore
          minima provident praesentium amet cupiditate, voluptas est aspernatur
          officiis animi vero eligendi expedita sint quas ab modi, dignissimos
          sequi! Odit!
        </p>

        {!lat && !errorMsg && (
          <p className="w-1/2 m-auto mt-4 text-justify text-xl text-orange-600">
            Loading...
          </p>
        )}
        {lat && (
          <p className="w-1/2 m-auto mt-4 text-justify text-xl text-orange-600">{`lat: ${lat}, lng: ${lon}`}</p>
        )}

        {errorMsg && (
          <p className="w-1/2 m-auto mt-4 text-justify text-xl text-red-600">{`Error: ${errorMsg}`}</p>
        )}
      </section>
    </Layout>
  )
}

export default IndexPage
