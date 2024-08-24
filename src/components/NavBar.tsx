import '../styles/NavBar.css';
import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <nav className="nav-bar">
            <Link to='/'><img src='/creatorverse.png' alt="logo" width='270px' height='70px' className='logo'/></Link>
            {/* <ul>
                <li><strong>CreatorVerse</strong></li>
            </ul> */}
            <ul className='nav-links' style={{ listStyleType: 'none' }}>
                <li><Link style={{ listStyleType: 'none' }} to='/' className='nav-link'>Home</Link></li>
                <li><Link to='/add-creator' className='nav-link'>Add Creator</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;
