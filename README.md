Primeiramente, para baixar as dependências execute o comando:
yarn install

O schema do banco de dados está localizado na pasta database

Em seguida, rode o banco de dados com:
node src/database/index.js

E então, execute a aplicação com:
node src/index.js

A aplicação utiliza NodeJS e Postgres e possui as rotas
GET /users
POST /users
PUT /users/id

Exemplo de chamada POST
{
"name": "Jorge Lopes",
"email": "jorge@mail.com",
"password": "HASHJjsajsaajs1!",
"cpf": "93811882719",
"salary": 1200,
"gender": "M",
"politically_exposed": false
}

Verificações feitas:
Nomes devem conter duas palavras e não podem conter números
Email deve seguir o formato <>@<>.<>
Senhas dever conter pelo menos 8 caracteres com 1 letra 1 numero e 1 simbolo
CPF devem ser 11 números e deve ser válido
Salário deve ser um número
Gênero deve ser "M", "F" ou "O"
Politicamente exposto deve ser true ou false

Exemplo de chamada PUT
{
"name": "Rogerio Marinho",
"email": "rogeriomarinho@mail.com",
"password": "Guash91!!jsazs",
"salary": 1300.45,
"gender": "M",
"politically_exposed": false
}
