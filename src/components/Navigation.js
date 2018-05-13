import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
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
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/"><img className="img-responsive" src={cmarcos} alt="Carmen Marcos"/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Themes
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Diario de dibujante
                  </DropdownItem>
                  <DropdownItem>
                  Paisajes en extinción
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                  Las puertas del cielo
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="/about">About</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouteData(Navigation)
