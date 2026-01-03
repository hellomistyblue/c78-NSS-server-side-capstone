export const getVolunteers = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return fetch(`http://localhost:8000/volunteers?owner=current`, {
    headers: {
      Authorization: `Token ${user.token}`,
      "Content-Type": `application/json`,
    },
  }).then((res) => res.json());
};

export const createVolunteer = (volunteer) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return fetch(`http://localhost:8000/volunteers`, {
    method: "POST",
    headers: {
      Authorization: `Token ${user.token}`,
      "Content-Type": `application/json`,
    },
    body: JSON.stringify(volunteer),
  }).then((res) => res.json());
};


export const updateVolunteerStatus = (volunteerId, statusId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return fetch(`http://localhost:8000/volunteers/${volunteerId}`, {
        method: "PUT",       
        headers: {
            "Authorization": `Token ${user.token}`, 
            "Content-Type": `application/json`
        },
        body: JSON.stringify({status_id: statusId}),
    });
}