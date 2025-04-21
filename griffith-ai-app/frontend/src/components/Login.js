import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login({ setUsername, setIsLoggedIn }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError('');
    const url = isRegister
      ? 'http://localhost:8000/api/auth/register'
      : 'http://localhost:8000/api/auth/login';

    try {
      const res = await axios.post(url, form);
      console.log('Auth success:', res.data);

      setUsername(form.email);
      setIsLoggedIn(true);
      localStorage.setItem('username', form.email);

      alert(isRegister ? 'Registered successfully!' : 'Logged in successfully!');
      navigate('/');
    } catch (err) {
      console.error('Auth failed:', err);
      const msg = err.response?.data?.message || 'Something went wrong';
      setError(msg);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 style={{ textAlign: 'center' }}>{isRegister ? 'Register' : 'Login'}</h2>
        <div className="form">
          <div className="inputForm">
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="inputForm">
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button className="button-submit" onClick={handleSubmit}>
            {isRegister ? 'Register' : 'Login'}
          </button>

          {error && (
            <p style={{ color: 'crimson', display: 'flex', alignItems: 'center', gap: '5px' }}>
              ❌ {error}
            </p>
          )}

          <p
            className="span"
            onClick={() => setIsRegister(!isRegister)}
            style={{ textAlign: 'center' }}
          >
            {isRegister ? 'Already have an account? Login' : 'No account? Register'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
