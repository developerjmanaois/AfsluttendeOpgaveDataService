import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

    return (


        <nav>
            <div>
                <div>
                    <a href="#">LOGO A/S</a>
                </div>

                <div>
                    <NavLink to="/">
                        Home
                    </NavLink>
                    <NavLink to="/about">
                        Om os
                    </NavLink>
                    <NavLink to="/news">
                        Nyheder
                    </NavLink>
                    <NavLink to="/contact">
                        Kontakt
                    </NavLink>
                    <NavLink to="/admin">
                        ADMIN
                    </NavLink>
                </div>

            </div>
        </nav>
    )
}

export default Navbar