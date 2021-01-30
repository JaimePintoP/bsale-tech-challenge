const { Sequelize } = require('sequelize')

class DB {
  constructor() {
    this.db = new Sequelize('bsale_test', 'bsale_test', 'bsale_test', {
      host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
      dialect: 'mysql',
      define: {
        freezeTableName: true,
      },
    })
  }

  get client() {
    if (!this.db) {
      throw new Error('DB not initialized')
    }
    return this.db
  }
}

const db = new DB()

module.exports = db
