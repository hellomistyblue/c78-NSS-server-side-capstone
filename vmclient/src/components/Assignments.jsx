import AssignmentItem from "./AssignmentItem"

const Assignments = ({assignmentsArray}) => {

    return (
        <section>
            <h2>Assignment List</h2>
            <h3>Assignments</h3>
            {assignmentsArray.length === 0 ? <p>Who are you adding to Assignments?</p> : assignmentsArray.map((assignmentsObj) => {
                return (
                    <AssignmentItem
                        assignments={assignmentsObj}
                        key={assignmentsObj.id}
                    />
                )
            })}
        </section>
    )
}

export default Assignments

