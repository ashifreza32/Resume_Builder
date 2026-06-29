import React, { useState } from 'react';
import { User2, Mail, Lock } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { login } from '../app/features/oSlice';
import API from '../config/API';
import toast from 'react-hot-toast';

const Login = () => {
    const query = new URLSearchParams(window.location.search);
    const URLstate = query.get('state');

    const [state, setState] = useState(URLstate || 'login');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const dispatch = useDispatch();

    // Input fields mein badlav handle karne ke liye [3]
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Form submit karne ka logic (API Call) [4, 5]
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Backend API par request bhejna [4]
            const { data } = await API.post(`/api/users/${state}`, formData);

            // Redux store aur local storage mein token save karna [5]
            dispatch(login({ token: data.token, user: data.user }));
            localStorage.setItem('token', data.token);

            toast.success(data.message || "Success!");
        } catch (error) {
            // Error notification dikhana [6]
            toast.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50"> {/* [7] */}
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 capitalize">
                    {state === 'login' ? 'Login' : 'Sign Up'}
                </h2>
                <p className="mt-2 text-sm text-center text-gray-600">
                    Please {state} to continue
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {/* Sirf Signup ke waqt Name field dikhega [1] */}
                    {state === 'signup' && (
                        <div className="relative">
                            <User2 className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                required
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        {state === 'login' ? 'Login' : 'Create Account'}
                    </button>
                </form>

                {/* Login aur Signup ke beech switch karne ka link [1] */}
                <p className="mt-4 text-sm text-center text-gray-600">
                    {state === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <span
                        className="text-green-600 cursor-pointer hover:underline"
                        onClick={() => setState(state === 'login' ? 'signup' : 'login')}
                    >
                        Click here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;