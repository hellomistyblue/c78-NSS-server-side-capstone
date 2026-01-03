import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { getAssignments } from '../services/assignmentService'
import { getAssignmentsForVolunteer } from '../services/volunteerAssignmentsService'
import { createVolunteersForAssignment } from '../services/volunteerAssignmentsService'
import { deleteAssignmentVolunteer } from '../services/volunteerAssignmentsService'


const VolunteerCard = ({ volunteer }) => {
    const [assignmentsArray, setAssignmentsArray] = useState([])
    const [assignmentsForVolunteerArray, setAssignmentsForVolunteersArray] = useState([])
    const [selectedAssignments, setSelectedAssignments] = useState([])

    useEffect(() => {
        getAssignments().then((assignments) => {
            setAssignmentsArray(assignments)
        })
    }, [])

    useEffect(() => {
        getAssignmentsForVolunteer(volunteer.id).then((assignments) => {
            setAssignmentsForVolunteersArray(assignments)
        })
    }, [volunteer.id])

    useEffect(() => {
        const selectedOptions = assignmentsForVolunteerArray.map(assignmentVolunteer => ({
            value: assignmentVolunteer.assignment_id,
            label: assignmentVolunteer.assignment_name
        }))
        setSelectedAssignments(selectedOptions)
    }, [assignmentsForVolunteerArray])

    const options = assignmentsArray.map(assignment => ({
        value: assignment.id,
        label: assignment.name
    }))



    const MyComponent = () => (
        <Select
            options={options}
            isMulti
            value={selectedAssignments}
            onChange={(selectedOptions) => {
                const newArray = selectedOptions || []
                const addedAssignments = newArray.filter(newAssignment =>
                    !selectedAssignments.some(prevAssignment => prevAssignment.value === newAssignment.value)
                )
                const removedAssignments = selectedAssignments.filter(prevAssignment =>
                    !newArray.some(newAssignment => newAssignment.value === prevAssignment.value)
                )

                if (addedAssignments.length > 0) {
                    addedAssignments.forEach(assignment => {
                        createVolunteersForAssignment({
                            assignment_id: assignment.value,
                            volunteer_id: volunteer.id
                        })
                    })
                }
                if (removedAssignments.length > 0) {
                    removedAssignments.forEach(assignments => {
                        const assignmentVolunteer = assignmentsForVolunteerArray.find(
                            assignmentVolunteer => assignmentVolunteer.assignment_id === assignments.value
                        )

                        if (assignmentVolunteer) {
                            deleteAssignmentVolunteer(assignmentVolunteer.id).then(() => {
                                getAssignmentsForVolunteer(assignments.id).then((assignments) => {
                                    setAssignmentsForVolunteersArray(assignments)
                                })
                            })
                        }
                    })
                }
                setSelectedAssignments(newArray)
            }}
        />)

    return (
        <div>
            <h2>{volunteer?.full_name}</h2>
            <p>{volunteer?.phone}</p>
            <p>{volunteer?.email}</p>
            <h3>Assignments</h3>

            {assignmentsForVolunteerArray.map((assignmentObj) => {
                return (
                    <div
                        key={assignmentObj.id}
                    >
                        {assignmentObj.assignment_name}
                    </div>
                )
            })}
            <MyComponent />
        </div>
    )
}

export default VolunteerCard