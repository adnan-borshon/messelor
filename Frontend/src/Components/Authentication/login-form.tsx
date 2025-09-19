import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function LoginForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch(
				'http://localhost:8080/api/auth/login',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						usernameOrEmail: email,
						password: password,
					}),
				}
			);
			console.log(email);
			console.log(password);
			if (!response.ok) {
				throw new Error('Login failed');
			}

			const data = await response.json();
			console.log('Login successful:', data);
			// handle successful login (navigate, store token, etc.)
		} catch (err) {
			console.error('Login error:', err);
		} finally {
			setLoading(false);
		}
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
						onSubmit={handleSubmit}
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
									Login to your Messelor account
								</p>
							</div>

							{/* Email */}
							<div className='grid gap-3'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									placeholder='m@example.com'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							{/* Password */}
							<div className='grid gap-3'>
								<div className='flex items-center'>
									<Label htmlFor='password'>Password</Label>
									<a
										href='#'
										className='ml-auto text-sm underline-offset-2 hover:underline'
									>
										Forgot your password?
									</a>
								</div>
								<Input
									id='password'
									type='password'
									required
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</div>

							<Button
								type='submit'
								className='w-full cursor-pointer'
								disabled={loading}
							>
								{loading ? 'Logging in...' : 'Login'}
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
		</div>
	);
}
