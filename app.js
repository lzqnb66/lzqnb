import express from 'express'
import routers from './routes/index.js'
import cors from 'cors'
// import path from 'path'
// import indexRouter from '../routes/index'

// let express = require('express')
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routers);

app.listen(3003, () => {
  console.log('http://127.0.0.1:3003')
})
// module.exports = app;
