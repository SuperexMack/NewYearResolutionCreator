const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT
const API_KEY = process.env.GEMINI_API_KEY
const cors = require("cors")

const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(cors())
app.use(express.json());


app.get("/" , (req,res)=>{
    res.json({
        msg : "Welcome to the website sir!!"
    })
})

app.post("/aiResponseData" , async(req,res)=>{

let userLeetcodeData = req.body.userLeetcodeData
console.log("The leetcode data is " + userLeetcodeData)

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = `This is new year 2025 and i will give u some leetcode data  of the user and the data is ${userLeetcodeData} and by checking this data u 
have to give him some resolution based on his leetcode data that what he need to improve and give him that 
ye saab whatsapp wali language mai dena like "aare kya baat hai bhai bhout badiya " and like "aare nahi
thodi aur mehanet karo" and please ranking pe honest advice dena like
"ranking pe mehanet kar kya hai ye" and so on and please emoji aur alphabet ke alwa kuch aur mat 
karna kuch faltu symbol nahi hain and please emoji aache se
and jayada se jayada use karna and short and 
crispy hona chahiea and haa data aaise dena taaki wo 2025 resolution ke liye lage
pehele to wish karna that happy new year and then thoda seriosly saare data dena that
kahan kahan improvment ki need hai and kahan kahan bdiya kar raha hai user and please maine 
btya hai faltu koi symbol use karne ke need nahi hai sirf emoji aur data and kuch faltu symbol use nahi
like *** ye to bilkul use mar karna and chota data rakhna please chota matlab chota  and data thoda chota
rakh to the point rakh faltu ka lamba paragraph mat rakhna
data takki user ko easily saamjh aa jaye. now do not respond me to anything except the resolution data `;


const result = await model.generateContent(prompt);
let userdata = result.response.text();

res.json({
    userdata: userdata
})

console.log(userdata)


})

app.listen(PORT , ()=>{
    console.log(`The server is running on the PORT number ${PORT}`)
})