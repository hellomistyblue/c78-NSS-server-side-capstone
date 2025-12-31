import { Route, Routes, Outlet } from "react-router-dom"
import Nav from "/src/components/Nav"
import VolunteersPage from "/src/components/VolunteersPage"
import AssignmentsPage from "/src/components/AssignmentsPage"
import { useState, useEffect } from 'react'



export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  return (
    <Routes>
      <Route path="/" element={<>
        <Nav />
        <main><Outlet /></main>
      </>} >
        <Route index element={<VolunteersPage currentUserId={currentUser?.id} />} />
        <Route path="/assignments" element={<AssignmentsPage currentUserId={currentUser?.id} />} />
      </Route>
    </Routes>
  )
}