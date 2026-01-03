export const getVolunteerStatuses = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return fetch(`http://localhost:8000/statuses`, {
        method: "GET",       
        headers: {
            "Authorization": `Token ${user.token}`, 
            "Content-Type": `application/json`
        }
    }).then((res) => res.json());
}


