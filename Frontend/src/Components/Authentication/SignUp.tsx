import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

import Role from '@/Components/Authentication/Role.tsx';
import { Link } from 'react-router-dom';

export function SignUp({ className, ...props }: React.ComponentProps<'div'>) {
	const [showModal, setShowModal] = useState(false);

	// 🟢 Form state
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			alert('Passwords do not match!');
			return;
		}

		// Prepare body for backend
		const body = {
			username: formData.email.split('@')[0], // auto-derived from email
			email: formData.email,
			password: formData.password,
		};

		// Send data to backend for registration
		try {
			const response = await fetch(
				'http://localhost:8080/api/auth/register',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Registration failed');
			}

			const data = await response.json();
			console.log('Registration successful:', data);
			setShowModal(true); // optional: show success modal
		} catch (error: any) {
			console.error('Error during registration:', error.message);
			alert(error.message);
		}

		// console.log('Form Data:', formData.password);
		// console.log('Form Data:', formData.email);
		// console.log('Form Data:', formData.name);
		setShowModal(true);
	};

	return (
		<div
			className={cn(
				'flex flex-col justify-center items-center my-20 gap-4',
				className
			)}
			{...props}
		>
			<Card className='overflow-hidden p-0 w-full max-w-4xl'>
				<CardContent className='grid p-0 md:grid-cols-2'>
					<form
						onSubmit={handleSignUp}
						className='p-6 md:p-8 flex flex-col justify-center'
					>
						<div className='flex flex-col gap-6'>
							<div className='flex flex-col items-center text-center'>
								<div className='logo'>
									<img
										className='h-30 object-contain'
										src='messelor_logo.png'
										alt='Messelor Logo'
									/>
								</div>
								<p className='text-muted-foreground text-balance'>
									Create your Messelor account
								</p>
							</div>

							{/* Name */}
							<div className='grid gap-3'>
								<Label htmlFor='name'>Full Name</Label>
								<Input
									id='name'
									type='text'
									placeholder='John Doe'
									required
									value={formData.name}
									onChange={handleChange}
								/>
							</div>

							{/* Email */}
							<div className='grid gap-3'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									placeholder='m@example.com'
									required
									value={formData.email}
									onChange={handleChange}
								/>
							</div>

							{/* Password */}
							<div className='grid gap-3'>
								<Label htmlFor='password'>Password</Label>
								<Input
									id='password'
									type='password'
									required
									value={formData.password}
									onChange={handleChange}
								/>
							</div>

							{/* Confirm Password */}
							<div className='grid gap-3'>
								<Label htmlFor='confirmPassword'>
									Confirm Password
								</Label>
								<Input
									id='confirmPassword'
									type='password'
									required
									value={formData.confirmPassword}
									onChange={handleChange}
								/>
							</div>

							{/* Signup button */}
							<Button
								type='submit'
								className='w-full cursor-pointer'
							>
								Sign Up
							</Button>
						</div>
					</form>

					<div className='relative hidden md:flex'>
						<img
							src='hero_page.jpg'
							alt='Image'
							className='object-cover w-full h-full'
						/>
					</div>
				</CardContent>
			</Card>

			{/* Footer */}
			<div className='text-gray-900 text-center text-xs text-balance'>
				By clicking signup, you agree to our{' '}
				<Link to="/terms" className='cursor-pointer hover:underline'>Terms of Service</Link> and{' '}
				<Link to="/privacy-policy" className='cursor-pointer hover:underline'>Privacy Policy</Link>.
			</div>

			{/* Show modal if state is true */}
			{showModal && <Role closeModal={() => setShowModal(false)} />}
		</div>
	);
}
