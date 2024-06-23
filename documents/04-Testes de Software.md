# Planos de Testes de Software

Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.


# Plano de Teste

## Requisitos Funcionais - Caso de Sucesso

## Caso de Teste CT-01: Acesso ao Feed

| Requisito Associado | RF-001 - Implementar um sistema de cadastro intuitivo para que instituições públicas possam registrar informações detalhadas sobre suas atividades, necessidades e oportunidades de voluntariado. |
|---------------------|---------------------------------------------|
| **Propósito do Teste** | Verificar se os usuários conseguem acessar o feed de postagens. |
| **Procedimentos**   | Abrir o app. |
| **Critério de Sucesso** | Deve exibir as últimas postagens feitas pelos usuários. |

---

## Caso de Teste CT-02: Cadastro de Instituição

| Requisito Associado | RF-001 - Implementar um sistema de cadastro intuitivo para que instituições públicas possam registrar informações detalhadas sobre suas atividades, necessidades e oportunidades de voluntariado. |
|---------------------|---------------------------------------------------|
| **Propósito do Teste** | Verificar se o sistema permite o cadastro de novas instituições. |
| **Procedimentos**   | 1. Acessar o formulário de cadastro de instituições, preencher todos os campos e tocar em "Cadastrar" |
| **Critério de Sucesso** | Redirecionamento para a página inicial e cadastro com sucesso da instituição na tabela de instituiçõs do BD. |

---

## Caso de Teste CT-03: Cadastro de Usuário

| Requisito Associado | RF-001 - Implementar um sistema de cadastro intuitivo para que instituições públicas possam registrar informações detalhadas sobre suas atividades, necessidades e oportunidades de voluntariado. |
|---------------------|---------------------------------------------|
| **Propósito do Teste** | Verificar se os usuários conseguem se cadastrar no sistema. |
| **Procedimentos**   | 1. Acessar o formulário de cadastro de usuários, preencher todos os campos e tocar em "Cadastrar" |
| **Critério de Sucesso** | Redirecionamento para a página inicial e cadastro com sucesso do usuário na tabela de usuários do BD. |

---

## Caso de Teste CT-04: Login

| Requisito Associado | RF-001 - Implementar um sistema de cadastro intuitivo para que instituições públicas possam registrar informações detalhadas sobre suas atividades, necessidades e oportunidades de voluntariado. |
|---------------------|---------------------------------------------|
| **Propósito do Teste** | Verificar se os usuários conseguem fazer login no sistema. |
| **Procedimentos**   | 1. Acessar a página de login, preencher os campos username e senha, e tocar em em "Login" |
| **Critério de Sucesso** | Redirecionamento para a página inicial após o login, exibindo a foto de perfil do usuário e habilitando funcionalidades de interação. |

---

## Caso de Teste CT-05: Comentário Post

| Requisito Associado |  RF-001 - Implementar um sistema de cadastro intuitivo para que instituições públicas possam registrar informações detalhadas sobre suas atividades, necessidades e oportunidades de voluntariado.|
|---------------------|---------------------------------------------|
| **Propósito do Teste** | Verificar se os usuários conseguem comentar em postagens. |
| **Procedimentos**   | 1. Selecionar a opção de comentários de qualquer postagem do feed e adicionar um comentário, tocando no botão 'Comentar'.|
| **Critério de Sucesso** | O comentário é incluído na lista de comentários da postagem e visível a todos usuários. |

---

## Caso de Teste CT-06: Curtir Post

| Requisito Associado | RF-004 - Criar um feed de notícias e eventos para manter os usuários atualizados sobre as atividades das instituições e as oportunidades de envolvimento comunitário. |
|---------------------|---------------------------------------------|
| **Propósito do Teste** | Verificar se os usuários conseguem curtir postagens no feed. |
| **Procedimentos**   | 1. Acessar uma postagem no feed e tocar no botão "Gostei". |
| **Critério de Sucesso** | O botão "Gostei" muda de tonalidade para refletir o sucesso da interação e deve ser somado um "gostei" no contador de likes do feed para a postagem em questão. |

---

## Caso de Teste CT-07: Criar Post

| Requisito Associado | RF-004 - Criar um feed de notícias e eventos para manter os usuários atualizados sobre as atividades das instituições e as oportunidades de envolvimento comunitário.  |
|---------------------|---------------------------------------------|
| **Propósito do Teste** | Verificar se as instituições conseguem criar novas postagens. |
| **Procedimentos**   | 1. Efetuar o login no Hub da Solidariedade com uma conta de instituição, navegar até a página de criação de postagens, preencher o formulário de criação de postagens e tocar em <confirmar nome do botão> |
| **Critério de Sucesso** | A nova postagem é exibida corretamente no feed após a publicação. |

---

## Caso de Teste CT-08: Editar Post

| Requisito Associado | RF-004 - Criar um feed de notícias e eventos para manter os usuários atualizados sobre as atividades das instituições e as oportunidades de envolvimento comunitário.  |
|---------------------|---------------------------------------------|
| **Propósito do Teste** | Validar se as instituições conseguem editar seus posts. |
| **Procedimentos**   | 1. Efetuar o login no Hub da Solidariedade com uma conta de instituição, navegar até configuração, tocar em meus posts, ler tudo no post que deseja editar, editar post e salvar post.|
| **Critério de Sucesso** | A postagem deve refletir as alterações realizadas pela edição. |

---

## Casos de Falha

## Caso de Teste CT-09: Instituição/Usuário não poderá se logar sem fornecer credenciais de acesso corretas.

| Requisito Associado | RF-004 - Criar um feed de notícias e eventos para manter os usuários atualizados sobre as atividades das instituições e as oportunidades de envolvimento comunitário.  |
|---------------------|---------------------------------------------|
| **Propósito do Teste** | Validar se o usuário ou instituição conseguiram fazer login com credenciais incorretas. |
| **Procedimentos**   | 1. Entrar na tela de login e colocar suas credencias, tocar em entrar.|
| **Critério de Sucesso** | Usuário/Instituição não conseguirá fazer login na aplicação. 



## Caso de Teste CT-10: Somente Instituição cadastrada consegue criar, deletar e apagar post; 

| Requisito Associado | RF-004 - Criar um feed de notícias e eventos para manter os usuários atualizados sobre as atividades das instituições e as oportunidades de envolvimento comunitário.  |
|---------------------|---------------------------------------------|
| **Propósito do Teste** | Validar se instituição irá conseguir fazer o post sem estar cadastrada |
| **Procedimentos**   | 1. Entrar no feed de login, configurações para fazer postagem, tentar fazer postagem.|
| **Critério de Sucesso** | A instituição não cadastrada não conseguirá criar o post, deletar o post ou edita-lo. |

---

## Caso de Teste CT-11: Usuário/Instituição não pode apagar comentário de outro(a) usuário/instituição

| Requisito Associado | RF-004 - Criar um feed de notícias e eventos para manter os usuários atualizados sobre as atividades das instituições e as oportunidades de envolvimento comunitário.  |
|---------------------|---------------------------------------------|
| **Propósito do Teste** | Validar se o usuário comum poderá apagar o comentário do outro usuário. |
| **Procedimentos**   | 1. Efetuar o login no Hub da Solidariedade com uma conta de usuário ou instituição, tocar em ler tudo, tocar em ver comentários e tentar apagar comentários de outros(as) usuários/instituições.|
| **Critério de Sucesso** | O(A) usuário/instituição não conseguir realizar o delete do comentário de outro(a) usuário/instituição. |

---


## Evidências de Testes de Software

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.

## Evidência Caso de Teste CT-01: Acesso ao Feed

![FEED_ALTA](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-time-quarta-19-00/assets/90725686/80a742cd-14ac-483b-bf05-33f5705a0280)

----

## Evidência Caso de Teste CT-02: Cadastro de Instituição

![CADASTRO_INSTITUICAO_ALTA](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-time-quarta-19-00/assets/90725686/db013dd7-6c81-48de-8e04-4cae878f7b29)

---

## Evidência Caso de Teste CT-03: Cadastro de Usuário

![CADASTRO_USUARIO_ALTA](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-time-quarta-19-00/assets/90725686/2244cc72-0d19-42ae-a19b-d48ae31ad7e4)

---

## Evidência Caso de Teste CT-04: Login

![TELA_LOGIN_ALTA](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-time-quarta-19-00/assets/90725686/ddfe2700-db14-4dee-b103-8767da0ec208)

---

## Evidência Caso de Teste CT-05: Comentário Post

![comentario_post_ct05](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-time-quarta-19-00/assets/90725686/37908d9d-f909-4dd1-a7e4-43fba798068d)
![comentario_post_ct05_1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-time-quarta-19-00/assets/90725686/e9f36309-840b-46a9-a6ad-27b96a0f51d6)

---

## Evidência Caso de Teste CT-06: Curtir Post

![ct06_botaogostei](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-time-quarta-19-00/assets/90725686/97d336ea-59a2-4b9b-a73d-a1915f447232)

---

## Evidência Caso de Teste CT-07: Criar Post

- Nessa evidência fica comprovado nas fotos que após a instituição criar o post, ele na segunda imagem aparece no feed da Hub da Solidariedade.
  
![CT07_NOVOPOST](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-time-quarta-19-00/assets/90725686/b2e7c888-b852-4d98-b2cc-f6e523434dba)
![CT07_NOVOPOST_1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-time-quarta-19-00/assets/90725686/a08d3fa1-8c66-4c35-ab59-1f83a4320902)

---

## Evidência Caso de Teste CT-08: Editar Post

![CT08](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-time-quarta-19-00/assets/90725686/a878fbb5-d9a0-4bf1-8ec2-b22f09b2cdd8)
![CT08_1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-time-quarta-19-00/assets/90725686/c3149a29-cc7a-427f-a616-fadeab881374)

---

## Evidência Caso de Teste CT-09: Instituição/Usuário não poderá se logar sem fornecer credenciais de acesso corretas.

![ct09](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-time-quarta-19-00/assets/90725686/76b0c789-203b-465f-ae7f-302af30c883a)

---

## Evidência Caso de Teste CT-10: Somente Instituição cadastrada consegue criar, deletar e apagar post; 

- Nessa evidência fica comprovado nas fotos abaixo que o menu do usuário comum é diferente da instituição, não aparecendo as opções de postagens, assim como a tela de feed,
  onde não aparece o ícone para adicionar um post localizado na parte inferior direita.

  ![ct10 ](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-time-quarta-19-00/assets/90725686/0ddf42f3-bbfa-4acf-a414-3de6e24337fb)
  ![ct10](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-time-quarta-19-00/assets/90725686/1a73738a-c18e-4d67-b47f-c30a5fcca0d4)

---

## Evidência Caso de Teste CT-11: Usuário não pode apagar comentário de outro usuário  

![ct11](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-time-quarta-19-00/assets/90725686/915bac1b-3b84-4c03-9512-3c8561978b37)

---































