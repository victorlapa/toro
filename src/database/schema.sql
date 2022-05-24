CREATE DATABASE toro;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL, 
  cpf CHAR(11) NOT NULL,
  salary INT NOT NULL,
  gender CHAR(1) NOT NULL,
  politically_exposed BOOLEAN NOT NULL,
  balance NUMERIC(2) NOT NULL DEFAULT 0.00
);

CREATE TABLE orders(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID,
  price INT NOT NULL,
  finished BOOLEAN,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

