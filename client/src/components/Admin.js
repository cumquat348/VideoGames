import React from 'react';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Users from './Users';
import Games from './Games';

function Admin () {
    return <div className='w-100'>
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Użytkownicy</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Gry</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <Users/>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <Games/>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>


  

    </div>
}
export default Admin;