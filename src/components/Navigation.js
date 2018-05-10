import React from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { RouteData } from 'react-static'
import cmarcos from '../assets/images/cmarcos-signature.jpg'

export default () => (
  <RouteData render={() => (
    <Navbar>
      <NavbarBrand href="/"><img className="img-responsive" src={cmarcos} alt="Carmen Marcos"/></NavbarBrand>
    </Navbar>
  )} />
)
