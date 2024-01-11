import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

    return (


        <nav className='bg-slate-100'>
            <div className="navbar max-w-screen-xl mx-auto p-10 rounded-md">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li>
                        <a>Parent</a>
                        <ul className="p-2">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">LOGO</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-3">
                        <li>
                            <NavLink to="/" className='hover:text-gray-200'>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/viborghaveservice1" className='hover:text-gray-200'>
                                Viborg Have Service
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink to="/viborghaveservice2" className='hover:text-gray-200'>
                                Viborg Have Service
                            </NavLink>
                        </li> */}
                        <li>
                            <NavLink to="/vejret" className='hover:text-gray-200' >
                                Vejret
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/nyheder" className='hover:text-gray-200' >
                                Nyheder
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/energidata" className='hover:text-gray-200' >
                                Energi Data
                            </NavLink>
                        </li>
                        <li>
                            <details>
                            <summary>JSONPlaceholder</summary>
                            <ul className="p-2">
                                {/* <li>
                                    <NavLink to="/postadmin" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                PostAdmin
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/todos" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                Todos
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/photos" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                Photos
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/posts" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                Posts
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/post" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                Post
                                    </NavLink>
                                </li> */}
                            </ul>
                            </details>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn bg-green-500">Kontakt os</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar