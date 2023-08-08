// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import login from '../../libs/login';
import useAuth from '../../hooks/useAuth';

export default function Login() {

  const { user, loading } = useAuth();

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (loading) {
    return <div>Loading...</div>;
  }

  if(user) {
    router.push("/")
  }

  console.log(user)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/'); // ログインに成功したらホームページへリダイレクト
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='pt-10'>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
