import { getVolunteers } from "../services/volunteerService"
import { useState, useEffect } from "react"
import VolunteerCard from "./VolunteerCard"

const Volunteers = () => {
    const [volunteersArray, setVolunteersArray] = useState([])
    useEffect(() => {
        getVolunteers().then((volunteers) => {
            setVolunteersArray(volunteers)
        })
    }, [])

    return (
        <section>
            {volunteersArray.length === 0 ? <p>Who are you adding to your Volunteer Team?</p> : volunteersArray.map((volunteerObj) => {
                return (
                    <VolunteerCard
                        volunteer={volunteerObj}
                        key={volunteerObj.id}
                    />
                )
            })}
        </section>
    )
}

export default Volunteers

