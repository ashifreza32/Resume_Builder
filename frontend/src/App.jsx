import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { login, setLoading } from './app/features/oSlice';
import API from './configs/api';

// Pages Import
import Home from './pages/Home';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/resume-builder';
import Preview from './pages/preview';
import Login from './pages/Login';

const App = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const { data } = await API.get('/api/users/data', {
          headers: { authorization: token }
        });
        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/view/:id" element={<Preview />} /> 
      
      
      <Route path="/app" element={<Layout />}>
        <Route index element={<Dashboard />} /> 
        <Route path="builder/:id" element={<ResumeBuilder />} /> 
      </Route>
    </Routes>
  );
};

export default App;