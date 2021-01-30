const { currencyFormatter } = require('./util')

/**
 * DOMBuilder class handles DOM element creation for product list on client-side
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
