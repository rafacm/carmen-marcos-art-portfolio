import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap'

import { withSiteData, withRouteData, Link } from 'react-static'
import cmarcos from '../assets/images/cmarcos-signature.jpg'

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    console.log("Navigation > toggle")
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="white" light expand="md">
          <NavbarBrand href="/"><img className="img-responsive" src={cmarcos} alt="Carmen Marcos"/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <NavItem>
                <NavLink href="/themes">Themes</NavLink>
              </NavItem>
            </Dropdown>
           </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouteData(Navigation)
