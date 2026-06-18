import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, setLoading } from './app/features/oSlice';
import API from './config/API';

const App = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem('token'); // Local storage se token check karna [1]
    
    try {
      if (token) {
        // Backend se user data fetch karna [2, 3]
        const { data } = await API.get('/api/users/data', {
          headers: { authorization: token }
        });

        if (data.user) {
          dispatch(login({ token, user: data.user })); // Redux mein data save karna [2]
        }else{
          dispatch(setLoading(false)); // Agar user data nahi mila to loading band karna [4]
        }
      }
    } catch (error){
      dispatch(setLoading(false))
      console.log(error.message); // Error handling 
    }
  };

  useEffect(() => {
    getUserData(); // Page load par function chalana [4]
  }, []);

  return (
    // Aapka routing logic yahan aayega
  );
};