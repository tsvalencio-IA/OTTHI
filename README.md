# OTTHI World Edu V642

Mundo aberto infantil online com aprendizado adaptativo, casas, multiplayer por bairros, roupas, skills, construção e profissões da cidade.

## Funções preservadas

- roupas, acessórios e uniformes profissionais;
- skills Mini, Normal, Grande, Abaixar e Girar;
- polícia, viaturas e patrulhas educativas;
- bombeiros, caminhões e ocorrências controladas;
- ambulâncias e serviços de emergência;
- casas, interiores, construção, pesca, barcos, ônibus e metrô;
- missões, recompensas, inventário e salvamento;
- desafios educativos e multiplayer Firebase.

## Novas fundações da V642

- qualidade adaptativa durante a partida;
- sistemas pesados atualizados em frequências separadas;
- sombras desligadas por padrão em celular;
- proteção de `setPointerCapture`;
- responsividade retrato/paisagem reorganizada;
- menus com escala proporcional;
- multiplayer dividido por bairros;
- diretório de casas por bairro;
- trilha educacional adaptativa independente;
- camada inicial de segurança infantil;
- fonte integral dividida em 31 módulos JavaScript e 11 módulos CSS, com bundles gerados automaticamente sem apagar recursos.

## Nome exato recomendado do repositório

`OTTHI-WORLD-EDU`

Depois de criar o repositório, envie todo o conteúdo deste ZIP para a raiz e ative GitHub Pages em **Settings → Pages → Deploy from a branch → main / root**.

## Firebase

O arquivo `firebase-config.js` mantém a configuração já utilizada. Publique as regras de `firebase-database.rules.json` no Realtime Database antes de testar bairros e casas online.

Consulte `docs/CONFIGURAR-FIREBASE.md` e `docs/TESTES-OBRIGATORIOS.md`.

Powered by thIAguinho Soluções Digitais.


## V642 — fonte completamente modular

- 31 módulos JavaScript de domínio.
- 11 módulos CSS.
- Bundle automático sem npm.
- 544 funções inventariadas.
- Condições, eventos, variáveis e nós HTML exportados em CSV/JSON.
- Workflow automático para reconstruir `app.js` e `style.css`.

Consulte `docs/ARQUITETURA-MODULAR-V642.md`, `docs/CHECKLIST-COMPLETO-FUNCOES-JOGABILIDADES.md` e `docs/MATRIZ-COMPLETA-JOGABILIDADES-E-TESTES.md`.

### Regra obrigatória de manutenção

Não edite `app.js` ou `style.css` como fonte principal. Altere o arquivo correspondente em `src/modules/` ou `src/styles/`; o workflow recompila, audita as 544 funções e verifica equivalência antes de publicar.
