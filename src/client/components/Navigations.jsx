import {Link} from "react-router-dom"

function Navigations() {

  return (
    <>
      <nav>
        <ul>
          <div>
            <h1>Weatheria</h1>
          </div>
          <div className="nav-items">
            <li><Link to = "/" className="nav-link">TODAY</Link></li>
            <li><Link to = "/forecast" className="nav-link">FORECAST</Link></li>
            <li><Link to = "/history" className="nav-link">HISTORY</Link></li>
          </div>
        </ul>
      </nav>
    </>
  )

}

export default Navigations;