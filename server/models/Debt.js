import sequelize from './db.js';
import { DataTypes } from 'sequelize';

// In your Debt model definition
const Debt = sequelize.define('Debt', {
  DID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // This will auto-generate UUIDs
    primaryKey: true,
    allowNull: false
  },
  UID: {
    type: DataTypes.BLOB,
    allowNull: false
  },
  Data: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'debts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default Debt;