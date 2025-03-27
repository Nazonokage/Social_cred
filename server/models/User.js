import sequelize from './db.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
  UID: {
    type: DataTypes.UUID, // Change from STRING to UUID
    defaultValue: DataTypes.UUIDV4, // Auto-generate UUIDv4
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  credit_score: {
    type: DataTypes.INTEGER,
    defaultValue: 1000
  },
  date_created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users',
  timestamps: false
});

export default User;