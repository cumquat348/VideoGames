import React, { useEffect, useState } from 'react';
import {Route, Link, Routes, useParams} from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import { ReactDOM } from 'react';
import ReviewCard from './ReviewCard';



export default function Comments(props) {            
    var cards = [];
    console.log(props)
    for(let i =0;i<props.reviews.length;++i)
    {
        let temp = <ListGroup key={''+i+0} className={props.reviews[i]['flag']=='owner'?'bg-success':'bg-danger'}>
        <ListGroup.Item key={''+i+1} className={props.reviews[i]['flag']=='owner'?'bg-success':null}> Użytkownik : {props.reviews[i]['_id_user']} </ListGroup.Item>
        <ListGroup.Item key={''+i+2} className={props.reviews[i]['flag']=='owner'?'bg-success':null}> Ocena : {props.reviews[i].rating}</ListGroup.Item>
        <ListGroup.Item key={''+i+3} className={props.reviews[i]['flag']=='owner'?'bg-success':null}> Opis : {props.reviews[i].content}</ListGroup.Item>
    </ListGroup>
        cards.push(temp)
    }
    return(
        <div>
            {cards}
        </div>
    )
  }
  