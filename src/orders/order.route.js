const express = require('express');
const { createAOrder, getOrderByEmail } = require('./order.controller');
const router = express.Router()

//create order
router.post("/",createAOrder)

//get order
router.get('/email/:email',getOrderByEmail)

module.exports =router;