import { useState } from 'react';
import axios from 'axios';

function Login({ setUsername, setIsLoggedIn }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    const url = isRegister
      ? 'http://localhost:8000/api/auth/register'
      : 'http://localhost:8000/api/auth/login';

    try {
      const res = await axios.post(url, form);
      setUsername(form.email);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Something went wrong';
      setError(msg);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={handleSubmit}>
          {isRegister ? 'Register' : 'Login'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
      <p style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Login' : 'No account? Register'}
      </p>
    </div>
  );
}

export default Login;
