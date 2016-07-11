'use strict';

const express = require('express');
const request = require('request');
const Stock = require('../models/generalStock');

let router = express.Router();


router.get('/:id', (req,res) => {
  console.log("Request", req.params.id);
  request.get({
    url: `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${req.params.id}&callback=myFunction`
  },
  function(err, response,body) {
    if(!err){
      res.send(body)
    }

  }
)

})

router.get('/', (req,res) => {
  Stock.find({}, (err, stocks) => {
    res.status(err ? 400 : 200).send(err || stocks)
  })
})

router.post('/', (req,res) => {
  Stock.create(req.body, (err, symbol) => {
    res.status(err ? 400 : 200).send(err || symbol)
  })
})

router.route('/:id')
  .delete(function(req,res){
  	Stock.findByIdAndRemove(req.params.id, err => {
  		res.status(err? 400:200).send(err);
  	});
  });

router.get('/:id', (req,res) => {
  Stock.find({symbol: req.params.id}, (err, stock) => {
    res.status(err? 400:200).send(err || stock);
  })
})



  module.exports = router;
