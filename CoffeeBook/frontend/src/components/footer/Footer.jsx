import React from 'react'
import './footer.css'

export default function Footer() {
    return (
        <footer className='Container'>
            <ul className='d-flex justify-content-center col-6'>
                <li>© 2022 CoffeeBook</li>
                <span>|</span>
                <li>Mentions légales</li>
                <span>|</span>
                <li>CGU</li>
                <span>|</span>
                <li>Contact</li>
            </ul>
        </footer>
    )
}
