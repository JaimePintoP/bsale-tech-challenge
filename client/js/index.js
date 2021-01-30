const DOMBuilder = require('./DOMBuilder')

// Async IIFE to handle all initial page behaviour
;(async () => {
  // Instantiate new DOMBuilder for DOM building operations
  const productsBuilder = new DOMBuilder(
    document.getElementById('products-grid')
  )

  // First request for products
  const productsResponse = await fetch('/products')
  const products = await productsResponse.json()

  // Set full product list as current
  productsBuilder.setProducts(products)

  // Build product list using current products
  productsBuilder.buildList()

  // Retrieve relevant elements to add listeners
  const searchForm = document.getElementById('search-form')
  const filtersToggle = searchForm.querySelector('#filters-toggle')
  const searchFilters = searchForm.querySelector('#search-filters')

  // Toggle filters div when clicking on filter button
  filtersToggle.addEventListener('click', (e) => {
    searchFilters.classList.toggle('d-none')
  })

  // Add event listener to handle products sorting and re-render
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

  // On submit search form, fetch filtered products and render them
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
