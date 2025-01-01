"use client"
import { useState } from "react";
import { Navbar } from "../Components/Navbar";
import axios from 'axios';
import { Github, Code2, Loader2, Sparkles, Menu, X } from 'lucide-react';

export default function(){
    const [username , setLeetcodeUsername] = useState("")
    const [showuserLeetcodedata , setandshowuserleetcodedata] = useState("")
    
    const userResolutionData = async () => {
        const userdata = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
        console.log("Total problem solved" + userdata.data.totalSolved);
        console.log("Easy problem solved "  + userdata.data.easySolved);
        console.log("Medium problem solved "  + userdata.data.mediumSolved);
        console.log("Hard problem solved "  + userdata.data.hardSolved);
        console.log("Ranking is : " + userdata.data.ranking);
        console.log("Reputation is : " + userdata.data.reputation);
    
        const leetcodeData = "Total problem solved by the user is " + userdata.data.totalSolved + " "
            + "Easy problem solved by the user is" + userdata.data.easySolved  + " "+
            "Medium problem solved by the user is" + userdata.data.mediumSolved  + " "+
            "Hard problem solved by the user is" + userdata.data.hardSolved  + " "+
            "Reputation of the user is : " + userdata.data.reputation  + " "+
            "and total leetcode problem solving ranking of the user is " + userdata.data.ranking;
    
        await axios.post("http://localhost:9000/aiResponseData", {
            userLeetcodeData: leetcodeData
        })
        .then((response) => {
            setandshowuserleetcodedata(response.data.userdata);
            console.log(response.data.userdata);
        })
        .catch((error) => {
            console.log("Something went wrong " + error);
        });
    };
    
    return(
        <>
        <Navbar></Navbar>
        <div className="w-full h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 flex justify-center items-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg w-1/2 h-[500px] flex flex-col justify-center items-center space-y-7">
                <h1 className="text-[30px] text-white font-bold">Check the details of your profile 🔥</h1>
                <input 
                    onChange={(e)=>setLeetcodeUsername(e.target.value)}  
                    placeholder="Enter Leetcode Username" 
                    className="p-5 w-[70%] rounded-xl bg-black text-white">
                </input>
                <input 
                    placeholder="Enter Github Username" 
                    className="p-5 w-[70%] rounded-xl bg-black text-white">
                </input>
                <button 
                    onClick={userResolutionData} 
                    className="p-5 w-[70%] rounded-xl bg-black text-white text-[20px] font-bold">
                    <span>Create Resolution</span>
                </button>
                {showuserLeetcodedata && (
                    <div className="w-[70%] p-5 rounded-xl bg-black/50 text-white">
                        <p className="text-[16px] leading-relaxed">
                            {showuserLeetcodedata}
                        </p>
                    </div>
                )}
                <p className="text-[20px] text-white">What ever Result you will get from here try to take it in a positive way 💪</p>
            </div>
        </div>
        </>
    )
}