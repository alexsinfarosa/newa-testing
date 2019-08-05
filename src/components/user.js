import React from "react"

const Users = user => {
  console.log(user.user)
  const USERS_QUERY = `
  query {
    allUsers{
      data {
        name
        email
        state
        role
        _id
        stations {
          name
          network
          id
        }
      }
    }
  }
  `

  // const USERS_MUTATION = `
  // mutation($todo: Todo!) {
  //   createTodo(data: {
  //     title: $todo.title
  //     completed: $todo.completed
  //   }) {
  //     title
  //     completed
  //   }
  // }
  // `

  const url = `/.netlify/functions/schema2`

  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: USERS_QUERY }),
  }

  const [users, setUsers] = React.useState([])

  const getUsers = async () => {
    const fetchedUsers = await fetch(url, opts)
      .then(res => res.json())
      .catch(err => console.log(err))

    return fetchedUsers.data.allUsers.data
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

      <h3 className="my-4 text-3xl">Users:</h3>

      {users.length === 0 && <div className="text-gray-700">Loading...</div>}

      {users.length !== 0 && (
        <ul className="list-disc">
          {users.map((user, i) => {
            return (
              <pre key={user._id} className="text-green-700">
                {JSON.stringify(user, null, 2)}
              </pre>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Users
