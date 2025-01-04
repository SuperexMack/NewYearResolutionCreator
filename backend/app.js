const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT
const API_KEY = process.env.GEMINI_API_KEY
const axios = require('axios');
const cors = require("cors")
const cheerio = require("cheerio")

const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(cors())
app.use(express.json());


app.get("/" , (req,res)=>{
    res.json({
        msg : "Welcome to the website sir!!"
    })
})




// now here i am going to get the number of followers + following + total repo + commits here

// let getUserNameofGithub = req.body.githubUserName



let followerCount
let followingCount
let TotalRepo



app.post("/aiResponseData/github" , async(req,res)=>{
    let githubAccount = req.body.githubdata
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://github.com/${githubAccount}`,
        headers: { 
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
          'accept-language': 'en-US,en;q=0.9', 
          'cache-control': 'max-age=0', 
          'cookie': '_octo=GH1.1.1829435294.1728497097; _device_id=cc96b520fff52e9900829854d8ee8c27; saved_user_sessions=146699961%3AQjCe1Qrum18cSUjn5ZIo65jvzb92yxLFmZ01w0kVGBSG3yMm; user_session=QjCe1Qrum18cSUjn5ZIo65jvzb92yxLFmZ01w0kVGBSG3yMm; __Host-user_session_same_site=QjCe1Qrum18cSUjn5ZIo65jvzb92yxLFmZ01w0kVGBSG3yMm; logged_in=yes; dotcom_user=SuperexMack; color_mode=%7B%22color_mode%22%3A%22auto%22%2C%22light_theme%22%3A%7B%22name%22%3A%22light%22%2C%22color_mode%22%3A%22light%22%7D%2C%22dark_theme%22%3A%7B%22name%22%3A%22dark%22%2C%22color_mode%22%3A%22dark%22%7D%7D; cpu_bucket=md; preferred_color_mode=dark; tz=Asia%2FCalcutta; _gh_sess=fbR3jSDGaPW%2BC0gw3rbfj6ZKFhAT3sMT7iJfch37ZUXHnjthI6oURcJ7ml01hyA4yfcq4G%2F9kixJ%2FBVM7S%2FvZ4yf%2BO4m7VMoguS%2FLfYvHUklyR%2FGHnzU6rCPj1CpGSIhlKFVj%2BxhpsaBxlJ8PSqPvEelCuXilhaGHQU%2BUoTYgMgxyoguT%2BWtC2Ui1Ek9vgFq5iwgBy0trPKFaZXaDIr9GYbKKk37RjUGItBk7Z47hDWagLT8UX3xMKdy%2FRm4GkZNjfBbqh8oROvRAlhBAghdmgvhlq%2BMdtmWCT0coyGI0MHiTmtn67ny%2Fp9TSVH3ktCFZKIFQtRUfRtPaUz1BiF6WDvlo%2BQx%2BwgtCE8Bhw%3D%3D--TRA4FC2AcJuTFnBR--5ThsWdSekP0GzkTOjL0vCw%3D%3D; _gh_sess=VpLG4EcC0uI1Bzi%2BCASTtLyuDoQe1oLW41PZCF5TFJhJ3PHvZyugRwVCAQaEbqSBA8G4pgk5OojCkveaG2jEaAFGHK8trGg8MEzsP0SGHwLxEqc0Wsr%2FpOnswkCDVpdsMtrF4CUrpAMBipgd9w4apmAp9E%2B3uvjKxTs4J%2FWAeFGYBrPjwC4cJLrjWhR0yljuxC6yMDKc98rlbfFSjcBdBPkmC5TJPGKDLbWQHjOR%2BcnICG%2FFczBj0dXHmGrbvklC%2FjtUi6%2FwRc4O0b3DUNEzv%2BtNwWxhYWZDbiIU7lu9jwUnDXpBpVQu2GgBPB%2BAMe7YPMuS9O9xEAFXg8GFXsbBSiI%2B4WXbYQitJz6Nsw%3D%3D--ntbhJX8WUnmMYm%2Bw--bkT19JFsuYTRBEg5XQ51tA%3D%3D', 
          'if-none-match': 'W/"76db3be971d2fa68b18f531440045a4a"', 
          'priority': 'u=0, i', 
          'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"', 
          'sec-ch-ua-mobile': '?0', 
          'sec-ch-ua-platform': '"Linux"', 
          'sec-fetch-dest': 'document', 
          'sec-fetch-mode': 'navigate', 
          'sec-fetch-site': 'same-origin', 
          'sec-fetch-user': '?1', 
          'upgrade-insecure-requests': '1', 
          'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
        }
      };
      
      await axios.request(config)
      .then((response) => {
        const $ = cheerio.load(response.data)
        followerCount = $('span.text-bold').first().text().trim();
        console.log("The value of followerCount" + followerCount)
        followingCount = $('a[href*="following"] > span.text-bold.color-fg-default').text().trim();
        console.log("The value of following count is : " + followingCount)
        TotalRepo = $(`span:contains("Repositories")`).next(`span`).text().trim()
        console.log("The value of TotalRepo is : " + TotalRepo)
        // let TotalCommits = $(`action-menu`).next('h2').text()
        // console.log("The value of TotalCommits is : " + TotalCommits)
  
      })
      .catch((error) => {
        console.log(error);
      });


const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = `This is new year 2025 and i will give u some Github data like followerCount , followingCount , Total number of
  repo of the user now tumhe mai ye saab data dunga - ${followerCount} , ${followingCount} , ${TotalRepo} to jaise ke new year aa gya
  to sab loog apne apne resolution bnainge to tumhe in saab data ki help se user ki kami aur kya sahi hai wo btana hai
  and uske according user ko advice dena hai and so on and please emoji aur alphabet ke alwa kuch aur mat 
karna kuch faltu symbol nahi hain and please emoji aache se
and jayada se jayada use karna and short and 
crispy hona chahiea and haa data aaise dena taaki wo 2025 resolution ke liye lage
pehele to wish karna that happy new year and then thoda seriosly saare data dena that
kahan kahan improvment ki need hai and kahan kahan bdiya kar raha hai user and please maine 
btya hai faltu koi symbol use karne ke need nahi hai sirf emoji aur data and kuch faltu symbol use nahi
like *** ye to bilkul use mar karna and chota data rakhna please chota matlab chota  and data thoda chota
rakh to the point rakh faltu ka lamba paragraph mat rakhna
data takki user ko easily saamjh aa jaye please total data ka length 100 words rakhna
. now do not respond me to anything except the resolution data`;
  


const result = await model.generateContent(prompt);
let userdata = result.response.text();

res.json({
    usergithubData: userdata
})

console.log(userdata)

})




app.post("/aiResponseData" , async(req,res)=>{

  let userLeetcodeData = req.body.userLeetcodeData
    
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
rakh to the point rakh faltu ka lamba paragraph mat rakhna 100 words mai khatam kar dena  
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



