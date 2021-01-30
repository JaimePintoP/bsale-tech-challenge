const { Sequelize } = require('sequelize')

/**
 * DB Class to manage DB connection
 */
class DB {
  constructor() {
    this.db = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        define: {
          freezeTableName: true,
        },
      }
    )
  }

  /**
   * Getter for DB client. Handles the case when connection is not ready yet
   */
  get client() {
    if (!this.db) {
      throw new Error('DB not initialized')
    }
    return this.db
  }
}

// Export singleton class instance to handle DB connection app-wide
const db = new DB()

module.exports = db
