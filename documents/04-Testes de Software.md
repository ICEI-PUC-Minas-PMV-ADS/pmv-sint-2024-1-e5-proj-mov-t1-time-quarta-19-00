# Planos de Testes de Software

Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.


# Plano de Teste


## Caso de Teste CT-01: Acesso ao Feed

| Requisito Associado | RF-001 - Os usuários podem acessar o feed de postagens. |
|---------------------|---------------------------------------------|
| **Propósito do Teste** | Verificar se os usuários conseguem acessar o feed de postagens. |
| **Procedimentos**   | Abrir o app. |
| **Critério de Sucesso** | Deve exibir as últimas postagens feitas pelos usuários e um botão que permita fazer login. |

---

## Caso de Teste CT-02: Cadastro de Instituição

| Requisito Associado | RF-002 - O sistema deve permitir o cadastro de novas instituições. |
|---------------------|---------------------------------------------------|
| **Propósito do Teste** | Verificar se o sistema permite o cadastro de novas instituições. |
| **Procedimentos**   | 1. Acessar o formulário de cadastro de instituições, preencher todos os campos e tocar em "Cadastrar" |
| **Critério de Sucesso** | Redirecionamento para a página inicial e cadastro com sucesso da instituição na tabela de instituiçõs do BD. |

---

## Caso de Teste CT-03: Cadastro de Usuário

| Requisito Associado | RF-003 - Os usuários podem se cadastrar no sistema. |
|---------------------|---------------------------------------------|
| **Propósito do Teste** | Verificar se os usuários conseguem se cadastrar no sistema. |
| **Procedimentos**   | 1. Acessar o formulário de cadastro de usuários, preencher todos os campos e tocar em "Cadastrar" |
| **Critério de Sucesso** | Redirecionamento para a página inicial e cadastro com sucesso do usuário na tabela de usuários do BD. |

---

## Caso de Teste CT-04: Login

| Requisito Associado | RF-004 - Os usuários podem fazer login no sistema. |
|---------------------|---------------------------------------------|
| **Propósito do Teste** | Verificar se os usuários conseguem fazer login no sistema. |
| **Procedimentos**   | 1. Acessar a página de login, preencher os campos username e senha, e tocar em em "Login" |
| **Critério de Sucesso** | Redirecionamento para a página inicial após o login, exibindo a foto de perfil do usuário e habilitando funcionalidades de interação. |

---

## Caso de Teste CT-05: Comentário Post

| Requisito Associado | RF-005 - Os usuários podem adicionar comentários nas postagens do feed. |
|---------------------|---------------------------------------------|
| **Propósito do Teste** | Verificar se os usuários conseguem comentar em postagens. |
| **Procedimentos**   | 1. Selecionar a opção de comentários de qualquer postagem do feed e adicionar um comentário, tocando no botão 'Comentar'.|
| **Critério de Sucesso** | O comentário é incluído na lista de comentários da postagem e visível a todos usuários. |

---

## Caso de Teste CT-06: Curtir Post

| Requisito Associado | RF-006 - Os usuários podem curtir postagens no feed. |
|---------------------|---------------------------------------------|
| **Propósito do Teste** | Verificar se os usuários conseguem curtir postagens no feed. |
| **Procedimentos**   | 1. Acessar uma postagem no feed e tocar no botão "Gostei". |
| **Critério de Sucesso** | O botão "Gostei" muda de tonalidade para refletir o sucesso da interação e deve ser somado um "gostei" no contador de likes do feed para a postagem em questão. |

---

## Caso de Teste CT-07: Criar Post

| Requisito Associado | RF-007 - As instituições podem criar novas postagens no feed. |
|---------------------|---------------------------------------------|
| **Propósito do Teste** | Verificar se as instituições conseguem criar novas postagens. |
| **Procedimentos**   | 1. Efetuar o login no Hub da Solidariedade com uma conta de instituição, navegar até a página de criação de postagens, preencher o formulário de criação de postagens e tocar em <confirmar nome do botão> |
| **Critério de Sucesso** | A nova postagem é exibida corretamente no feed após a publicação. |

---

## Evidências de Testes de Software

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.
