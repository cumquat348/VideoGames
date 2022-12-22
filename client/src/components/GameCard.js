import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function GameCard(props) {
  return (
    <Card  className={"m-auto p-4"}>
        <Link to={props.url}>
        <Card.Img variant="top" src={props.img} style={{ width: '100%' }} />
        
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>


        </Card.Body>
        </Link>
      </Card>
      
  );
}

export default GameCard;