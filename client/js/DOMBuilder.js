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
