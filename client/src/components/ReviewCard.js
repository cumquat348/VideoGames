import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
function ReviewCard(props) {
const change = (ev)=>{
    document.getElementsByClassName('default')[0].classList.add('d-none')
    document.getElementsByClassName('change')[0].classList.remove('d-none')  
    document.getElementsByClassName('newdesc')[0].classList.remove('d-none')  
    document.getElementsByClassName('newdesc')[0].value = props.description
}
const accept = (ev)=>{
    document.getElementsByClassName('change')[0].classList.add('d-none')
    document.getElementsByClassName('default')[0].classList.remove('d-none')  
    document.getElementsByClassName('newdesc')[0].classList.add('d-none')  

    const xhttp = new XMLHttpRequest();
          xhttp.onload = function () {
            let r = this.response;
            let result = JSON.parse(r)["priviledges"]
            // callback(result.toString())
          }
          xhttp.open("GET", "/priviledges", true);
          xhttp.send();
          
}
const back = (ev)=>{
    document.getElementsByClassName('change')[0].classList.add('d-none')
    document.getElementsByClassName('default')[0].classList.remove('d-none')  
    document.getElementsByClassName('newdesc')[0].classList.add('d-none')  
}
  return (
    
    <Card style={{ width: '18rem' }} className={"m-5"}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
            {`Ocena: ${props.mark} \n Opis: ${props.description}`}
        </Card.Text>

        <Form.Control
        type="text"
        className="d-none newdesc"
        />

        {
            (props.title == 'Twoja opinia')?
            <>
            <div className='default'>
            <Button onClick={change}>Zmień</Button>
            <Button>Usuń</Button>
            </div>
            <div className='change d-none'>
            <Button onClick={accept}>Ok</Button>
            <Button onClick={back}>Anuluj</Button>
            </div>
            
            </>
        :
        null
        }
        

      </Card.Body>
    </Card>
    
  );
}

export default ReviewCard;