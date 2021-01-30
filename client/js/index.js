const DOMBuilder = require('./DOMBuilder')

;(async () => {
  const productsBuilder = new DOMBuilder(
    document.getElementById('products-grid')
  )

  const productsResponse = await fetch('/products')
  const products = await productsResponse.json()
  productsBuilder.setProducts(products)

  productsBuilder.buildList()

  const searchForm = document.getElementById('search-form')

  const filtersToggle = searchForm.querySelector('#filters-toggle')
  const searchFilters = searchForm.querySelector('#search-filters')

  filtersToggle.addEventListener('click', (e) => {
    searchFilters.classList.toggle('d-none')
  })

  searchFilters.addEventListener('click', (e) => {
    if (!e.target.classList.contains('price-order')) return

    let sortingFunc

    if (e.target.value === 'asc') {
      sortingFunc = (a, b) => a.price - b.price
    } else if (e.target.value === 'desc') {
      sortingFunc = (a, b) => b.price - a.price
    } else {
      return
    }

    productsBuilder.getProducts().sort(sortingFunc)
    productsBuilder.clear().buildList()
  })

  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    searchFilters
      .querySelectorAll('.price-order')
      .forEach((radio) => (radio.checked = false))

    const filteredResponse = await fetch(
      `/products?q=${e.target.firstElementChild.value}`
    )

    const filteredProducts = await filteredResponse.json()
    productsBuilder.setProducts(filteredProducts)
    productsBuilder.clear().buildList()
  })
})()
