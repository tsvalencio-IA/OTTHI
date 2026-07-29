# OTTHI World Edu V646.6 — conectividade e permissões

## Resultado

Esta entrega adota um contrato simples: depois do login Firebase, as ações normais do jogo podem ser lidas e gravadas sem autorização adicional. Permanecem protegidos somente os dados privados da conta, o progresso individual e a alteração do limite de tempo.

O arquivo de regras incluído no pacote precisa ser publicado manualmente no Firebase Realtime Database. Alterar somente os arquivos do site não modifica as regras que já estão no servidor.

## Correções principais

- Removidas validações de Firebase que bloqueavam presença, chat, casas, sessões, barcos, fogueiras, extensões, vagas e missões cooperativas.
- Presentes, interações, desafios e convites sociais agora aceitam gravação de qualquer sessão autenticada.
- A reserva de sala usa transação atômica em uma vaga individual e não tenta mais gravar o nó pai `/slots`.
- Um erro opcional de interação não coloca mais todo o multiplayer em estado offline.
- Presente, aceno e resposta social tratam falha sem gerar exceção não capturada.
- Botões cooperativos possuem trava de clique duplo e retorno visível de falha.
- Criar, entrar, escolher função, marcar pronto, iniciar, continuar solo, continuar offline e sair foram revisados.
- Se o servidor ainda estiver com regras antigas, a missão abre uma alternativa solo em vez de deixar o botão morto.
- Bombeiros, resgate, polícia infantil, pesca, escola, corrida de rua e pista oval continuam presentes.
- Build e cache PWA foram atualizados para `646.6-authenticated-gameplay-open` e `v=6466`.

## O que continua protegido

- `gameAccounts/$uid`: somente o dono autenticado.
- Perfil, progresso e aprendizagem: somente o próprio usuário.
- Limite de tempo: somente a conta responsável, com autenticação recente.
- Histórico e lista de bloqueios: privados por usuário.
- Nomes de bairros válidos: continuam limitados aos cinco bairros existentes.

Essas proteções não impedem ações cooperativas; elas evitam que um jogador sobrescreva a conta ou o progresso privado de outro.

## Aplicação manual obrigatória das regras

1. Abra o projeto correto no Firebase Console.
2. Entre em **Realtime Database > Regras**.
3. Substitua o conteúdo pelas regras do arquivo `firebase-database.rules.json` deste pacote.
4. Publique as regras.
5. Só depois envie todos os arquivos da pasta `OTTHI-main` ao GitHub.
6. Aguarde o GitHub Pages concluir e abra novamente o jogo.

SHA-256 das regras:

`2E61EE7BB249D1056691DAFB6F352A291F39FB39CA79880255F2D7FD11B4C79F`

## Atualização do aplicativo instalado

A captura recebida ainda mostrava `OTTHI World Edu V645` e o aviso de atualização disponível. Depois da publicação completa:

1. toque em **Atualização do app disponível**;
2. feche todas as janelas do OTTHI;
3. abra novamente;
4. confirme que o título mostra `OTTHI World Edu V646.6`.

Se continuar em V645, remova apenas o aplicativo instalado/PWA e instale novamente pelo navegador. O progresso remoto não deve ser apagado para isso.

## Validações executadas

- Validação consolidada do projeto: **203/203** verificações aprovadas.
- Permissões e botões V646.6: **60/60** aprovados.
- Release e segurança: **15/15** aprovados.
- Missões cooperativas e responsividade: **6/6** aprovados.
- Multiplayer, PWA e missões: **31/31** aprovados.
- Preservação estrutural: funções anteriores preservadas; nenhuma função obrigatória ausente.
- Servidor HTTP local: `index.html?v=6466` respondeu com HTTP 200.
- JavaScript, JSON, manifesto, hashes do release, cache e equivalência modular: aprovados.

## Limites honestos da validação

Não foram alterados nem testados remotamente o Firebase ou o GitHub. Também não foi declarado teste físico em celular. O navegador integrado não pôde concluir a conexão de automação nesta sessão; por isso a verificação foi feita por build, testes determinísticos, contratos de DOM/CSS, hashes e servidor HTTP local.

Para aprovar definitivamente o online, ainda é necessário publicar as regras e testar com duas contas em dois aparelhos: entrar na mesma sala, criar missão, escolher funções diferentes, marcar pronto, iniciar, desconectar um aparelho, reconectar e concluir.
