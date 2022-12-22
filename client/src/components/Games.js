import React, { useEffect, useState } from 'react';
import {Route, Link, Routes, useParams} from 'react-router-dom';
import { Button, ListGroup } from 'react-bootstrap';
import { ReactDOM } from 'react';
import ReviewCard from './ReviewCard';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import Collapse from 'react-bootstrap/Collapse';

function GameModal(props) {
  const [gameX, setGameX] = useState(props.game_doc);

  const [title, setTitle] = useState();
  const [genre, setGenre] = useState();
  const [publisher, setPublisher] = useState();
  const [developer, setDeveloper] = useState();
  const [platform, setPlatform] = useState();
  const [release_date, setReleaseDate] = useState();
  

  const addGame = ()=>{
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {

        let r = this.response;

        let response = JSON.parse(r)
        
        if("message" in response && response.message == "ok" )
        {
          window.location.reload()
        }
        
    }
    xhttp.open("PUT", "/addGame", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Charset", "UTF-8");
    
    let parameters = JSON.stringify(
        {title:title,genre:[genre],publisher:[publisher],developer:[developer],platform:[platform],release_date:release_date}
  )
    xhttp.send(parameters)
  }

  const modGame = ()=>{
    
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
    //   _id: props._id,
    //   privileges : priv,
    //   blocked : block,
    //   blockade_expiration_date : bdate
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
          Gra
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
      <Form>
      
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Tytuł</Form.Label>
        <Form.Control type="text" placeholder="Tytuł" value={title} onChange={(ev)=>{setTitle( ev.target.value)}} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicGenre">
        <Form.Label>Gatunek</Form.Label>
        <Form.Control type="text" placeholder="Gatunek"  value={genre} onChange={(ev)=>{setGenre( ev.target.value)}}  />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPublisher">
        <Form.Label>Wydawca</Form.Label>
        <Form.Control type="text" placeholder="Wydawca"  value={publisher} onChange={(ev)=>{setPublisher( ev.target.value)}}  />
      </Form.Group>
      


      <Form.Group className="mb-3" controlId="formBasicDeveloper">
        <Form.Label>Developer</Form.Label>
        <Form.Control type="text" placeholder="Developer"  value={developer} onChange={(ev)=>{setDeveloper(ev.target.value)}}  />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicPlatform">
        <Form.Label>Platforma</Form.Label>
        <Form.Control type="text" placeholder="Platforma"  value={platform} onChange={(ev)=>{setPlatform(ev.target.value)}}  />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicReleased">
        <Form.Label>Premiera</Form.Label>
        <Form.Control type="date" placeholder="Premiera"  value={release_date} onChange={(ev)=>{setReleaseDate( ev.target.value)}}  />
      </Form.Group>

      <Button variant="primary"  onClick={addGame}>
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


export default function Games(props) {            
    const [games, setGames] = useState([]);
    const [open, setOpen] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [game_doc, setGameDoc] = useState({});

    const deleteGame = (id)=>{

      const xhttp = new XMLHttpRequest();
      xhttp.onload = function () {

          let r = this.response;

          let response = JSON.parse(r)
          
          if("message" in response && response.message == "ok" )
          {
            window.location.reload()
          }
          
      }
      xhttp.open("DELETE", "/deleteGame", true);
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.setRequestHeader("Charset", "UTF-8");
      console.log(id)
      let parameters = JSON.stringify({
        _id: id
    })
      xhttp.send(parameters)

    }
    const loadGames = (evt)=>{
      const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {

            let r = this.response;

            let TEMP = JSON.parse(r)
            
            setGames(JSON.parse(r).games)
            
        }
        xhttp.open("POST", "/allgames", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Charset", "UTF-8");

        xhttp.send();
    }
    
    useEffect(() => {
      loadGames();
    }, [])
    return(
      <>
            <GameModal
            game_doc = {game_doc}
        show={modalShow}
        onHide={() => setModalShow(false)}/>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Publisher</th>
            <th>Developer</th>
            <th>Platform</th>
            <th>Released</th>
            <th>Functions<Button onClick={()=>setModalShow(true)}>Dodaj</Button></th>
          </tr>
        </thead>
        <tbody>
            {
                games.map((game,i)=>{
                  return(
                  
                  <tr key={game.id}>
                    <td>{i+1}</td>
                    <td>{game.title}</td>
                    <td>{game.genre.join(", ")}</td>
                    <td>{game.publisher.join(", ")}</td>
                    <td>{game.developer.join(", ")}</td>
                    <td>{game.platform.join(", ")}</td>
                    <td>{game.release_date}</td>
                    <td><Button className='bg-warning' onClick={()=>{setModalShow(true);setGameDoc(game)}}>Modyfikuj</Button><Button className='bg-danger' onClick={()=>deleteGame(game._id)}>Usuń</Button></td>
                  </tr>
                  )
                })
            }
         
        </tbody>
      </Table>
      </>
    )
  }
  