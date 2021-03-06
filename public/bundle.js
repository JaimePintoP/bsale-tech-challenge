(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { currencyFormatter } = require('./util')

/**
 * DOMBuilder class handles DOM element creation for product list
 */
class DOMBuilder {
  /**
   *
   * @param {HTMLElement} container - An HTML element that serves as container for inserted elements
   */
  constructor(container) {
    this.container = container
    this.products = []
  }

  /**
   * Sets current products list in DOMBuilder instance
   * @param {Object[]} products - An array of products
   */
  setProducts(products) {
    this.products = products
  }

  /**
   * Retrieves current product list
   */
  getProducts() {
    return this.products
  }

  /**
   * Empties HTML content from container.
   * @returns {DOMBuilder} the instance of DOMBuilder for chaining methods
   */
  clear() {
    this.container.innerHTML = ''
    return this
  }

  /**
   * Appends message indicating that there were no products found
   */
  noProductsFound() {
    this.container.append('No products found!')
  }

  /**
   * Builds and appends product list to container based on
   * current products list. Note that this does not empty the
   * container element, so you have to do it manually
   * with .clear()
   */
  buildList() {
    if (!this.products.length) {
      return this.noProductsFound()
    }
    this.products.forEach((p) => {
      this.container.append(this.buildProduct(p))
    })
  }

  /**
   * Builds a single product card. Used by buildList
   * @param {Object} product - A single product with name, price and url_image (url_image is possibly empty)
   * @returns {HTMLElement} The assembled card
   */
  buildProduct({ name, price, url_image }) {
    const container = document.createElement('div')
    container.className = 'product-container'

    const cardBody = document.createElement('div')
    cardBody.className = 'product-body'

    const image = document.createElement('img')
    image.src =
      url_image ||
      'https://vermeeraustralia.com.au/wp-content/uploads/2016/12/attachment-no-image-available.png'

    const nameHolder = document.createElement('h3')
    nameHolder.className = 'product-name'
    nameHolder.innerText = name.toUpperCase()

    const cardFooter = document.createElement('div')
    cardFooter.className = 'product-footer'

    const priceHolder = document.createElement('p')
    priceHolder.className = 'product-price'
    priceHolder.innerText = currencyFormatter.format(price)

    cardFooter.append(priceHolder)
    cardBody.append(image)
    cardBody.append(nameHolder)
    container.append(cardBody)
    container.append(cardFooter)
    return container
  }
}

module.exports = DOMBuilder

},{"./util":3}],2:[function(require,module,exports){
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

},{"./DOMBuilder":1}],3:[function(require,module,exports){
// Helper to format currency to chilean peso
const currencyFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
})

module.exports = { currencyFormatter }

},{}]},{},[2]);
