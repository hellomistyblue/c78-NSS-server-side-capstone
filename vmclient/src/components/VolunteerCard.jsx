import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { getAssignments } from '../services/assignmentService'
import { getAssignmentsForVolunteer } from '../services/volunteerAssignmentsService'
import { createVolunteersForAssignment } from '../services/volunteerAssignmentsService'
import { deleteAssignmentVolunteer } from '../services/volunteerAssignmentsService'
import { getVolunteerStatuses } from '../services/statusService'
import { updateVolunteerStatus } from '../services/volunteerService'


const VolunteerCard = ({ volunteer }) => {
    const [assignmentsArray, setAssignmentsArray] = useState([])
    const [assignmentsForVolunteerArray, setAssignmentsForVolunteersArray] = useState([])
    const [selectedAssignments, setSelectedAssignments] = useState([])
    const [statusArray, setStatusArray] = useState([])
    const [selectedStatus, setSelectedStatus] = useState(null)

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

    useEffect(() => {
        getVolunteerStatuses().then((statuses) => {
            setStatusArray(statuses)
        })
    }, [])

    useEffect(() => {
        if (volunteer.status_id && statusArray.length > 0) {
            const currentStatus = statusArray.find(status => status.id === volunteer.status_id)
            if (currentStatus) {
                setSelectedStatus({
                    value: currentStatus.id,
                    label: currentStatus.type
                })
            }
        }
    }, [volunteer.status_id, statusArray])

    const assignmentOptions = assignmentsArray.map(assignment => ({
        value: assignment.id,
        label: assignment.name
    }))

    const statusOptions = statusArray.map(status => ({
        value: status.id,
        label: status.type
    }))


    const StatusSelect = () => (
        <Select
            options={statusOptions}
            value={selectedStatus}
            onChange={(selectedOption) => {
                
                updateVolunteerStatus(volunteer.id, selectedOption.value).then(() => {
                 setSelectedStatus(selectedOption)
                })
            }}
        />
    )
    
    const AssignmentsMultiSelect = () => (
        <Select
            options={assignmentOptions}
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
            <StatusSelect />
            {volunteer?.status_id  === 1 && <AssignmentsMultiSelect />}
        </div>
    )
}

export default VolunteerCard