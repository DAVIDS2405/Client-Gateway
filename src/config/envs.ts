import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  // PRODUCTS_MS_HOST: string;
  // PRODUCTS_MS_PORT: number;
  // ORDERS_MS_HOST: string;
  // ORDERS_MS_PORT: number;
  NATS_SERVERS: string[];
  // DATABASE_URL: string;
}

const envSchemas = joi
  .object({
    PORT: joi.number().required(),
    // PRODUCTS_MS_HOST: joi.string().required(),
    // PRODUCTS_MS_PORT: joi.number().required(),
    // ORDERS_MS_HOST: joi.string().required(),
    // ORDERS_MS_PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),

    // DATABASE_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchemas.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  // products_ms_port: envVars.PRODUCTS_MS_PORT,
  // products_ms_host: envVars.PRODUCTS_MS_HOST,
  // orders_ms_port: envVars.ORDERS_MS_PORT,
  // orders_ms_host: envVars.ORDERS_MS_HOST,
  natsServer: envVars.NATS_SERVERS,

  // databaseUrl: envVars.DATABASE_URL,
};
