import Button from 'react-bootstrap/esm/Button';
import React from 'react';
import GameCard from './GameCard'

class Top extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            games: [],
            page : 0,
            maxreached: false
        }
        function isJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
        this.clearPage=()=>{
            
        }

        this.handleRefresh = ()=>{

        }
        this.fetchGames = (callback) => {
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function () {
                let r = this.response;
                let result = JSON.parse(r)
                
                callback(result)
            }
            xhttp.open("POST", "/search", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.setRequestHeader("Charset", "UTF-8");
            var params = {title: this.state.title, page: this.state.page}

            var parameters =JSON.stringify( {...params})
                
            xhttp.send(parameters);
        }

        this.loadMore=(ev)=>{
            // console.log(this.state.page)
            if(!this.state.maxreached)
            {
            let n = this.state.page + 1
            this.setState({page: n },()=>{
                this.fetchGames((data)=>{
                    if(data == '')
                    {
                        this.setState({maxreached:true})
                        
                    }
                    else{
                    let g = this.state.games
                    console.log(data)
                    this.setState({games: [...g, ...data]})
                    }
                })
            }) 
        }
        }
    }
    componentDidMount() {
        this.fetchGames((data) => {
            console.log(data)
            this.setState({
                games: data,
                title: ''
            });
        })



    }
    render(props) {
        return (
            <div className="w-100 " style={{height: "100vh", overflowY : "scroll"}}>


                
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 ">
                        {this.state.games.map((game, indx) => {
                            return (
                                <div key={indx} className='col'>
                                <GameCard   name={game.title} img={"https://play-lh.googleusercontent.com/5LIMaa7WTNy34bzdFhBETa2MRj7mFJZWb8gCn_uyxQkUvFx_uOFCeQjcK16c6WpBA3E"} />
                                </div>
                            )
                        })}
                    </div>
                    
                </div>
                <Button disabled={this.state.maxreached} className='w-25'onClick={this.loadMore}>Więcej </Button>
            </div>
        );
    }
}
export default Top;