import { Navbar } from "../Components/Navbar";
import { Github, Code2, Loader2, Sparkles, Menu, X } from 'lucide-react';

export default function(){
   return(
    <>
    <Navbar></Navbar>
    <div className="w-full h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 flex justify-center items-center">
       <div className="bg-white/10 backdrop-blur-lg rounded-lg w-1/2 h-[500px] flex flex-col justify-center items-center space-y-7">
         <h1 className="text-[30px] text-white font-bold">Check the details of your profile 🔥</h1>
         <input placeholder="Enter Leetcode Username" className="p-5 w-[70%] rounded-xl bg-black text-white"></input>
         <input placeholder="Enter Github Username" className="p-5 w-[70%] rounded-xl bg-black text-white"></input>
         <button placeholder="Enter Github Username" className="p-5 w-[70%] rounded-xl bg-black text-white text-[20px] font-bold"><span>Create Resolution</span></button>
        <p className="text-[20px] text-white">What ever Result you will get from here try to take it in a positive way 💪</p>
       </div>
    </div>
    </>
   )
}