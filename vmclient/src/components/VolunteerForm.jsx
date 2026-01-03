import { useState, useEffect } from "react"
import { createVolunteer } from "../services/volunteerService"
import { getVolunteers } from "../services/volunteerService"


const VolunteerForm = ({ setVolunteersArray }) => {
    const initialState = {
        status_id: 1,
        full_name: "",
        phone: "",
        email: "",
    }
    const [volunteer, setVolunteer] = useState(initialState)
    useEffect(() => {

        setVolunteer(prevVolunteer => ({
            ...prevVolunteer,

        }))
    }, [])
    const handleFullNameChange = (event) => {
        setVolunteer({
            ...volunteer,           // Keep all existing properties
            full_name: event.target.value  // Update just this one
        })
    }
    const handleEmailChange = (event) => {
        setVolunteer({
            ...volunteer,           // Keep all existing properties
            email: event.target.value  // Update just this one
        })
    }
    const handlePhoneChange = (event) => {
        setVolunteer({
            ...volunteer,           // Keep all existing properties
            phone: event.target.value  // Update just this one
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
        setVolunteer(prevVolunteer => ({
            ...prevVolunteer,
        }))
        await createVolunteer(volunteer)
        setVolunteer(initialState)
        getVolunteers().then((volunteers) => {
            setVolunteersArray(volunteers)
        })
    }

    const validateForm = () => {
        const missingFields = []

        if (!volunteer.full_name.trim()) {
            missingFields.push("Full Name")
        }
        if (!volunteer.email) {
            missingFields.push("Email")
        }
        if (!volunteer.phone) {
            missingFields.push("Phone")
        }

        return missingFields
    }

    return (
        <div>
            <form className="form-add-volunteer">
                <h2>Add Volunteer</h2>
                <div className="form-info-fieldsets">
                    <fieldset>
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            id="fullName"
                            type="text"
                            value={volunteer.full_name}
                            onChange={handleFullNameChange}
                            placeholder="John Doe"
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            value={volunteer.email}
                            onChange={handleEmailChange}
                            placeholder="j.doe@email.com"
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            id="phoneNumber"
                            type="text"
                            value={volunteer.phone}
                            onChange={handlePhoneChange}
                            placeholder="(615) 202-4727"
                        />
                    </fieldset>
                </div>
                <div className="form-button">
                    <button
                        onClick={handleClick}
                    >Add Volunteer</button>
                </div>
            </form>
        </div>
    )
}
export default VolunteerForm

