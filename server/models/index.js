import User from './User.js';
import Debt from './Debt.js';


// Define relationships
User.hasMany(Debt, { foreignKey: 'UID' });
Debt.belongsTo(User, { foreignKey: 'UID' });

export { User, Debt };