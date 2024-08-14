import React from 'react'
import bootstrap from 'bootstrap'

export const NavVor = () => {
    return (
        <div className='navVor'>
            <div className='logo'>
                <img src='/kuchen-boutiqe-high-resolution-logo-transparent.png' width="200px" height="100px" />
            </div>
            <div className='navVorBoot'>
                <ul class="nav justify-content-center">
                    <li class="nav-item">
                        <a class="nav-Home" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-Order" href="#">Order</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-Contact" href="#">Contact</a>
                    </li>
                </ul>
            </div>
            <div className='search'>
                <div className=''>
                    <input className='inputsearch' placeholder='search' style={{height:"25px"}} />
                    <img src='https://cdn0.iconfinder.com/data/icons/essentials-4/1687/search-512.png' width="20px" height="20px" style={{marginLeft:"10px"}} />
                </div>
                <img src='https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-12-512.png' width="25px" height="25px" />
                <img src='https://cdn4.iconfinder.com/data/icons/top-search-7/128/_signin_in_common_door_exit_login-512.png' width="25px" height="25px" />
            </div>
        </div>
    )
}
