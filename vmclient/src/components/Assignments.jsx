import AssignmentItem from "./AssignmentItem"

const Assignments = ({ assignmentsArray }) => {

    return (
        <section>
            <h2>Assignment List</h2>


            <table>
                <thead>
                    <tr>
                        <th>Assignment</th><th>Volunteers</th>
                    </tr>
                </thead>
                <tbody>
                    {assignmentsArray.length === 0 ? <p>Who are you adding to Assignments?</p> : assignmentsArray.map((assignmentsObj) => {
                        return (
                            <AssignmentItem
                                assignments={assignmentsObj}
                                key={assignmentsObj.id}
                            />
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}








export default Assignments

