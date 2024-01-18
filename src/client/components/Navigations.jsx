import {Link} from "react-router-dom"
// import { Container, Navbar, NavItem } from 'react-bootstrap';
import { Nav, Container, Row, Col } from "react-bootstrap";

function Navigations() {

  return (
    <>
      <Nav>
          <h1>Weatheria</h1>
          <Container className="nav_bar">
            
            <Row>
              
              <Col>
                <Nav.Item>
                  <Link to = "/" className="nav-link">TODAY</Link>
                </Nav.Item>
              </Col>

              <Col>
                <Nav.Item>
                  <Link to = "/forecast" className="nav-link">FORECAST</Link>
                </Nav.Item>
              </Col>

            </Row>

          </Container>
      </Nav>
    </>
  )

}

export default Navigations;