(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { currencyFormatter } = require('./util')

class DOMBuilder {
  constructor(container) {
    this.container = container
    this.products = []
  }

  setProducts(products) {
    this.products = products
  }

  getProducts() {
    return this.products
  }

  clear() {
    this.container.innerHTML = ''
    return this
  }

  noProductsFound() {
    this.container.append('No products found!')
  }

  buildList() {
    if (!this.products.length) {
      return this.noProductsFound()
    }
    this.products.forEach((p) => {
      this.container.append(this.buildProduct(p))
    })
  }

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

},{"./DOMBuilder":1}],3:[function(require,module,exports){
const currencyFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
})

module.exports = { currencyFormatter }

},{}]},{},[2]);
