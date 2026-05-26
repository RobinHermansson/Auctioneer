import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../LoginModal/LoginModal';
import "./NavBar.css";

interface NavBarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isCollapsed, onToggle }) => {
    const { token, logout } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    const navItems = [
        { path: '/', label: 'HOME' },
        ...(token ? [{ path: '/create-auction', label: 'CREATE AUCTION' }] : []),
        ...(token ? [{ path: '/my-details', label: 'MY DETAILS' }] : []),
    ];

    return (
        <>
            <aside
                onMouseEnter={() => isCollapsed && onToggle()}
                onMouseLeave={() => !isCollapsed && onToggle()}
                className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
            >
                <nav className="sidebar-nav">
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink to={item.path} className="nav-link">
                                    {!isCollapsed && <span className="label">{item.label}</span>}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    {token ? (
                        <button className="auth-nav-button" onClick={logout}>
                            {!isCollapsed && <span className="label">LOGOUT</span>}
                        </button>
                    ) : (
                        <button className="auth-nav-button" onClick={() => setShowLoginModal(true)}>
                            {!isCollapsed && <span className="label">LOGIN</span>}
                        </button>
                    )}
                </div>
            </aside>

            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        </>
    );
};

export default NavBar;