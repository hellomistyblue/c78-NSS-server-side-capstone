

const VolunteerCard = ({volunteer}) => {
    return (
        <div>
            <h2>{volunteer?.full_name}</h2>
            <p>{volunteer?.phone}</p>
            <p>{volunteer?.email}</p>
            <h3>Assignments</h3>
        </div>
    )
}

export default VolunteerCard