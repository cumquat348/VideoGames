
import React from "react"
// import Tooltip  from "bootstrap/dist/css/bootstrap.min.css"
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import { Outlet, Link } from "react-router-dom";
class Navigation extends React.Component {

     render(props) {

          const renderTooltip = (text) => (
               <Tooltip >{text}</Tooltip>
          );

          return (
               <nav className="d-flex flex-nowrap" style={{ minHeight: "100vh" }}>
                    <div className="d-flex flex-column flex-shrink-0 bg-light" >

                         <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                              {this.props.controls.map((c, i) => {
                                   return (
                                        <OverlayTrigger key={'c'+i} placement="right" overlay={renderTooltip(c.name)}>
                                             <li  className="nav-item" >

                                                  <Link to={c.path} className="nav-link  py-3 border-bottom rounded-0" ><img src={c.icon} width="60" height="60" className="rounded-circle" /></Link>
                                             </li>
                                        </OverlayTrigger>)
                              })}

                         </ul>

                         <Dropdown className="border-top" >
                              <Dropdown.Toggle id="profile" variant="" className="p-3" style={{ width: "100%" }}>
                                   <img src={this.props.avatar} alt="avatar" width="24" height="24" className="rounded-circle" />
                              </Dropdown.Toggle>
                              <Dropdown.Menu >
                                   {
                                   this.props.profile.map((c, i) => {

                                        return (
                                             <Link to={c.path} key={'d'+i} className="nav-link  p-2 dropdown-item">{c.name}</Link>
                                   )})
                                   }
                              </Dropdown.Menu>
                         </Dropdown>
                    </div>

               </nav>
          );
     }
}
export default Navigation;
