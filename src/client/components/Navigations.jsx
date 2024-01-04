import {Link} from 'react-router-dom'

function Navigations() {

  return (
    <>
      <nav>
        <ul>
          <div>
            <h1>Weatheria</h1>
          </div>
          <div className="nav-items">
            <li><Link to = '/'>TODAY</Link></li>
            <li><Link to = '/forecast'>3-DAY</Link></li>
            <li><Link to = '/history'>HISTORY</Link></li>
          </div>
        </ul>
      </nav>
    </>
  )

}

export default Navigations;