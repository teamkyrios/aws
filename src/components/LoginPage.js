import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const LoginPage = () => {
	return (
		<div>
			<h1>Login form</h1>
			<Form style={{ marginLeft: '5%', marginRight: '5%' }}>
				<FormGroup>
					<Label for='exampleEmail'>Email</Label>
					<Input
						type='email'
						name='email'
						id='exampleEmail'
						placeholder='farrer.park@gmail.com'
					/>
				</FormGroup>
				<FormGroup>
					<Label for='examplePassword'>Password</Label>
					<Input
						type='password'
						name='password'
						id='examplePassword'
						placeholder='password'
					/>
				</FormGroup>
				<FormGroup>
					<Label for='exampleSelect'>Select</Label>
					<Input type='select' name='select' id='exampleSelect'>
						<option>Administrator</option>
						<option>Visitor</option>
						<option>Staff</option>
					</Input>
				</FormGroup>
				<FormGroup tag='fieldset'>
					<legend>Access Privileges (choose this or drop down selection)</legend>
					<FormGroup check>
						<Label check>
							<Input type='radio' name='radio1' />I am an administrator
						</Label>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input type='radio' name='radio1' />I am a visitor
						</Label>
					</FormGroup>
					<FormGroup check disabled>
						<Label check>
							<Input type='radio' name='radio1' />I am a staff
						</Label>
					</FormGroup>
				</FormGroup>
				<Button>Submit</Button>
			</Form>
		</div>
	);
};

export default LoginPage;
