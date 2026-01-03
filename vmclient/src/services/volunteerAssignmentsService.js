export const getVolunteersForAssignment = (assignmentId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return fetch(`http://localhost:8000/volunteer_assignments?assignment_id=${assignmentId}`, {
        method: "GET",       
        headers: {
            "Authorization": `Token ${user.token}`, 
            "Content-Type": `application/json`
        }
    }).then((res) => res.json());
};


export const deleteVolunteerAssignment = (volunteerAssignmentId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return fetch(`http://localhost:8000/volunteer_assignments/${volunteerAssignmentId}`, {
        method: "DELETE",       
        headers: {
            "Authorization": `Token ${user.token}`, 
            "Content-Type": `application/json`
        }
    });
};

export const createVolunteersForAssignment = (assignmentObj) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return fetch(`http://localhost:8000/volunteer_assignments`, {
        method: "POST",       
        headers: {
            "Authorization": `Token ${user.token}`, 
            "Content-Type": `application/json`
        },
        body: JSON.stringify(assignmentObj),
    }).then((res) => {
        if (!res.ok) {
            return res.json().then(errorData =>{
                throw new Error(errorData.message || 'Failed to create assignment');
            }).catch(() => {
                throw new Error('Failed to create assignment')
            });
        }
        return res.json();
    });
};