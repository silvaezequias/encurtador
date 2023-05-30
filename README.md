# Encurtador de URLs

Este é um serviço de encurtamento de URLs que recebe uma URL como parâmetro e a encurta seguindo algumas regras específicas. O projeto permite que você salve as URLs encurtadas em um banco de dados, atribua um prazo de validade e redirecione as solicitações para as URLs originais.

Esse projeto não está pronto para ser usado em produção, é apenas uma representação de uma ideia. ([backend-br/encurtador-de-url](https://github.com/backend-br/desafios/blob/master/01-Easy/EncurtadorDeURL/README.md))

## Funcionalidades

- Encurta URLs longas, criando uma versão curta personalizada.
- Armazena as URLs encurtadas no banco de dados.
- Define um prazo de validade para as URLs encurtadas.
- Redireciona as solicitações de URLs encurtadas para as URLs originais.
- Gerencia e mantém um banco de dados para armazenamento das URLs.

## Requisitos

Certifique-se de ter os seguintes requisitos instalados em seu ambiente de desenvolvimento:

- Node.js (versão 16.X)
- Banco de dados (MongoDB)

## Instalação

1. Clone este repositório para o seu ambiente local.
2. Acesse o diretório do projeto e execute o comando `npm install` para instalar as dependências.
3. Configure as informações do banco de dados no arquivo `.env`.
4. Execute o comando `npm start` para iniciar o servidor.

## Uso

Após a instalação e execução do servidor, você poderá realizar as seguintes ações:

1. Enviar uma requisição para encurtar uma URL:
   - **Endpoint:** `POST /create`
   - **Parâmetros da requisição:** `{ "url": "URL_LONGA" }`
   - **Resposta:** `{ "newUrl": "URL_CURTA" }`

2. Acessar uma URL encurtada:
   - Digite a URL curta em um navegador ou faça uma requisição HTTP GET para a URL curta.
   - O servidor redirecionará para a URL original se estiver dentro do prazo de validade.

## Configuração do Banco de Dados

Certifique-se de configurar corretamente as informações do banco de dados no arquivo `.env`. 

Exemplo:

```env
DATABASE_URL="url de conexão com o banco de dados"
```

## Contribuição

Se você quiser contribuir para este projeto, sinta-se à vontade para enviar pull requests. Todas as contribuições são bem-vindas!

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
