import React, { useState } from 'react';
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
} from 'reactstrap';

/**
 * Top navigation bar for website
 */
const TopNavbar = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color='light' light expand='md'>
				<NavbarBrand href='/'>Farrer Park Hospital</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className='mr-auto' navbar>
						<NavItem>
							<NavLink href='/announcements'>Announcements</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href='/login'>Login</NavLink>
						</NavItem>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								Useless Functionality
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem>Staff</DropdownItem>
								<DropdownItem>Visitor</DropdownItem>
								<DropdownItem divider />
								<DropdownItem tag='a' href='/administrator'>
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
