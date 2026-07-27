# Configurar o Firebase existente

1. Abra o Firebase Console do projeto já usado pelo OTTHI.
2. Confirme que **Authentication** possui os métodos:
   - Anônimo;
   - E-mail/senha.
3. Abra **Realtime Database → Regras**.
4. Copie todo o conteúdo de `firebase-database.rules.json`.
5. Substitua as regras atuais e publique.
6. Não altere `firebase-config.js` enquanto continuar usando o mesmo projeto Firebase.

## Estrutura V643

- `otthosWorld/users/{uid}`: perfil, progresso, aprendizado e conta;
- `otthosWorld/rooms/{roomId}/presence`: jogadores conectados naquele bairro;
- `otthosWorld/rooms/{roomId}/houses`: casas daquele bairro;
- `otthosWorld/rooms/{roomId}/chat`: comunicação controlada;
- `otthosWorld/rooms/{roomId}/gameSessions`: desafios educativos;
- `otthosWorld/rooms/{roomId}/boats`: reserva de barcos;
- `otthosWorld/rooms/{roomId}/campfires`: fogueiras;
- `otthosWorld/rooms/{roomId}/houseExtensions`: ampliações das casas.

## Controle de custo

O movimento é publicado aproximadamente quatro vezes por segundo, não a cada quadro. Cada criança escuta somente o bairro atual. Não coloque listeners na raiz do banco.
