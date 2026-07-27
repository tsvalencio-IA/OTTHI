# Relatório de teste em navegador — V642

- Página/build V642: **aprovado**
- API técnica: **aprovada**
- Módulos educação/bairros/segurança: **aprovados**
- IDs obrigatórios ausentes: **0**
- Exceções JavaScript: **0**
- Viewports simulados: **10**
- Falhas de estouro horizontal: **0**
- Menus fora do viewport: **0**

## Viewports

- [x] 320x568 — menu 94.0% × 86.0% do viewport
- [x] 360x640 — menu 94.0% × 86.0% do viewport
- [x] 390x844 — menu 94.0% × 86.0% do viewport
- [x] 412x915 — menu 94.0% × 86.0% do viewport
- [x] 568x320 — menu 92.0% × 97.5% do viewport
- [x] 640x360 — menu 92.0% × 97.8% do viewport
- [x] 740x360 — menu 92.0% × 97.8% do viewport
- [x] 844x390 — menu 92.0% × 98.0% do viewport
- [x] 915x412 — menu 89.6% × 98.1% do viewport
- [x] 1024x768 — menu 74.2% × 90.5% do viewport

## Limitação comprovada

O teste foi executado em ambiente sem resolução DNS externa. Por isso o Three.js e os módulos Firebase hospedados externamente não carregaram. A camada local abriu sem exceções, mas este relatório não aprova mundo 3D, FPS, multiplayer real, AR ou APK.

## Dependências externas que falharam somente neste ambiente isolado

- `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`
- `https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js`
- `https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js`
- `https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js`
