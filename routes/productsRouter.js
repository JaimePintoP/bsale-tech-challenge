const express = require('express')
const db = require('../db')
const url = require('url')
const Product = require('../models/Product')
const { Op } = require('sequelize')

const router = express.Router()

router.get('/products', async (req, res) => {
  const { q } = url.parse(req.url, true).query

  if (q) {
    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${q}%`,
        },
      },
    })
    return res.json(products)
  }
  const products = await Product.findAll()
  res.json(products)
})

module.exports = router
