import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { getVolunteers } from '../services/volunteerService'
import { getVolunteersForAssignment } from '../services/volunteerAssignmentsService'
import { createVolunteersForAssignment } from '../services/volunteerAssignmentsService'
import { deleteVolunteerAssignment } from '../services/volunteerAssignmentsService'

const AssignmentItem = ({ assignments }) => {
    const [volunteersArray, setVolunteersArray] = useState([])
    const [volunteersForAssignmentArray, setVolunteersForAssignmentArray] = useState([])
    const [selectedVolunteers, setSelectedVolunteers] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        getVolunteers().then((volunteers) => {
            setVolunteersArray(volunteers)
        })
    }, [])

    useEffect(() => {
        getVolunteersForAssignment(assignments.id).then((volunteers) => {
            setVolunteersForAssignmentArray(volunteers)
        })
    }, [assignments.id])

    useEffect(() => {
        const selectedOptions = volunteersForAssignmentArray.map(volunteerAssignment => ({
            value: volunteerAssignment.volunteer_id,
            label: volunteerAssignment.volunteer_name
        }))
        setSelectedVolunteers(selectedOptions)
    }, [volunteersForAssignmentArray])

    const options = volunteersArray.map(volunteer => ({
        value: volunteer.id,
        label: volunteer.full_name
    }))

    const VolunteerMultiSelect = () => (
        <Select
            options={options}
            isMulti
            classNamePrefix="react-select"
            value={selectedVolunteers}
            onChange={(selectedOptions) => {
                const newArray = selectedOptions || []
                const addedVolunteers = newArray.filter(newVolunteer =>
                    !selectedVolunteers.some(prevVolunteer => prevVolunteer.value === newVolunteer.value)
                )
                const removedVolunteers = selectedVolunteers.filter(prevVolunteer =>
                    !newArray.some(newVolunteer => newVolunteer.value === prevVolunteer.value)
                )

                if (addedVolunteers.length > 0) {
                    addedVolunteers.forEach(volunteer => {
                        createVolunteersForAssignment({
                            assignment_id: assignments.id,
                            volunteer_id: volunteer.value
                        }).then(() => {
                            setErrorMessage("")
                            getVolunteersForAssignment(assignments.id).then((volunteers) => {
                                setVolunteersForAssignmentArray(volunteers)
                            })
                        }).catch((error) => {
                            setErrorMessage('Error: ${volunteer.label} is already assigned to this role')
                            console.error("Assignment error:", error)
                        })
                    })
                }
                if (removedVolunteers.length > 0) {
                    removedVolunteers.forEach(volunteer => {
                        const volunteerAssignment = volunteersForAssignmentArray.find(
                            volunteerAssignment => volunteerAssignment.volunteer_id === volunteer.value
                        )

                        if (volunteerAssignment) {
                            deleteVolunteerAssignment(volunteerAssignment.id).then(() => {
                                getVolunteersForAssignment(assignments.id).then((volunteers) => {
                                    setVolunteersForAssignmentArray(volunteers)
                                })
                            })
                        }
                    })
                }
                setSelectedVolunteers(newArray)
            }}
        />)

    return (
        <tr>
            <td data-label="Assignment">
                <p>{assignments?.name}</p>
            </td>
            <td data-label="Volunteers"> 
                <VolunteerMultiSelect />
            </td>
        </tr>
    )

}

export default AssignmentItem



