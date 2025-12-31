export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8000/users?email=${email}`).then((res) =>
    res.json()
  )
}

export const registerUser = (user) => {
  return fetch("http://localhost:8000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}

export const loginUser = (user) => {
  return fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}

