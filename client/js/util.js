// Helper to format currency to chilean peso
const currencyFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
})

module.exports = { currencyFormatter }
