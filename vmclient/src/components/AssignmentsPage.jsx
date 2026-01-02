import Assignments from "./Assignments"
import AssignmentForm from "./AssignmentForm"
import { getAssignments } from "../services/assignmentService"
import { useState, useEffect } from "react"


const AssignmentsPage = () => {
    const [assignmentsArray, setAssignmentsArray] = useState([])

    useEffect(() => {
        getAssignments().then((assignments) => {
            setAssignmentsArray(assignments)
        })
    }, [])

    return (
        <main>
            <div>
                <h1>Assignments</h1>
            </div>
            <h2>Add Assignment</h2>
                <AssignmentForm 
                    setAssignmentsArray={setAssignmentsArray} />
                <Assignments
                    assignmentsArray={assignmentsArray} />
        </main>

    )
}

export default AssignmentsPage





