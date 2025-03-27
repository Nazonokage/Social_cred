import { Sequelize } from 'sequelize';

// Direct config (no dotenv)
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'social_credit',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false // Disable automatic createdAt/updatedAt
  },
  logging: false // Disable SQL logging in console
});

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize connected to MySQL');
  } catch (error) {
    console.error('Sequelize connection error:', error);
  }
})();

export default sequelize;