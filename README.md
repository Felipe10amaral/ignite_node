### Conceitos abordados

<h5>Scripts personalizados</h5>
<p>dentro do package,json podemos criar scripts personalizados. <br> --watch serve para reiniciar o servidor a cada alteração no código, criamos um script personalizado com esse comando ex: ( "dev": "node --watch src/server.js")</p>

### Estrutura da Aplicação

<h3>Rotas</h3>
<p> Rotas são caminhos da nossa aplicação, são meios de entrada e formas como frontend irá consumir a api e executar diferentes operações no backend <br> podemos ter rotas para criar usuario, listar usuario ... </p>

<h3> HTTP</h3>
<p> Requisições HTTP é composta de dois principais recursos. <br> método HTTP: Existem 5 métodos mais comuns de serem usados (POST, GET, PUT, PATCH e DELETE) são mais semânticos do que funcionais: <br> POST => criar um recurso do backend <br> GET => buscar um recurso do backend <br> PUT => atualizar um recurso no backend <br> PATCH => atualizar uma informação especifica <br> DELETE => excluir um recurso no backend  <br> URL  </p>

### Streams
<p> Streams são um dos conceitos fundamentais que empoderam aplicações Node.js </p>
<p> em uma abordagem tradicional, quando você diz ao programa para ler um arquivo, o arquivo é lido na memória, do começo ao fim, e então é processado.

Utilizando streams você lê pedaço por pedaço, processando o conteúdo sem mantê-lo completo na memória.</p>

#### No node toda porta de entrada/saída é uma stream

#### Request e Response  no node são streams
  Request => neste caso podemos entender ele como uma ReadableSteam (eu consigo ler dados da requisição)
  Response => neste caso seria uma WritableStream (eu consigo escrever dados da requisição)

