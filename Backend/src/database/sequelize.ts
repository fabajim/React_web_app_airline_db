import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';

dotenv.config();
const PW = process.env.PASSWORD;

const sequelize = new Sequelize('airlineDb', 'root', PW, {
        host: 'localhost',
        dialect: 'mysql'
});

export default sequelize;