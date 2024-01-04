// load necessary modules
const express = require('express');
const apiRouter = express.Router();

// add any routes you/ve defined in other files
const appKeyRouter = require('./appkey');
apiRouter.use('/appKey', appKeyRouter);

// add the default error handler
apiRouter.use((err, req, res, next) => {
  res.status(500).send(err);
})

module.exports = apiRouter;
