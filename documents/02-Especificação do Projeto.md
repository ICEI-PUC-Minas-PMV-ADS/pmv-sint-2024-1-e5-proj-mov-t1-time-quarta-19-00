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

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

## Modelo ER (Projeto Conceitual)

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

Sugestão de ferramentas para geração deste artefato: LucidChart e Draw.io.

A referência abaixo irá auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

## Projeto da Base de Dados

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.


## Arquitetura e Tecnologias

o	Descreva brevemente a arquitetura definida para o projeto e as tecnologias a serem utilizadas. Sugere-se a criação de um diagrama de componentes da solução.

## Project Model Canvas

Colocar a imagem do modelo construído apresentando a proposta de solução.

> **Links Úteis**:
> Disponíveis em material de apoio do projeto
