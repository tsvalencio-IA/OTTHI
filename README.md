# OTTHI World Edu V644

Mundo aberto infantil online com aprendizado adaptativo, casas, multiplayer por bairros, roupas, skills, construção, pescaria e profissões da cidade.

## Atualização V644 — bairros funcionais, vagas e mapa fiel

- cinco bairros conectados ao mesmo mundo aberto;
- limite inicial de **10 jogadores simultâneos por bairro**;
- contador real de ocupação, como `4/10`;
- reserva da vaga no Firebase antes de sair do bairro atual;
- bloqueio de entrada quando o bairro estiver lotado;
- liberação automática da vaga ao sair, trocar de bairro ou desconectar;
- limpeza dos jogadores, casas e objetos compartilhados do bairro anterior;
- transporte seguro para a entrada física coerente do bairro escolhido;
- casas e presença online carregadas somente para o bairro atual;
- mapa completo com regiões dos bairros e casas online;
- minimapa recalculado conforme o tamanho visual;
- uma única escala para os eixos X e Z, sem distorção;
- mapa completo quadrado em retrato e paisagem;
- correções de tela cheia e zonas dos controles da V643.1 preservadas.

## Bairros iniciais

- Bairro Central;
- Bairro da Floresta;
- Bairro do Lago;
- Bairro da Montanha;
- Bairro da Academia.

Cada bairro aceita até 10 jogadores. A estrutura inicial suporta até 50 jogadores distribuídos entre as cinco salas, sem fazer cada aparelho carregar todas as crianças ao mesmo tempo.

## Sistemas preservados

- roupas, acessórios e uniformes profissionais;
- skills Mini, Normal, Grande, Abaixar e Girar;
- polícia, viaturas e patrulhas educativas;
- bombeiros, caminhões e ocorrências controladas;
- ambulâncias e serviços de emergência;
- casas, interiores, construção, pesca, barcos, ônibus e metrô;
- missões, recompensas, inventário e salvamento;
- desafios educativos e multiplayer Firebase;
- mobilidade V643 de carros e barcos;
- pesca viva e melhorias de trânsito;
- responsividade automática em retrato e paisagem.

## Arquitetura modular

- **32 módulos JavaScript** em `src/modules/`;
- **14 módulos CSS** em `src/styles/`;
- `app.js` e `style.css` são bundles gerados automaticamente;
- **564 funções nomeadas** inventariadas;
- workflow sem npm para reconstruir, testar e validar os bundles.

Não edite `app.js` ou `style.css` como fonte principal. Altere o módulo correspondente; o workflow recompila os arquivos da raiz.

## Repositório e GitHub Pages

Repositório: `tsvalencio-IA/OTTHI`

Página: `https://tsvalencio-ia.github.io/OTTHI/`

Envie os arquivos extraídos preservando as pastas e aguarde o GitHub Pages e o workflow terminarem.

## Firebase obrigatório

O arquivo `firebase-config.js` mantém a configuração existente.

Para o limite de 10 vagas funcionar, publique manualmente o conteúdo atualizado de `firebase-database.rules.json` em **Firebase Console → Realtime Database → Regras**.

Sem publicar essas regras, o aplicativo novo não consegue garantir o limite simultâneo no servidor.

## Relatórios principais

- `docs/CHECKLIST-ATUALIZACAO-V644.md`
- `docs/RELATORIO-TESTE-BAIRROS-V644.md`
- `docs/RELATORIO-PRESERVACAO-V642-V644.md`
- `docs/VALIDACAO-ESTRUTURAL-V644.md`

Powered by thIAguinho Soluções Digitais.
