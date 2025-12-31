import ReactDOM from "react-dom/client"
import './index.css'
import { App } from './App.jsx'
import { BrowserRouter } from "react-router-dom"

//assigns container to <div id=(root)>
const container = document.getElementById("root")
//assigns root to ReactDOM using container
const root = ReactDOM.createRoot(container)
//tells root to render everything inside ()
root.render(
  //use <BrowserRouter> to control what gets displayed on urls
  <BrowserRouter>
  {/* <App /> is the component being used to display all components */}
    <App /> 
  </BrowserRouter>
)
