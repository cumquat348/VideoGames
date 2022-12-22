import React from 'react';
import GameCard from './GameCard'

class Library extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: []
        }
        function isJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
        this.fetchGames = (callback, params) => {
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function () {
                let r = this.response;
                let result = JSON.parse(r)
                if ('message' in result && result.message == 'Unauthorized') {
                    window.location.replace('/')
                }
                
                callback(result.games)
            }
            xhttp.open("POST", "/library", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.setRequestHeader("Charset", "UTF-8");
            var parameters = null
            if (params !== null) {
                parameters = JSON.stringify(params)
                if (!isJsonString(parameters)) {
                    parameters = null
                }
            }
            xhttp.send(parameters);
        }
    }
    componentDidMount() {
        this.fetchGames((data) => {

            this.setState({
                games: data
            });
        }, { sort: ['name', 'asc'] })
    }
    render(props) {
        return (
            <div className="w-100 " style={{ height: "100vh", overflowY: "scroll" }}>
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 justify-content-center">
                        {this.state.games.map((game, indx) => {
                            return (
                                <div key={indx} className='col'>
                                    <GameCard url={'/game/' + game._id} name={game.title} img={"https://play-lh.googleusercontent.com/5LIMaa7WTNy34bzdFhBETa2MRj7mFJZWb8gCn_uyxQkUvFx_uOFCeQjcK16c6WpBA3E"} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
export default Library;