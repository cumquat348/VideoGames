import { Outlet, Link } from "react-router-dom";
import Navigation from "./Navbar";
import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: "anonymous" };
    
        this.loadDoc = (callback) => {
          const xhttp = new XMLHttpRequest();
          xhttp.onload = function () {
            let r = this.response;
            let result = JSON.parse(r)["priviledges"]
            callback(result.toString())
          }
          xhttp.open("GET", "/priviledges", true);
          xhttp.send();
        }

        this.getAvatar = ()=> {
          let a =  document.cookie.match(new RegExp('(^| )' + 'picture' + '=([^;]+)'))?document.cookie.match(new RegExp('(^| )' + 'picture' + '=([^;]+)'))[2]:'avatar'
          console.log(a)
          
          return a
        }
        this.loadAllGames = (callback) => {
          const xhttp = new XMLHttpRequest();
          xhttp.onload = function () {
            let r = this.response;
            let result = JSON.parse(r)
            
            callback(result)
          }
          xhttp.open("GET", "/search", true);
          xhttp.send();
        }
      }
    
      async componentDidMount() {
        this.loadDoc(
          (data) => {
            
            this.setState({
              user: data
            });
          }
        )
      }
    render(props) {
        let icons = {
            home : "https://img.icons8.com/ios-glyphs/90/null/home-page--v1.png",
            library: "https://img.icons8.com/ios-glyphs/90/null/albums.png",
            friends : "https://img.icons8.com/ios-glyphs/90/null/user-group-man-man.png",
            admin : "https://img.icons8.com/ios-glyphs/90/null/microsoft-admin--v2.png",
            browse : "https://img.icons8.com/ios-glyphs/90/null/search--v1.png",
            comments : "https://img.icons8.com/ios-glyphs/90/null/messaging-.png",
            top : "https://img.icons8.com/ios-glyphs/90/null/trophy.png",


            avatar : "https://img.icons8.com/ios-glyphs/90/null/person-male.png",
            spyro : "https://img.icons8.com/ios-glyphs/90/null/spyro.png",
            mario : "https://img.icons8.com/ios-glyphs/90/null/super-mario.png",
            among : "https://img.icons8.com/ios-glyphs/90/null/among-us.png",
            dice : "https://img.icons8.com/ios-glyphs/90/null/dice.png",


            filter: "https://img.icons8.com/ios-glyphs/90/null/empty-filter.png"
        }
        let navigation = {
            
            "admin": [{name : "home", icon: icons.home, path: "/" },{name : "reviews", icon: icons.comments, path: "/comments"}/*, {name : "top", icon: icons.top, path: "/top"}*/, {name : "browse", icon: icons.browse, path: "/browse"}, {name : "library", icon: icons.library, path: "/library"}, {name : "admin", icon: icons.admin, path: "/admin"}], 
            "anonymous": [{name : "home", icon: icons.home, path: "/" }/*{,{name : "reviews", icon: icons.comments, path: "/comments"}, {name : "top", icon: icons.top, path: "/top"}*/, {name : "browse", icon: icons.browse, path: "/browse"}],
            "user":[{name : "home", icon: icons.home, path: "/" },{name : "reviews", icon: icons.comments, path: "/comments"}/*, {name : "top", icon: icons.top, path: "/top"}*/, {name : "browse", icon: icons.browse, path: "/browse"}, {name : "library", icon: icons.library, path: "/library"}]
          }
          let profile = {
            "admin":  [ {name : "sign out", path: "/signout"}, {name : "settings", path: "/settings"}, {name : "admin", path: "/admin"}],
            "anonymous": [{name : "sign in", path: "/signin" }, {name : "register", path: "/signup"}],
            "user":  [ {name : "sign out", path: "/signout"}, {name : "settings", path: "/settings"}]
        };
        return (
            <div className="App d-flex flex-nowrap">
                <Navigation controls={navigation[this.state.user]} profile={profile[this.state.user]} avatar={icons[this.getAvatar()]}/>
                <Outlet context={[this.state.user,this.setState]} user={this.state.user} className="d-flex flex-nowrap" />
               </div>
        );
    }
}
export default Layout;