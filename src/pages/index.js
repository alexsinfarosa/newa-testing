import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
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
    </section>
  </Layout>
)

export default IndexPage
