"use client"

import { useState } from "react";
import { Menu, X } from "lucide-react";
import axios from "axios";
import Link from "next/link";


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-black/20 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center">
                    <div className="text-white text-xl font-bold">✨ NewYear-Resolution</div>
                    
                    <div className="hidden md:flex gap-6">
                        <Link href={"/"}><h1 className="block text-white hover:text-gray-300">Home</h1></Link>
                        <Link><h1 className="block text-white hover:text-gray-300">About</h1></Link>
                        <Link><h1 className="block text-white hover:text-gray-300">Contact</h1></Link>
                        <Link href={"/https://github.com/SuperexMack"}><h1 className="block text-white hover:text-gray-300">Contribute</h1></Link>
                    </div>

                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-4 space-y-4 pb-4">
                        <Link href={"/"}><h1 className="block text-white hover:text-gray-300">Home</h1></Link>
                        <Link><h1 className="block text-white hover:text-gray-300">About</h1></Link>
                        <Link><h1 className="block text-white hover:text-gray-300">Contact</h1></Link>
                        <Link href={'https://github.com/SuperexMack'}><h1 className="block text-white hover:text-gray-300">Contribute</h1></Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default function(){
    const [username, setLeetcodeUsername] = useState("")
    const [githubuserName, setGithubUsername] = useState("")
    const [showuserLeetcodedata, setandshowuserleetcodedata] = useState("")
    const [showgithubdata, setandshowusergithubdata] = useState("")
    const [loading, setLoading] = useState(false)
    
    const userResolutionData = async () => {
        setLoading(true)
        try {
            const leetcodeResponse = await axios.get(
                `https://leetcode-api-faisalshohag.vercel.app/${username}`
            );
            const userdata = leetcodeResponse.data;
            
            const leetcodeData = "Total problem solved by the user is " + userdata.totalSolved + " "
                + "Easy problem solved by the user is " + userdata.easySolved + " "
                + "Medium problem solved by the user is " + userdata.mediumSolved + " "
                + "Hard problem solved by the user is " + userdata.hardSolved + " "
                + "Reputation of the user is : " + userdata.reputation + " "
                + "and total leetcode problem solving ranking of the user is " + userdata.ranking;

            const aiResponse = await axios.post(
                "https://new-year-resolution-creator-6xke.vercel.app/aiResponseData",
                { userLeetcodeData: leetcodeData },
            );
            setandshowuserleetcodedata(aiResponse.data.userdata);

            const githubResponse = await axios.post(
                "https://new-year-resolution-creator-6xke.vercel.app/aiResponseData/github",
                { githubdata: githubuserName },
            );
            setandshowusergithubdata(githubResponse.data.usergithubData);
        } catch (error) {
            console.log("Something went wrong ", error);
        }
        setLoading(false)
    };
    
    return(
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900">
            <Navbar />
            
            <div className="flex-grow flex items-center justify-center px-4">
                <div className="bg-white/10 backdrop-blur-lg rounded-lg w-full max-w-2xl p-8 space-y-7">
                    <h1 className="text-3xl text-white font-bold text-center">Check the details of your profile 🔥</h1>
                    <input 
                        onChange={(e)=>setLeetcodeUsername(e.target.value)}  
                        placeholder="Enter Leetcode Username" 
                        className="p-5 w-full rounded-xl bg-black text-white"
                    />
                    <input 
                        onChange={(e)=>setGithubUsername(e.target.value)}
                        placeholder="Enter Github Username" 
                        className="p-5 w-full rounded-xl bg-black text-white"
                    />
                    <button 
                        onClick={userResolutionData} 
                        className="p-5 w-full rounded-xl bg-black text-white text-xl font-bold"
                    >
                        {loading ? "Loading.........." : "Create Resolution"}
                    </button>
                    <p className="text-xl text-white text-center">Whatever result you get, try to take it in a positive way 💪</p>
                </div>
            </div>

            {(showuserLeetcodedata || showgithubdata) && (
                <div className="w-full px-4 py-8 bg-black/20">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
                        {showuserLeetcodedata && (
                            <div className="p-6 rounded-xl bg-black/50 text-white">
                                <h2 className="text-xl font-bold mb-4">LeetCode Analysis</h2>
                                <p className="text-base leading-relaxed">
                                    {showuserLeetcodedata}
                                </p>
                            </div>
                        )}
                        {showgithubdata && (
                            <div className="p-6 rounded-xl bg-black/50 text-white">
                                <h2 className="text-xl font-bold mb-4">GitHub Analysis</h2>
                                <p className="text-base leading-relaxed">
                                    {showgithubdata}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}