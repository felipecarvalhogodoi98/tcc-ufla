# Arquitetura Monolítica vs Microsserviços

Este repositório contém as implementações desenvolvidas para o meu Trabalho de Conclusão de Curso (TCC), intitulado **"Arquitetura Monolítica vs Microsserviços"**. O objetivo do trabalho é comparar as duas arquiteturas com base em cenários da literatura e avaliar suas vantagens, desvantagens e casos de uso ideais.

## Sobre o Trabalho

Para cada cenário identificado na literatura, foram implementadas APIs utilizando ambas as arquiteturas:

- **Monolítica**: Uma única aplicação que concentra toda a lógica e funcionalidades.
- **Microsserviços**: Divisão da aplicação em pequenos serviços independentes e específicos.

As implementações permitem análise de desempenho, escalabilidade, manutenibilidade e complexidade de cada abordagem.

## Tecnologias Utilizadas

As seguintes tecnologias foram utilizadas no projeto:

- **[Node.js](https://nodejs.org/)**: Para desenvolvimento das APIs.
- **[SQLite](https://www.sqlite.org/)**: Banco de dados leve para persistência de dados.
- **[Docker](https://www.docker.com/)**: Contêineres para isolar e executar os serviços.
- **[Kubernetes](https://kubernetes.io/)**: Orquestração de contêineres.
- **[Nginx](https://www.nginx.com/)**: Proxy reverso e balanceamento de carga.
- **[Skaffold](https://skaffold.dev/)**: Ferramenta para automação do desenvolvimento e deploy no Kubernetes.

## Estrutura do Repositório

O repositório está organizado por cenários, com implementações separadas para as arquiteturas monolítica e de microsserviços.

```
 . 
 ├── cenarioX 
 │ ├── monolithic 
 │ └── microservices 
 │ └── README.md
 ├── cenarioXX 
 │ ├── monolithic 
 │ ├── microservices 
 │ └── README.md
 ... 
 └── README.md 
 ```


Cada pasta contém o código-fonte necessário para rodar as APIs de cada cenário.

## Como Executar

### Pré-requisitos

- Docker e Docker Compose instalados.
- Kubernetes configurado (por exemplo, Minikube ou um cluster em nuvem).
- Skaffold instalado.

### Passos

1. Clone o repositório:
   ```bash
   git clone git@github.com:felipecarvalhogodoi98/tcc-ufla.git
   cd seu-repositorio
   ```
2. Acesse o cenário desejado e a arquitetura:
3. Arquitetura monolítica
   ```bash
   cd cenarioX/monolithic
   docker-compose up
   ```

4. Arquitetura de microsserviços
   ```bash
   cd cenarioX/microsservices
   skaffold dev
   ```

4. Obs: Para cada cenário é disponibilizado uma collection do postman para realizar testes no app.