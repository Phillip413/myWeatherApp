// api route

const express = require('express');
const appKeyRouter = express.Router();

appKeyRouter.get('/', async (req, res, next) => {
  try {
    const apiAccessKey = process.env.REACT_APP_API_ACCESS_KEY
    const myData = {key: apiAccessKey}
   
    res.data = myData;

    res.json({success: true, data: res.data })
  } catch (err) {
    next(err);
  }
})

module.exports = appKeyRouter;
