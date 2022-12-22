import React, { useEffect, useState } from 'react';
import {Route, Link, Routes, useParams} from 'react-router-dom';
import { Button, ListGroup } from 'react-bootstrap';
import { ReactDOM } from 'react';
import ReviewCard from './ReviewCard';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import Collapse from 'react-bootstrap/Collapse';

function UserModal(props) {
  const [priv, setPriv] = useState("1");
  const [block, setBlock] = useState(false);
  const [bdate, setBDate] = useState(Date.now()-( 3600 * 1000 * 24));
  const modUser = ()=>{
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {

        let r = this.response;

        let response = JSON.parse(r)
        
        if("message" in response && response.message == "ok" )
        {
          window.location.reload()
        }
        
    }
    xhttp.open("PUT", "/modifyUser", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Charset", "UTF-8");
    
    let parameters = JSON.stringify({
      _id: props._id,
      privileges : priv,
      blocked : block,
      blockade_expiration_date : bdate
  })
    xhttp.send(parameters)
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modyfikacja
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
      <Form>
      <Form.Group className="mb-3" >
        <Form.Label>Uprawnienia</Form.Label>
        {/* <Form.Control type="number" placeholder="Uprawnienia" /> */}
        <Form.Select id="Select" type="number" value={priv} onChange={(evt)=>setPriv(evt.target.value)}>
            <option>1</option>
            <option>2</option>
          </Form.Select>
        <Form.Text className="text-muted">
          1 - zwykły użytkownik, 2- administrator
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Blokada" checked={block} onClick={()=>setBlock(!block)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label>Data wygaśnięcia blokady</Form.Label>
        <Form.Control type="date" placeholder="data" value={bdate} onChange={(evt)=>setBDate(evt.target.value)}/>
      </Form.Group>
      
      <Button variant="primary"  onClick={modUser}>
        Zapisz
      </Button>
    </Form>


      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Zamknij</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default function Users(props) {            
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [userid, setUid] = useState(null);


    const deleteUser = (id)=>{

      const xhttp = new XMLHttpRequest();
      xhttp.onload = function () {

          let r = this.response;

          let response = JSON.parse(r)
          
          if("message" in response && response.message == "ok" )
          {
            window.location.reload()
          }
          
      }
      xhttp.open("DELETE", "/deleteUser", true);
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.setRequestHeader("Charset", "UTF-8");
      console.log(id)
      let parameters = JSON.stringify({
        _id: id
    })
      xhttp.send(parameters)

    }
    const loadUsers = (evt)=>{
      const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {

            let r = this.response;

            let TEMP = JSON.parse(r)
            
            setUsers(JSON.parse(r).docs)
            
        }
        xhttp.open("POST", "/users", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Charset", "UTF-8");

        xhttp.send();
    }
    
    useEffect(() => {
      loadUsers();
    }, [])
    return(
      <>
            <UserModal
            _id = {userid}
        show={modalShow}
        onHide={() => setModalShow(false)}/>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Nick</th>
            <th>Priviledges</th>
            <th>Blocked</th>
            <th>Blockade expiration date</th>
            <th>Functions</th>
          </tr>
        </thead>
        <tbody>
            {
                users.map((user,i)=>{
                  return(
                  
                  <tr key={user.id}>
                    <td>{i+1}</td>
                    <td>{user.nick}</td>
                    <td>{user.email}</td>
                    <td>{user.privileges}</td>
                    <td>{user.blocked.toString()}</td>
                    <td>{user.blockade_expiration_date}</td>
                    <td><Button className='bg-warning' onClick={()=>{setModalShow(true);setUid(user._id)}}>Modyfikuj</Button><Button className='bg-danger' onClick={()=>deleteUser(user._id)}>Usuń</Button></td>
                  </tr>
                  )
                })
            }
         
        </tbody>
      </Table>
      </>
    )
  }
  