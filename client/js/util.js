/**
 * Helper for formatting currency strings/numerics to chilean peso strings
 */
const currencyFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
})

module.exports = { currencyFormatter }
