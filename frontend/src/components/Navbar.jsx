import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../app/features/oSlice';

const Navbar = () => {
    const { user } = useSelector((state) => state.o);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutUser = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
            <Link to="/">
                <img src="/logo.svg" alt="logo" className="h-10 w-auto" />
            </Link>

            <div className="flex items-center gap-4">
                <p className="text-gray-700 font-medium">
                    Hi, {user?.name || 'User'}
                </p>
                <button
                    onClick={logoutUser}
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                >
                    Log Out
                </button>
            </div>
        </nav>
    );
};

export default Navbar;