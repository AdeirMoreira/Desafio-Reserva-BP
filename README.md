# Desafio-Reserva-BP


Projeto Full-Stack para o desafio Reserva BP. No Front-End, uma aplicação Vue3 e typescript para fazer login e cadastrar usuários. Cadastrados e logados, os usuários, corretores ou clientes, podem ver, criar e editar 
ou desmarcar suas reniões marcadas. No Back-End, foi uma API NodeJS e typescript que trata os dados e os armazena em um banco de dados MySQL. O Docker foi usado para rodar o Front, Back e o Banco de dados em contêineres.

## Screenshots do site 📸

<p  align="center">
    <img src="" width="300" height="200">
    <img src="" width="300" height="200">
<p/>

## Tecnologias 🛠

#### Front-end
- [Vue3](https://vuejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/getting-started.html)
- [Vuesax](https://lusaxweb.github.io/vuesax/development/#quick-start-cdn)
- [Vuelidate](https://vuelidate-next.netlify.app/#installation)

#### Back-end
- [Node](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [typeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [Axios](https://www.npmjs.com/package/axios)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Class-Validator](https://github.com/typestack/class-validator)
- [Jest](https://jestjs.io/pt-BR/)

## Requisitos atendidos ✔

- ✅ Crud de Usuários
- ✅ Sistema de agendamentos
- ✅ Banco de dados MySQL
- ✅ Aplicação dockerizada
- ✅ Validação de dados na API (class-validator)
- ✅ Biblioteca de estilização (Vuesax)
- ✅ Hash e Sanitização de dados sensíveis no backend
- ✅ Documentaçãp da API com Swagger
- ✅ Testes Unitários
- ✅ Usar typescript (front e back)

## Como o projeto funciona? ❓

#### Front-end

A primeira tela é a de login, ao digitar um email e uma senha são exibidos mensagens de feedback caso não estejam corretos. Caso os dados estejam corretos o login será efetuado, 
encaminhando o usuario para tela principal. Há um link na tela de login para encaminhar o usuário para a tela de cadastro. No formulário há validações nos campos email, que deve ser único, e senha, 
que deve conter pelo menos 8 caracteres. O usuário criado pode ser Corretor ou Cliente, Caso esse usuário seja um corretor, este poderá ver suas reuniões agendadas por meio de uma tabela com informações
de data e hora de início e fim da reunião e do nome do cliente que marcou aquela reunião com aquele corretor. Caso o usuário seja um cliente, além de ver as reunuões que agendou, poderá agendar e editar reuniões 
com os corretores, por meio de um modal no qual o cliente deve selecionar o corretor, a data e hora de inicio e fim da reunião, o cliente também pode desmarcar a reunião. Além dos sistemas de login e agendamento de reuniões, a aplicação Vue implmenta gerenciamento de estado por meio da biblioteca Pinia.

#### back-end

A api foi desenvolvida com nodeJs e typescript seguindo o padrão de projeto 'Feature by Package' e conceitos fortemente inspirados no framework NestJS. Possui as camadas controladores, serviços e repositorios. As rotas 
requerem autenticação por token obtido por meio do login e autorização por tipo de usupário. Todos os dados recebidos por cada endpoint são validados em DTOs com a biblioteca class-validator e os erros são tratados em uma camada superior e retornam mensagens amigaveis. Existem 3 modulos Autenticação(Auth), Usuários(Users) e Reuniões(Meetings). O módulo de autenticação realiza a emisão e verificação de token Jwt e o controle de acesso 
a rotas baseadas no tipo de usuário. No módulo de usuários, podemos fazer a leitura, criação, edição e exclusão dos dados. No momento da criação dos usuários é feita a vericação da condição de email único, além de fazer 
um hash da senha do usuário antes de salva-la no banco de dados para maior segunraça. No módulo de Reuniões também podemos fazer um crud dos dados. Há varios tipos de valições antes de se fazer a inseção, como a  verificação
da condição da reunião ter entre 30 munutos e 2 horas, verificação a existencia do corredor e do cliente. Há também validção se não há conflito de agenda tanto do corretor quanto do cliente para se evitar que o horário uma reunião não ocupe o horário de outra. A manipulação do banco de dados foi feita atraves do framework TypeORM em uma camada de repositório. Também foi implementado sistema de migrações para maior controle das alteraões no banco de dados. Há também teste unitários com biblioteca Jest. A Api foi documetada com Swagger disponivel por meio da hora '/api-docs'.

## Rodando o projeto 🔛
#### 1️⃣ Clonar e abrir
```
git clone git@github.com:AdeirMoreira/Desafio-Reserva-BP.git
cd Desafio-Reserva-BP
```

Renomeie o arquivo ```.env.exemple``` para ```.env``` e configure as variaveis de ambiente como preferir.

Caso você não pretenda usar o docker para rodar o banco de dados ou a api ou o app vue, lembre-se de comentar o serviço do arquivo docker-compose.yaml

#### 2️⃣ Iniciar os Contêineres
```
docker compose up
```

O projeto necessita apenas do comando acima para rodar. Durante o processo, o container do banco de dados irá subir primeiro, em seguinda o container do vue app irá subir e comecerá a instalar as dependencias, 
ao terminar irá subir subir a aplicação Vue. O container da api aguardará até que o banco de dados esteja disponível. Quando o banco de dados estiver dispónivel para novas conexões, 
o container da api começará a instalar as dependencias e logo em seguida rodará as migrações para criar e popular as tabelas e por fim subirá o servidor da api. 

Quando essas duas mensagens aparecerem no terminal, o projeto estará pronto para ser usado.
```
➜  Local:   http://localhost:5173/
➜  Network: http://172.23.0.2:5173/
```
``` 
Server is running in http://localhost:3003
Database has been initialized!
```

####  [Vue-App](http://localhost:5173/) 🟢

O Vue-React rodará na porta 5173 e estará disponivel no endereço http://localhost:5173. 

####  [API-Node](http://localhost:3003/) 🟢

A API Node, por sua vez, rodará na porta 3003 e seu endereço base é http://localhost:3003.

###  Documentação Swagger 📗

A documentação do Swagger ficará disponivel assim que a api estiver de pé no endereço http://localhost:3003/api-docs

### Testes Unitários 🧪

Para rodar os testes unitários basta estar na pasta da api de dar o seguinte comando
```
npm run test
```

#### Migrações 🔝
Para criar um arquivo de migração
```
npm run typeorm:create src/database/migrations/nome-da-sua-migration
```
Para rodar sus migrations pendentes 
```
npm run typeorm:run
```
Para reverter suas migrations processadas
```
npm run typeorm:revert
```



## 👨‍💻 Desenvolvedor
<table>         
<td><a href="https://github.com/future4code/silveira-Adeir-Maia"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/98994187?v=4" width="100px;" alt="Imagem profile Adeir Moreira desenvolvedor"/><br /><sub><b>Adeir Moreira</b></sub></a><br />   
</table>


