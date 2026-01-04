import { useState, useEffect } from "react"
import { getAssignments } from "../services/assignmentService"
import { createAssignment } from "../services/assignmentService"



const AssignmentForm = ({ setAssignmentsArray }) => {
    const initialState = {
        name: "",
    }
    const [assignment, setAssignment] = useState(initialState)
    useEffect(() => {

        setAssignment(prevAssignment => ({
            ...prevAssignment,

        }))
    }, [])
    const handleAssignmentChange = (event) => {
        setAssignment({
            ...assignment,           // Keep all existing properties
            name: event.target.value  // Update just this one
        })
    }

    const handleClick = async (event) => {
        event.preventDefault()
        const missingFields = validateForm()
        if (missingFields.length > 0) {
            const fieldList = missingFields.join(", ")
            window.alert(`Please fill out the following required fields: ${fieldList}`)
            return
        }
        setAssignment(prevAssignment => ({
            ...prevAssignment,
        }))
        await createAssignment(assignment)
        setAssignment(initialState)
        getAssignments().then((assignments) => {
            setAssignmentsArray(assignments)
        })
    }

    const validateForm = () => {
        const missingFields = []

        if (!assignment.name.trim()) {
            missingFields.push("Assignment Name")
        }
        return missingFields
    }
    return (
        <div>
            <form className="form-add-assignment">
                <h2>Add Assignment</h2>
                <div className="form-assignment-fieldset">
                    <fieldset>
                        <label htmlFor="fullName">Assignment Name</label>
                        <input
                            id="name"
                            type="text"
                            value={assignment.name}
                            onChange={handleAssignmentChange}
                            placeholder="Enter assignment name"
                        />
                    </fieldset>
                    <button
                        onClick={handleClick}
                    >Add Assignment</button>
                </div>

            </form>
        </div>
    )
}
export default AssignmentForm