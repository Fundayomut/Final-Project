import React from 'react'
import bootstrap from 'bootstrap'

export const NavNach = () => {
  return (
        <div className='navVor'>
            <div className='logo'>
            <img src='/kuchen-boutique-high-resolution-logo-transparent.png' width="200px" height="200px" />
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
                    <li class="nav-item">
                        <a class="nav-Profile" href="#">Profile</a>
                    </li>
                </ul>
            </div>
            <div className='search'>
                <div className=''>
                    <input className='inputsearch' placeholder='search' style={{height:"25px"}} />
                    <img src='https://cdn0.iconfinder.com/data/icons/essentials-4/1687/search-512.png' width="20px" height="20px" style={{marginLeft:"10px"}} />
                </div>
                <img src='https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-12-512.png' width="25px" height="25px" />
                <img src='https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/exit-enter-leave-door-out-64.png' width="25px" height="25px" />
            </div>
        </div>
  )
}
