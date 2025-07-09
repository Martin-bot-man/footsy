import React from 'react'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="h-auto  bg-gray-400 text-white py-8 px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-8 md:space-y-0 md:space-x-8">

            <div className="flex-shrink-0 mb-6 md:mb-0">

                <Logo />
            </div>

            <div className="flex-1 min-w-[150px]">
                <h3 className="font-bold text-lg mb-3">Learn More</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Terms & Conditions</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Responsible Gaming Policy</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                </ul>
            </div>

            
            <div className="flex-1 min-w-[150px]">
                <h3 className="font-bold text-lg mb-3">Play</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                    <li><a href="#" className="hover:text-white transition-colors duration-200">News</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Matches</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Live Games</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Leagues</a></li>
                </ul>
            </div>

            <div className="flex-1 min-w-[150px]">
                <h3 className="font-bold text-lg mb-3">Contact Us</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                    <li>Telephone</li>
                    <li><a href="tel:+254797782614" className="hover:text-white transition-colors duration-200">+254797782614</a></li>
                    <li>Email</li>
                    <li><a href="mailto:martinwere14@gmail.com" className="hover:text-white transition-colors duration-200">martinwere14@gmail.com</a></li>
                </ul>
            </div>

        </div>
    </footer>
  )
}

export default Footer
