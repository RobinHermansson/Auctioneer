
import { NavLink } from 'react-router-dom';

import "./NavBar.css";

interface NavBarProps {
    isCollapsed: boolean
    onToggle: () => void;
}
const NavBar: React.FC<NavBarProps> = ({ isCollapsed, onToggle }) => {

    const navItems = [
        { path: '/', label: 'HOME' },
        { path: '/auctions', label: 'AUCTIONS' },
        { path: '/logout', label: 'LOGOUT' },
    ];

    const onHoverHandler = () => {
        if (isCollapsed)
            onToggle();
    }
    const onMouseLeaveHandler = () => {
        if (!isCollapsed)
            onToggle();
    }


    return (
        <aside
            onMouseEnter={() => onHoverHandler()}
            onMouseLeave={() => onMouseLeaveHandler()}
            className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
        >
            <nav className="sidebar-nav">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className='nav-link'>
                                {!isCollapsed && <span className="label">{item.label}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside >
    )
}

export default NavBar;