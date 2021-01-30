const DOMBuilder = require('./DOMBuilder')

;(async () => {
  const builder = new DOMBuilder(document.getElementById('products-grid'))

  const productsResponse = await fetch('/products')
  const products = await productsResponse.json()

  builder.buildList(products)

  document
    .getElementById('search-form')
    .addEventListener('submit', async (e) => {
      e.preventDefault()
      const filteredResponse = await fetch(
        `/products?q=${e.target.firstElementChild.value}`
      )

      const filteredProducts = await filteredResponse.json()
      builder.clear()
      builder.buildList(filteredProducts)
    })
})()
