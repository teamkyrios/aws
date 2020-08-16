import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
  DropdownItem,
  NavbarText,
} from "reactstrap";

/**
 * Top navigation bar for website
 */
const TopNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  var history = useHistory();

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/")}
        >
          Farrer Park Hospital
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/announcements")}
              >
                Announcements
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/login")}
              >
                Login
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Useless Functionality
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Staff</DropdownItem>
                <DropdownItem>Visitor</DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  tag="a"
                  onClick={() => history.push("/administrator")}
                >
                  Administrator
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Kýrios Solutions</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopNavbar;
