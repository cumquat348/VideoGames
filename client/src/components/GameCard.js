import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function GameCard(props) {
  return (
    <Link to={props.url}>
    <Card style={{ width: '18rem' }} className={"m-5"}>
      <Card.Img variant="top" src={props.img} style={{ width: '100%' }} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}
        
      </Card.Body>
    </Card>
    </Link>
  );
}

export default GameCard;