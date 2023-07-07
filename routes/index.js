import express from 'express'
import axios from 'axios'
// import { Configuration, OpenAIApi } from 'openai'
import 'dotenv/config'
var router = express.Router();

const app = axios.create({
  baseURL: 'https://api.openai.com/v1',
})

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
//   basePath: "https://api.aiproxy.io/v1",
// });

// const openai = new OpenAIApi(configuration)
const apiKeys = process.env.OPENAI_API_KEY.split(',')
let currentKey = -1
/* GET home page. */
router.get('/', async function (req, res, next) {
  let { query } = req
  console.log(query)
  try {
    // let { data } = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [{role: "user", content: "你好"}],
    //   stream: true
    // }, {
    //   responseType: 'stream'
    // });
    if (currentKey > 2) {
      currentKey = 0
    }
    currentKey += 1
    let { data } = await app.post('/chat/completions', {
      "model": "gpt-3.5-turbo",
      "messages": JSON.parse(query.content),
      "temperature": 0.7,
      stream: true
    },
    {
      responseType: 'stream',
      headers: {
        Authorization: `Bearer ${apiKeys[currentKey]}`,
      }
    })
    console.log('当前key:', apiKeys[currentKey])
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    data.pipe(res)
    // res.send('ok')
  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

export default router
