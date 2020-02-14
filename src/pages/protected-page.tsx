import { withAuthenticator } from "aws-amplify-react"
import { Link } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ProtectedPage = () => (
  <Layout>
    <SEO title="Protected page" />
    <h1>Hi from the protected page</h1>
    <p>Welcome to protected page</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default withAuthenticator(ProtectedPage)
