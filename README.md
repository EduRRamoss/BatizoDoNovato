# -> Problema Solucionado
Esse aplicativo completo fornece um gerenciamento completo de Produtos & Regras de Imposto com sistema de Login, Criação de Banco SQL Automático e com front apresentando tabelas, paginação e outras funcionalidades completamente automáticas. O Back-End foi desenvolvido em C#(.NET) com Entity Framework Core, com diversas end-points e criação de Banco de Dados automática. Front-End feito em ANGULAR 17 com ANGULAR Material.

# Documentação
<details>
  <summary>(Back-End) Detalhes Técnicos</summary>
  
  A API foi desenvolvida em C# usando Entity Framework Core para interagir com um banco de dados que é gerado de maneira automática por DBset. Ela oferece as seguintes funcionalidades:

* Autenticação de Usuário: Permite que os usuários façam login através de um nome de usuário e senha. Além disso, a API gera tokens de autenticação(JWT) para usuários autenticados.
* Gerenciamento de Produtos: Oferece recursos para criar, visualizar, atualizar e excluir produtos. Os produtos podem incluir informações como nome, preço de custo, preço de venda e margem de lucro.
* Regras de Imposto: Permite criar, visualizar, atualizar e excluir regras de impostos. As regras de impostos podem definir taxas de impostos para serem aplicadas aos produtos.

Essas funcionalidades permitem que os usuários da API gerenciem eficientemente informações de login, produtos e regras de impostos de uma aplicação. Ela fornece uma base sólida para sistemas de gerenciamento de estoque, vendas e outros aplicativos que exigem autenticação e gerenciamento de dados relacionados a produtos e impostos. Para mais informações de End-Points e requests verificar o Swagger da API.
</details>

<details>
  <summary>(Front-End) Detalhes Técnicos</summary>
  
  O front-end consiste em uma aplicação Angular 17 com o framework Pure CSS e Angular Material, o web interage com os usuários por meio de formulários, tabelas e permite criação, atualização de produtos, regras de imposto e relacionamento destas por meio de tabelas com uma paginação dinámica.

Criação de Novo Produto:
* Permite criar um novo produto com campos como nome, preço de custo, markup, preço de venda, margem real e associação com uma regra de imposto.
* Calcula automaticamente valores como preço de venda, markup e margem real com base nos valores fornecidos.
* Fornece opção para escolher uma regra de imposto para associar ao produto.
  
Consulta de Produtos Existente por Código:
* Permite pesquisar produtos existentes por código.
* Exibe os detalhes dos produtos encontrados, como código, nome, preço de custo, markup, preço de venda e margem real em uma tabela.

Relação de Produtos:
* Gera uma lista de produtos existentes.
* Permite navegar para a página de edição de um produto específico clicando em seu código

Consulta de Produto por Nome:
* Permite pesquisar produtos existentes por nome.
* Exibe os detalhes dos produtos encontrados em uma tabela, incluindo campos como código, nome, preço de custo, markup, preço de venda e margem real.
  
Criação de Nova Regra de Imposto:
* Permite criar uma nova regra de imposto com campos como nome e taxa.
* Após a criação, exibe uma mensagem de sucesso.
  
Consulta de Regras de Imposto Existente por Código:
* Permite pesquisar regras de imposto existentes por código.
* Exibe os detalhes das regras encontradas, como código, nome e taxa, em uma tabela.
  
Consulta de Regra de Imposto por Nome:
* Permite pesquisar regras de imposto existentes por nome.
* Exibe os detalhes das regras encontradas em uma tabela, incluindo campos como código, nome e taxa.
  
Essencialmente, essas páginas fornecem uma interface para criar, visualizar e editar produtos e regras de imposto em um sistema de gerenciamento, tudo isso de forma organizada e interativa.
</details>
