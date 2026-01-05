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
                    {assignmentsArray.length === 0 ? <tr><td>Who are you adding to Assignments?</td><td></td></tr> : assignmentsArray.map((assignmentsObj) => {
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

