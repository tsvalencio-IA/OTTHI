# OTTHI World Edu V643

Mundo aberto infantil online com aprendizado adaptativo, casas, multiplayer por bairros, roupas, skills, construção, pescaria e profissões da cidade.

## Atualização V643 — mobilidade, trânsito e pesca viva

- direção lateral corrigida em carro e barco;
- botão **Acelerar** separado;
- botão **Freio/Ré**: freia enquanto avança e engata a ré depois de parar;
- joystick continua responsável pela direção e também aceita controle analógico vertical;
- passageiro não recebe comandos de motorista;
- buzina, sair e ações contextuais preservadas;
- prioridade de trânsito para ambulância, bombeiro e polícia em atendimento;
- previsão de conflitos, separação de veículos sobrepostos e spawn de ônibus em trecho livre;
- cinco NPCs pescando nas margens, com vara, linha e boia;
- nova textura leve de ondulações da água.

## Sistemas preservados

- roupas, acessórios e uniformes profissionais;
- skills Mini, Normal, Grande, Abaixar e Girar;
- polícia, viaturas e patrulhas educativas;
- bombeiros, caminhões e ocorrências controladas;
- ambulâncias e serviços de emergência;
- casas, interiores, construção, pesca, barcos, ônibus e metrô;
- missões, recompensas, inventário e salvamento;
- desafios educativos e multiplayer Firebase;
- responsividade automática em retrato e paisagem.

## Arquitetura modular

- **31 módulos JavaScript** em `src/modules/`;
- **12 módulos CSS** em `src/styles/`;
- `app.js` e `style.css` são bundles gerados automaticamente;
- **552 funções nomeadas** inventariadas;
- fluxo, eventos, variáveis e nós HTML exportados em CSV/JSON;
- workflow sem npm para reconstruir, testar e validar os bundles.

Não edite `app.js` ou `style.css` como fonte principal. Altere o módulo correspondente; o workflow recompila os arquivos da raiz.

## Repositório e GitHub Pages

Repositório: `tsvalencio-IA/OTTHI`

Página: `https://tsvalencio-ia.github.io/OTTHI/`

Envie todo o conteúdo extraído para a raiz e ative **Settings → Pages → Deploy from a branch → main / root**.

## Firebase

O arquivo `firebase-config.js` mantém a configuração existente. Publique manualmente `firebase-database.rules.json` no Realtime Database antes de testar bairros, casas e multiplayer.

## Documentação principal

- `docs/ARQUITETURA-MODULAR-V643.md`
- `docs/INDICE-TECNICO-V643.md`
- `docs/CHECKLIST-ATUALIZACAO-V643.md`
- `docs/CHECKLIST-COMPLETO-FUNCOES-JOGABILIDADES.md`
- `docs/CHECKLIST-552-FUNCOES.md`
- `docs/CHECKLIST-FLUXO-IF-ELSE-SWITCH-LOOPS.md`
- `docs/RELATORIO-TESTE-MOBILIDADE-V643.json`
- `docs/VALIDACAO-ESTRUTURAL-V643.md`

Powered by thIAguinho Soluções Digitais.
