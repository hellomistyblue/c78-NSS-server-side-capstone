import Volunteers from "./Volunteers"
import VolunteerForm from "./VolunteerForm"
import { getVolunteers } from "../services/volunteerService"
import { useState, useEffect } from "react"

const VolunteersPage = () => {
    const [volunteersArray, setVolunteersArray] = useState([])

    useEffect(() => {
        getVolunteers().then((volunteers) => {
            setVolunteersArray(volunteers)
        })
    }, [])

    return (
        <main>
            <div>
                <h1>Volunteers</h1>
            </div>
            <VolunteerForm
                setVolunteersArray={setVolunteersArray} />
            <Volunteers
                volunteersArray={volunteersArray} />
        </main>

    )
}

export default VolunteersPage





