import React from "react"

const Users = () => {
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
      <h3 className="my-4 text-3xl">Users:</h3>

      {users.length === 0 && <div className="text-gray-700">Loading...</div>}

      {users.length !== 0 && (
        <ul className="list-disc">
          {users.map((user, i) => {
            return (
              <li key={i} className="list-inside">
                <span className="mr-2">{user.name} - </span>
                <span className="mr-2">{user.email} - </span>
                <span className="mr-2">{user.role}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Users
