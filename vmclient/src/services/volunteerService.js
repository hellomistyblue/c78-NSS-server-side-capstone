

export const getVolunteers = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return fetch(`http://localhost:8000/volunteers?owner=current`, {
        headers: {
            "Authorization": `Token ${user.token}`, 
            "Content-Type": `application/json`
        }
    }).then((res) =>
        res.json()
    );
};


