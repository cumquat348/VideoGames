import React, { useEffect, useState } from 'react';
import {Route, Link, Routes, useParams} from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import { ReactDOM } from 'react';
import ReviewCard from './ReviewCard';

class Comments extends React.Component {                
    constructor(props) {
        super(props)
    
    }
    
      
    render(props)
        {
            var cards = [];
            this.props.reviews.forEach((item,idx)=>{
                
                var card = [];
                
                Object.entries(item).map(([key,value],i)=>{
                    card.push(<ListGroup.Item key={i}>{key}: {value}</ListGroup.Item>)
                })
                cards.push(<ReviewCard key={idx} title={item._id_user=='owner'?'Twoja opinia':item._id_user} mark={item.rating} description={item.content}/>)
            })
            
        
            return(
                <div className='w-100 container'>
                    Komentarze:
                    <div className='row'>{cards}</div>
                    
                </div>
            )
        }
}
export default Comments;