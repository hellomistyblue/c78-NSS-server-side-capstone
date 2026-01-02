import VolunteerCard from "./VolunteerCard"

const Volunteers = ({volunteersArray}) => {
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

