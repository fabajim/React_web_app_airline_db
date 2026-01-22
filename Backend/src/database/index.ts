import sequelize from './sequelize';
import { setupAssociations } from './associations';

export async function initDatabase() {
  await sequelize.authenticate();
  setupAssociations();
  await sequelize.sync();
}