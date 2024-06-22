# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

O problema central é a falta de uma plataforma centralizada que conecte instituições públicas, como Asilos e ONGs, com membros da comunidade interessados em se envolver em ações sociais e voluntariado. Isso resulta em uma comunicação fragmentada, dificultando o acesso a informações sobre atividades, necessidades e oportunidades de voluntariado.

## Ideia geral de Solução

Propomos a criação de um hub online, onde instituições públicas podem cadastrar-se livremente e compartilhar informações sobre seus estabelecimentos, atividades, necessidades e oportunidades de voluntariado. Os membros da comunidade podem se cadastrar para acessar essas informações, se engajar em ações sociais, fazer doações e interagir com outras pessoas e instituições.

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

| ID          | Descrição do Requisito                                                                | Prioridade |
|-------------|---------------------------------------------------------------------------------------|------------|
| RF-001      | Implementar um sistema de cadastro intuitivo para que instituições públicas possam registrar informações detalhadas sobre suas atividades, necessidades e oportunidades de voluntariado. | ALTA       |
| RF-002      | Desenvolver um mecanismo de busca e filtragem eficiente para que os membros da comunidade possam encontrar facilmente instituições próximas e oportunidades de voluntariado relevantes. | ALTA       |
| RF-003      | Integrar um sistema de gestão de doações para permitir que os usuários façam doações de forma fácil e segura às instituições participantes. | ALTA       |
| RF-004      | Criar um feed de notícias e eventos para manter os usuários atualizados sobre as atividades das instituições e as oportunidades de envolvimento comunitário. | ALTA       |

### Requisitos não Funcionais

| ID          | Descrição do Requisito                                                      | Prioridade |
|-------------|-----------------------------------------------------------------------------|------------|
| RNF-001     | Implementar medidas de segurança robustas para proteger os dados sensíveis dos usuários e das instituições contra acessos não autorizados e violações de privacidade. | ALTA       |
| RNF-002     | Desenvolver uma interface de usuário (UI) intuitiva e responsiva, seguindo os princípios de design UX, para garantir uma experiência agradável e eficaz para os usuários.   | ALTA       |
| RNF-003     | Projetar a aplicação de forma escalável, utilizando arquiteturas e tecnologias adequadas que permitam lidar com um aumento significativo no número de usuários e transações. | ALTA       |
| RNF-004     | Garantir um tempo de resposta rápido e tempos de carregamento mínimos, otimizando o desempenho da aplicação e oferecendo uma experiência fluida para os usuários, mesmo em condições de carga elevada. | ALTA |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

| ID | Restrição                                                                                                       |
|----|-----------------------------------------------------------------------------------------------------------------|
| 01 | O aplicativo será desenvolvido utilizando o framework React Native, que permite a criação de aplicativos móveis multiplataforma com JavaScript.|
| 02 | O aplicativo será compatível com dispositivos Android que possuam a versão mínima do sistema operacional definida como Android 6.0 (API nível 23) para garantir uma ampla abrangência de dispositivos suportados.|
| 03 | A aplicação será otimizada para oferecer uma experiência de usuário fluida e responsiva, utilizando técnicas como carregamento assíncrono, caching e renderização otimizada.|
| 04 | A interface do usuário será desenvolvida seguindo as diretrizes de design Material Design para Android, proporcionando uma aparência visual consistente e familiar aos usuários do Android.|
| 05 | O aplicativo será testado em uma variedade de dispositivos Android, utilizando ferramentas como o emulador Android Studio e dispositivos físicos para garantir compatibilidade e desempenho em diferentes configurações.|
| 06 | Todas as dependências e bibliotecas utilizadas no aplicativo serão cuidadosamente avaliadas quanto à sua segurança e compatibilidade com o React Native, para garantir a estabilidade e a segurança da aplicação.|

## Diagrama de Casos de Uso

<center><img width="300px" src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-time-quarta-19-00/assets/22857183/b42681cf-071c-4728-9956-92d33f06812d"></center>

## Projeto da Base de Dados

<center>
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-time-quarta-19-00/assets/22857183/3d5f6949-e646-41af-a389-77d94867e933" width="300px" >
</center>

## Arquitetura e Tecnologias

<center>
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-time-quarta-19-00/assets/22857183/aa537b22-6e08-4844-8c10-cc3425420203" width="300px" >
</center>

Como tecnologias adotaremos na API a utilização da linguagem de programação Python com o FastAPI, em banco de dados utilizaremos o sqlite e o aplicativo será desenvolvido utilizando como base o React Native.
