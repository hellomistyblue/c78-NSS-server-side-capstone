
export const getAssignments = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return fetch(`http://localhost:8000/assignments?owner=current`, {
        headers: {
            "Authorization": `Token ${user.token}`, 
            "Content-Type": `application/json`
        }
    }).then((res) =>
        res.json()
    );
};

export const createAssignment = (assignment) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return fetch(`http://localhost:8000/assignments`, {
    method: "POST",
    headers: {
      Authorization: `Token ${user.token}`,
      "Content-Type": `application/json`,
    },
    body: JSON.stringify(assignment),
  }).then((res) => res.json());
};