import React, { useEffect, useState } from 'react';
import {Route, Link, Routes, useParams} from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import Comments from './Comments';
import { useOutletContext } from "react-router-dom";

function Game (props) {
    const params = useParams();
    const [data, setData] = useState({});
    const [reviews, setReviews] = useState({});
    const [user, setState ] = useOutletContext();

    console.log(props)
    const handleGame=(evt)=>{
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {

            let r = this.response;
            console.log(JSON.parse(r))
            setData(JSON.parse(r))
            // setReviews(JSON.parse(r)['review_id'])
            setReviews(['a','b'])
            

        }
        xhttp.open("POST", "/game", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Charset", "UTF-8");
        
        let parameters = JSON.stringify({
                _id : params.id
            })
        xhttp.send(parameters);
    }
    useEffect(() => {
        handleGame()
        },[])
    return <div>
        
      
      
                    <ListGroup>
                        {Object.entries(data).map(([k,v])=>{
                            if(k!='review_id')
                            {
                                return(
                                    <ListGroup.Item key={k}>{k}:{v}</ListGroup.Item>
                                )
                            }
                            else{
                                
                                // v.forEach((item)=>{
                                //     let keys = []
                                //     Object.entries(item).map(([key,value])=>{
                                //         console.log(key,value)
                                          
                                //     })
                                // })

                                return(<Comments user={user} reviews={v}/>)

                                
                            }
                        })}


                        
                        

                    </ListGroup>      

    </div>
}
export default Game;