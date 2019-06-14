import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div>
      <a href="#" className="mx-3 block text-red-600 hover:bg-gray-200">
        one
      </a>
      <a href="#" className="mx-3 block text-red-600">
        two
      </a>
    </div>
  </Layout>
)

export default IndexPage
