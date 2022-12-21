import React from 'react';
import GameCard from './GameCard';
import Button from 'react-bootstrap/esm/Button';
import Collapse from 'react-bootstrap/Collapse';
import { Form } from 'react-bootstrap';

class Browse extends React.Component {
    constructor(props) {
        super(props);
        this.genres = ['racing', 'action', 'platform', 'arcade']
        this.platforms = ['pc', 'xbox', 'ps', 'gameboy']


        this.state = {
            games: [],
            filtersOpen: false,
            // f_genre : [],
            f_serie : '',
            f_platform : '',
            f_release : ['',''],
            f_added : ['', ''],
            title : '',
            filters: {},
            sorting : {'name': 1},
            
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
        this.handleSearch = (event) => {
            console.log(event.target.value);
            this.setState({page:0,maxreached:false,title:event.target.value})
            this.fetchGames((data) => {
                console.log(data)
                this.setState({
                    games: data
                });
            }, { title: event.target.value })
        }
        this.handleGenre= (ev) => {
            console.log(ev.target.value)
            let tmp = this.state.f_genre
            tmp[ev.target.value] = ev.target.checked
            this.setState({f_genre : tmp});
        }
        this.handleSerie= (ev) => {
            this.setState({f_serie : ev.target.value});
        }
        this.handlePlatform= (ev) => {
            this.setState({f_platform : ev.target.value});
        }
        this.handleReleased= (ev) => {
            // this.setState({f_release : ev.target.value});
            
            this.setState({f_release : [document.getElementsByName('realesefrom')[0].value, document.getElementsByName('realeseto')[0].value]});
            
        }
        this.handleAdded= (ev) => {
            // this.setState({f_added : ev.target.value});
            this.setState({f_added : [document.getElementsByName('addedfrom')[0].value, document.getElementsByName('addedto')[0].value]});
        }
        this.handleRefresh = () => {

        }
        this.apply = (ev)=>{
            let f_genre = Object.entries(this.state.f_genre).filter(([key,value])=>value != false)
                let ff = {}
                
                f_genre.forEach( ([k,v]) => {
                    if("genre" in ff ){
                        ff["genre"].push(k)
                    }
                    else{
                        ff["genre"] = [k]
                    }  
                })

                if(typeof this.state.title === 'string' &&  this.state.title.length > 0)
                {
                    ff["title"] = this.state.title
                }
                if(typeof this.state.f_serie === 'string' &&  this.state.f_serie.length > 0)
                {
                    ff["series"] = this.state.f_serie
                }
                if(typeof this.state.f_platform === 'string' &&  this.state.f_platform.length > 0)
                {
                    ff["platform"] = this.state.f_platform
                }

                if(
                    (typeof this.state.f_release[0] === 'string' &&  this.state.f_release[0].length > 0) ||(typeof this.state.f_release[1] === 'string' &&  this.state.f_release[1].length > 0) 
                    )
                {
                    ff["release_date"] = this.state.f_release
                }

                if(
                    (typeof this.state.f_added[0] === 'string' &&  this.state.f_added[0].length > 0) ||(typeof this.state.f_added[1] === 'string' &&  this.state.f_added[1].length > 0) 
                    )
                {
                    ff["added_date"] = this.state.f_added
                }
                
                this.fetchGames((data) => {
                 
                    let test = data.concat(data)
                    let r = test.concat(test)
                    this.setState({
                        games: r
                    });
                }, ff)
                
        }
        this.fetchGames = (callback, params) => {
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function () {
                let r = this.response;
                let result = JSON.parse(r)

                callback(result)
            }
            xhttp.open("POST", "/search", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.setRequestHeader("Charset", "UTF-8");
            // var parameters = null
            // if (params !== null) {
            //     parameters = JSON.stringify(params)
            //     if (!isJsonString(parameters)) {
            //         parameters = null
            //     }
            // }
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
    componentDidMount() 
    {
        this.fetchGames((data) => {
            console.log(data)
            let test = data.concat(data)
            let r = test.concat(test)
            this.setState({
                games: r
            });
        }, null)
        
        let f_genre = {}
        this.genres.map((g, i) => {
            f_genre[g]= false
        })
        this.setState({f_genre: f_genre})
    }
    render(props) {
        return (
            <div className="w-100 " style={{ height: "100vh", overflowY: "scroll" }}>

                <div className='py-3 mb-3 '>
                    <div className="d-flex align-items-center">
                        <div className="w-100 me-3 m-1 " role="search">

                            <input onChange={this.handleSearch} type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                            <Button className='w-25'
                                onClick={() => { this.setState({ filtersOpen: !this.state.filtersOpen }) }}
                                aria-controls="example-collapse-text"
                                aria-expanded={this.state.filtersOpen}
                            >Filtry </Button>
                        </div>

                    </div>

                    <Collapse in={this.state.filtersOpen}>

                        <div id="example-collapse-text">
                            <Form>
                                <Form.Group onChange={this.handleGenre} className="mb-3" controlId="filters_genre">
                                    <Form.Label>Gatunek</Form.Label>
                                    <br />

                                    {
                                        this.genres.map((g, i) => {
                                            return (
                                                <Form.Check
                                                    // onChange={this.handleGenre}
                                                    key={i}
                                                    inline
                                                    label={g}
                                                    value={g}
                                                    name={'genre'}
                                                    type={"checkbox"}
                                                />
                                            )
                                        })
                                    }
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="filters_serie">
                                    <Form.Label>Seria</Form.Label>
                                    <br />
                                    <Form.Control
                                        inline
                                        onChange={this.handleSerie}
                                        label={'series'}
                                        name={'series'}
                                        type={"text"}
                                    />

                                </Form.Group>


                                <Form.Group className="mb-3" onChange={this.handlePlatform} controlId="filters_platform">
                                    <Form.Label>Platforma</Form.Label>
                                    <br />

                                    {
                                        this.platforms.map((g, i) => {
                                            return (
                                                <Form.Check
                                                    key={i}
                                                    inline
                                                    label={g}
                                                    value={g}
                                                    name={'platform'}
                                                    type="radio"

                                                />
                                            )
                                        })
                                    }

                                </Form.Group>

                                <Form.Group onChange={this.handleReleased} className="mb-3" controlId="filters_realese">
                                    <Form.Label>Data wydania</Form.Label>
                                    <br />
                                    <Form.Label>Od</Form.Label>
                                    <br />
                                    <Form.Control
                                        inline
                                        label={'realese'}
                                        name={'realesefrom'}
                                        
                                        type="date"
                                    />
                                    <Form.Label>Do</Form.Label>
                                    <br />
                                    <Form.Control
                                        inline
                                        label={'realese'}
                                        name={'realeseto'}
                                        
                                        type="date"
                                    />


                                </Form.Group>

                                <Form.Group onChange={this.handleAdded} className="mb-3" controlId="filters_added">
                                    <Form.Label>Data dodania</Form.Label>
                                    <br />
                                    <Form.Label>Od</Form.Label>
                                    <br />
                                    <Form.Control
                                        inline
                                        label={'added'}
                                        name={'addedfrom'}
                                        
                                        type="date"
                                    />
                                    <Form.Label>Do</Form.Label>
                                    <br />
                                    <Form.Control
                                        inline
                                        label={'added'}
                                        name={'addedto'}
                                        
                                        type="date"
                                    />

                                </Form.Group>
                                <Button onClick={this.apply}>Zastosuj</Button>
                            </Form>
                        </div>
                    </Collapse>

                </div>

                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 ">
                        {this.state.games.map((game, indx) => {
                            return (
                                <div key={indx} className='col'>
                                    <GameCard url={'/game/'+game._id} name={game.title} img={"https://play-lh.googleusercontent.com/5LIMaa7WTNy34bzdFhBETa2MRj7mFJZWb8gCn_uyxQkUvFx_uOFCeQjcK16c6WpBA3E"} />
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

export default Browse;