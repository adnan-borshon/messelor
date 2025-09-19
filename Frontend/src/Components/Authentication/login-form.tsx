import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  sub: string;        // username/email
  userType: string;   // user type from backend
  roles: string;      // roles from backend  
  iat: number;        // issued at timestamp
  exp: number;        // expiry timestamp
}

export function LoginForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>('');

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(''); // Clear previous errors

		try {
			const response = await fetch(
				'http://ec2-34-226-55-243.compute-1.amazonaws.com:8080/api/auth/login',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						usernameOrEmail: email,
						password: password,
					}),
				}
			);

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.message || `Login failed: ${response.status}`);
			}

			const data = await response.json();
			console.log('Full response data:', data); // Debug log
			console.log('Token:', data.data.token); // Debug log
			console.log('Response keys:', Object.keys(data)); // Debug log

			// Check different possible token property names
			let token: string = data.data.token;
			
		

			console.log('Token found:', token ? 'Yes' : 'No');
			console.log('Token type:', typeof token);
			console.log('Token preview:', token ? token.substring(0, 50) + '...' : 'null');

			// Validate that token exists and is a string
			if (!token || typeof token !== 'string') {
				console.error('No valid token found in response:', data);
				throw new Error('No valid token received from server');
			}

			// Validate JWT format (should have 3 parts separated by dots)
			const tokenParts = token.split('.');
			if (tokenParts.length !== 3) {
				console.error('Invalid JWT format. Parts:', tokenParts.length);
				throw new Error('Invalid JWT token format');
			}

			try {
				// Decode JWT to get username and role
				const decoded: JwtPayload = jwtDecode(token);
				
				// Validate decoded token has required fields
				if (!decoded.sub || !decoded.roles) {
					throw new Error('Invalid token structure');
				}

				// Map USER role to appropriate user type or use a default role
				const userRole = decoded.roles === 'USER' ? 'MEMBER' : decoded.roles;

				// Save token & username & role in localStorage
				localStorage.setItem('token', token);
				localStorage.setItem('username', decoded.sub);
				localStorage.setItem('role', userRole);
				localStorage.setItem('userType', decoded.userType);

				console.log('Login successful:', { 
					username: decoded.sub, 
					role: userRole,
					userType: decoded.userType
				}); // Debug log

		
				switch (userRole) {
					case 'MEMBER':
					case 'USER':
						navigate(`/${decoded.sub}/dashboard`);
						break;
					case 'ADMIN':
						navigate(`/${decoded.sub}/admin/dashboard`);
						break;
					case 'MANAGER':
						navigate(`/${decoded.sub}/manager/dashboard`);
						break;
					default:
						console.log('Defaulting to member dashboard for role:', userRole);
						navigate(`/${decoded.sub}/dashboard`);
				}

			} catch (jwtError) {
				console.error('JWT decode error:', jwtError);
				throw new Error('Invalid token format');
			}

		} catch (err) {
			console.error('Login error:', err);
			const errorMessage = err instanceof Error ? err.message : 'Login failed. Please check your credentials.';
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={cn('flex flex-col justify-center items-center my-20 gap-4', className)} {...props}>
			<Card className='overflow-hidden p-0 w-full max-w-4xl'>
				<CardContent className='grid p-0 md:grid-cols-2'>
					<form onSubmit={handleSubmit} className='p-6 md:p-8 flex flex-col justify-center'>
						<div className='flex flex-col gap-6'>
							<div className='flex flex-col items-center text-center'>
								<div className='logo'>
									<img className='h-30 object-contain' src='messelor_logo.png' alt='Messelor Logo' />
								</div>
								<p className='text-muted-foreground text-balance'>
									Login to your Messelor account
								</p>
							</div>

							{/* Error Display */}
							{error && (
								<div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative'>
									<span className='block sm:inline'>{error}</span>
								</div>
							)}

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
									disabled={loading}
								/>
							</div>

							{/* Password */}
							<div className='grid gap-3'>
								<div className='flex items-center'>
									<Label htmlFor='password'>Password</Label>
									<a href='#' className='ml-auto text-sm underline-offset-2 hover:underline'>
										Forgot your password?
									</a>
								</div>
								<Input
									id='password'
									type='password'
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									disabled={loading}
								/>
							</div>

							<Button type='submit' className='w-full cursor-pointer' disabled={loading}>
								{loading ? 'Logging in...' : 'Login'}
							</Button>
						</div>
					</form>

					<div className='relative hidden md:flex'>
						<img src='hero_page.jpg' alt='Image' className='object-cover w-full h-full' />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}