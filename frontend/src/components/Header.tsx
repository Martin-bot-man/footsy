import { IoMdFootball } from "react-icons/io";
import Logo from "./Logo";


const Header = () => {

  
  
  return (
    <div >

        <div className= 'text-sm h-auto'>
          <div className="bg-green-100 p-2" >
          <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="120" height="40" rx="8" fill="#FFD700"/>
                    <text x="10" y="28" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#fff">Footsy!</text>
                </svg>
                </div>
          <h1 className='flex items-center justify-center font-bold  text-sm bg-green-100' >F<IoMdFootball />
<span className='flex items-center justify-center'><IoMdFootball />T</span>sy</h1>
          
          <div className="flex justify-end gap-4 bg-green-100  p-4">
            
            
            <div className="">
              <button className="hover:text-green-400 transition-colors duration-200">LOGIN</button>
            </div>
            <div className="">
              <button className="hover:text-green-400 transition-colors duration-200">REGISTER</button>
            </div> 
            
          </div>
            

<nav className="hidden md:flex flex-grow justify-center space-x-6 lg:space-x-8">
                <a href="#" className="text-green-400 font-semibold border-b-2 border-green-400 pb-1">Home</a>
                <a href="#" className="hover:text-green-400 transition-colors duration-200">News</a>
                <a href="#" className="hover:text-green-400 transition-colors duration-200">Football chats</a>
                <a href="#" className="hover:text-green-400 transition-colors duration-200">Playing(22) </a>
                <a href="#" className="hover:text-green-400 transition-colors duration-200">Match Predictions</a>
                <a href="#" className="hover:text-green-400 transition-colors duration-200 relative">Leagues </a>
                <a href="#" className="hover:text-green-400 transition-colors duration-200 relative">New EPL Players </a>
                <a href="#" className="hover:text-green-400 transition-colors duration-200">Live Score</a>
            </nav>
        
    </div>
    </div>
  )
}

export default Header




