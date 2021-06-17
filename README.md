# Pojeto para a grade de Microsserviços do Infnet
## Instalação

- Antes de rodar o programa rode o comando npm i nas raizes de cada microsserviço (StudentApi e ActivityApi) pelo terminal.

## Build

- Para buildar as APIs vá pelo terminal até as pastas onde se encontram os controllers e rode o comando:

`node [node do arquivo do controller]`

-   No exemplo a seguir estou rodando o controller de Atividades: 

`node ActivitesController`

## Test

- Para testar rode o comando abaixo na raiz da API de estudantes (/studenApi):

`mocha`

## Swagger

- Para verificar rodar o Swagger execute o comando na pasta raiz da api (studentApi, por exemplo). 

`npm run swagger-autogen`

- Este comando irá subir a aplicação também e o swagger pode ser verificado em:

`http://localhost:3000/doc`


