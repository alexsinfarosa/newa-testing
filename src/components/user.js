import React from "react"

const User = user => {
  const USER_QUERY = `
  query {  allUsers {
    id
    name
    email
    role
  }}
`

  const url = `/.netlify/functions/schema`

  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: USER_QUERY }),
  }

  const [users, setUsers] = React.useState([])

  const getUsers = async () => {
    const fetchedUsers = await fetch(url, opts)
      .then(res => res.json())
      .catch(err => console.log(err))

    // console.log(fetchedUsers.data.allUsers)
    return fetchedUsers.data.allUsers
  }

  React.useEffect(() => {
    let isSubscribed = true

    getUsers().then(users => {
      if (isSubscribed) {
        setUsers(users)
      }
    })

    return () => (isSubscribed = false)
  }, [])

  return (
    <div>
      <h3 className="my-4 text-3xl">Authenticated User:</h3>
      <pre key={user.sub}>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

export default User
