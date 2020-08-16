import React from 'react';
import { Formik, Form, useField } from 'formik';
import styled from '@emotion/styled';
import './FormStyles.css';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

const MyTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input className='text-input' {...field} {...props} />
			{meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
		</>
	);
};

// Styled components ....
const StyledSelect = styled.select`
	color: var(--blue);
`;

const StyledErrorMessage = styled.div`
	font-size: 12px;
	color: var(--red-600);
	width: 400px;
	margin-top: 0.25rem;
	&:before {
		content: '❌ ';
		font-size: 10px;
	}
	@media (prefers-color-scheme: dark) {
		color: var(--red-300);
	}
`;

const StyledLabel = styled.label`
	margin-top: 1rem;
`;

const MySelect = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
			<StyledSelect {...field} {...props} />
			{meta.touched && meta.error ? (
				<StyledErrorMessage>{meta.error}</StyledErrorMessage>
			) : null}
		</>
	);
};

const LoginPage = () => {
	// Query database to verify login information
	const onSubmit = (formParameters) => {
		if (true) {
			// Access granted, redirect to admin access website
			history.push('/administrator');
		} else {
			// Access denied
		}
		alert(formParameters);
	};

	let history = useHistory();
	let location = useLocation();

	let { from } = location.state || { from: { pathname: '/' } };
	let login = () => {};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<div>
				<h2>Staff Login</h2>
				<>
					<Formik
						initialValues={{
							staffID: '',
							password: '',
							accessType: '', // added for our select
						}}
						validationSchema={Yup.object({
							staffID: Yup.string()
								.max(15, 'Must be 15 characters or less')
								.required('Required'),
							password: Yup.string()
								.max(15, 'Must be 15 characters or less')
								.required('Required'),
							accessType: Yup.string()
								.oneOf(['Administrator', 'Staff'], 'Invalid Job Type')
								.required('Required'),
						})}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								onSubmit(JSON.stringify(values, null, 2));
								setSubmitting(false);
							}, 400);
						}}
					>
						<Form
							style={{
								alignItems: 'flex-start',
								flexDirection: 'column',
								display: 'flex',
							}}
						>
							<MyTextInput
								label='Staff ID'
								name='staffID'
								type='text'
								placeholder='A0112298T'
							/>
							<MyTextInput
								label='Password'
								name='password'
								type='password'
								placeholder='Password'
							/>
							<MySelect label='Access' name='accessType'>
								<option value=''>Access Type</option>
								<option value='Administrator'>Administrator</option>
								<option value='Staff'>Staff</option>
							</MySelect>

							<button type='submit'>Submit</button>
						</Form>
					</Formik>
				</>
			</div>
		</div>
	);
};

export default LoginPage;
