import React from "react"

const Users = () => {
  const USERS_QUERY = `
  query {
    allUsers {
      name
      id
      email
      role
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

  const url = `/.netlify/functions/schema`

  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: USERS_QUERY }),
  }

  const [users, setUsers] = React.useState(null)

  const getUsers = async () => {
    const fetchedUsers = await fetch(url, opts)
      .then(res => res.json())
      .catch(err => console.log(err))

    setUsers(fetchedUsers.data.allUsers)
  }

  React.useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <h3 className="my-4 text-3xl">Users:</h3>

      {users === null && <div className="text-gray-700">Loading...</div>}

      {users && (
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
