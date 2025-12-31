import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"


const Nav = () => {
    const navigate = useNavigate()

    return (
        <nav>
            <ul className="nav">
                <li className="nav-item">
                    <Link to='/'>Volunteers</Link>
                </li>
                <li className="nav-item">
                    <Link to="/assignments">Assignments</Link>
                </li>
            </ul>
            {localStorage.getItem("user") ? (
                <div className="nav-item nav-logout">
                    <Link
                        className="nav-link"
                        to=""
                        onClick={() => {
                            localStorage.removeItem("user")
                            navigate("/", { replace: true })
                        }}
                    >
                        Logout
                    </Link>
                </div>
            ) : (
                ""
            )}
        </nav>
    )
}

export default Nav