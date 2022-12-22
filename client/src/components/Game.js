import React, { useEffect, useState } from 'react';
import { Route, Link, Routes, useParams } from 'react-router-dom';
import { Button, ListGroup } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Comments from './Comments';
import { useOutletContext } from "react-router-dom";
import { set } from 'mongoose';

function Game(props) {

    const params = useParams();
    const [data, setData] = useState({});
    const [data0, setData0] = useState([]);
    // const [reviews, setReviews] = useState({reviews: []});
    const [options, setOptions] = useState(false);

    const [haveGame, setHaveGame] = useState(false);
    const [haveRev, setHaveRev] = useState(false);

    const [text, setText] = useState('');
    const [mark, setMark] = useState('5.5');
    const [edit, setEdit] = useState(false);

    const [user, setState] = useOutletContext();

    const handleAddClick = (evt) => {
        setEdit(!edit)
    }
    const handleModClick = (evt) => {
        setEdit(!edit)
        setText(getOwnerComment().content)
        setMark(getOwnerComment().rating)

    }
    const handleAddSaveClick = (evt) => {
        if(haveRev){

            setEdit(!edit)
            setHaveRev(true)
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function () {
                let r = this.response;
                let result = JSON.parse(r)
                if ('message' in result && result.message == 'Unauthorized') {
                    console.error("błąd biblioteki")
                    // document.location.reload()
                }
                else {
                    console.log(result)
                    if (result.message == 'ok') {
                        // window.location.href('/')
                        window.location.reload()
                        
                        // handleGame()
                    }
    
                }
    
            }
            xhttp.open("PUT", "/modifyReview", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.setRequestHeader("Charset", "UTF-8");
            console.warn(params.id)
            xhttp.send(JSON.stringify({ _id:getOwnerComment()._id  , _id_game: params.id, _id_user: null, content: text, rating: mark }));
        }
        else{

            setEdit(!edit)
            setHaveRev(true)
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function () {
                let r = this.response;
                let result = JSON.parse(r)
                if ('message' in result && result.message == 'Unauthorized') {
                    console.error("błąd biblioteki")
                    
                }
                else {
                    
                    if (result.message === 'ok') {
                        window.location.reload()
                    }
    
                }
    
            }
            xhttp.open("PUT", "/addReview", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.setRequestHeader("Charset", "UTF-8");
            console.warn(params.id)
            xhttp.send(JSON.stringify({ _id_game: params.id, _id_user: null, content: text, rating: mark }));
        }

    }


    const getOwnerComment = ()=>{
        let objIndex = data0.findIndex((obj => obj.flag == 'owner'));
        if(objIndex > -1)
        {
            return data0[objIndex]
        }
        return null
    }

    const handleDelClick = (evt) => {
        setEdit(false)
        console.warn('asddaads')
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            let r = this.response;
            let result = JSON.parse(r)
            if ('message' in result && result.message == 'Unauthorized') {
                console.error("błąd biblioteki")
                
            }
            else {
                console.log(result)
                if (result.message == 'ok') {
                    setHaveRev(false)
                    window.location.reload()
                }

            }

        }
        xhttp.open("DELETE", "/deleteReview", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Charset", "UTF-8");
        xhttp.send(JSON.stringify({ _id_game: params.id, _id_user: null, _id: getOwnerComment()._id }));
    }

    const handleLib = (evt) => {
        if (haveGame) {
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function () {
                let r = this.response;
                let result = JSON.parse(r)
                if ('message' in result && result.message == 'Unauthorized') {
                    console.error("błąd biblioteki")
                    
                }
                else {
                    console.log(result)
                    if (result.response === 'ok') {
                        setHaveGame(false)
                    }

                }

            }
            xhttp.open("POST", "/deleteLibrary", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.setRequestHeader("Charset", "UTF-8");
            console.warn(params.id)
            xhttp.send(JSON.stringify({ _id_game: params.id }));
        }
        else {
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function () {
                let r = this.response;
                let result = JSON.parse(r)
                if ('message' in result && result.message == 'Unauthorized') {
                    console.error("błąd biblioteki")
                    
                }
                else {
                    console.log(result)
                    if (result.response == 'ok') {
                        setHaveGame(true)
                    }

                }

            }
            xhttp.open("POST", "/addLibrary", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.setRequestHeader("Charset", "UTF-8");
            console.warn(params.id)
            xhttp.send(JSON.stringify({ _id_game: params.id }));
        }


    }

    const handleGame = (evt) => {

        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {

            let r = this.response;

            let TEMP = JSON.parse(r)
            TEMP.date_created = new Date(parseInt(TEMP._id.substring(0, 8), 16) * 1000).toISOString()
            let DATA = {}
            let DATA0 = []
            DATA['Tytuł'] = TEMP['title']
            DATA['Gatunek'] = TEMP['genre'].join(', ')
            DATA['Platforma'] = TEMP['platform'].join(', ')
            DATA['Developer'] = TEMP['developer'].join(', ')
            DATA['Wydawca'] = TEMP['publisher'].join(', ')
            DATA['Data wydania'] = TEMP['release_date']
            DATA['Data dodania do bazy'] = TEMP['date_created']
            DATA['Opis'] = TEMP['description']
            DATA['review_id'] = TEMP['review_id']
            DATA0 = TEMP['review_id']

            TEMP['review_id'].forEach(element => {
                if (element.flag == 'owner') {
                    setHaveRev(true)
                }
            });

            setData(DATA)
            setData0(DATA0)
            // setOptions(['a','b'])
        }
        xhttp.open("POST", "/game", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Charset", "UTF-8");

        let parameters = JSON.stringify({
            _id: params.id
        })
        xhttp.send(parameters);


        const xhttp2 = new XMLHttpRequest();
        xhttp2.onload = function () {
            let r = this.response;
            let result = JSON.parse(r)["priviledges"]

            if (result.toString() == 'user' || result.toString() == 'admin') {
                setOptions(true);

            }
        }
        xhttp2.open("GET", "/priviledges", true);
        xhttp2.send();

        const xhttp3 = new XMLHttpRequest();
        xhttp3.onload = function () {
            let r = this.response;
            let result = JSON.parse(r)
            if ('message' in result && result.message == 'Unauthorized') {
                console.error("błąd biblioteki")
            }
            else {

                result.games.forEach((e) => {
                    if (params.id === e._id) {
                        setHaveGame(true)
                    }
                })
            }

        }
        xhttp3.open("POST", "/library", true);
        xhttp3.send();

    }
    useEffect(() => {
        handleGame();
    }, [])
    return <div className="w-100 " style={{ height: "100vh", overflowY: "scroll" }}>
        <div className='bg-primary m-1'>Dane</div>
        <ListGroup className=''>
            {Object.entries(data).map(([k, v]) => {
                if (k != 'review_id') {
                    return (
                        <ListGroup.Item key={k}>{k} : {v}</ListGroup.Item>
                    )
                }

            })}
        </ListGroup>

        {options ?

            <div>
                <div className='bg-primary m-1' visible='false'>Opcje</div>
                <Button onClick={handleLib}>{haveGame ? 'Usuń z Biblioteki' : 'Dodaj do biblioteki'}</Button>
                {haveRev ?
                    <><Button onClick={handleModClick}>Modyfikuj komentarz</Button>
                        <Button onClick={handleDelClick}>Usuń komentarz</Button>
                    </>
                    :
                    <Button onClick={handleAddClick}>Dodaj komentarz</Button>
                }
                {edit ?
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicRange">
                            <Form.Label>Ocena</Form.Label>
                            <Form.Control type="range" min={1} max={10} value={mark} step={0.5} onChange={(evt) => setMark(evt.currentTarget.value)} />
                            <Form.Text className="text-muted">
                                {mark}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicArea">
                            <Form.Label>Opinia</Form.Label>
                            <Form.Control type="text" placeholder="Opinia" value={text} onChange={(evt) => setText(evt.currentTarget.value)} />
                        </Form.Group>
                        <Button onClick={handleAddSaveClick}>Zapisz</Button>
                    </Form>
                    :
                    null}
            </div>

            :
            null}

        <div className='bg-primary m-1'>Komentarze</div>
        <div >
            
            
            <Comments reviews={data0} />
            
            
        </div>

   

    </div>
}
export default Game;