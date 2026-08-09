# Progresso

## O que foi validado de verdade nesta sessão

- Todas as telas do site original (`menu.brendi.com.br/o-burger-na-brasa`) foram
  mapeadas navegando de verdade pelo fluxo real: cardápio → produto com
  adicionais → carrinho → endereço (cidade → região → formulário) → forma de
  pagamento → resumo — via automação de navegador, com screenshots reais de
  cada etapa.
- A réplica foi servida localmente (`python -m http.server`) e testada
  ponta a ponta com Playwright headless (Chromium), clicando de fato em
  cada botão do fluxo (adicionar produto, abrir carrinho, preencher e
  salvar endereço, escolher Pix, revisar e "confirmar" o pedido) e
  capturando screenshot de cada tela.
- `console --errors` / `pageerror` do Playwright não acusaram nenhum erro
  de JavaScript em nenhuma etapa do fluxo testado.
- Corrigido durante o teste: a categoria "Mais Pedidos" aparecia duplicada
  (uma vez no carrossel de destaque, outra na listagem vertical) — ajustado
  para usar um flag `mostOrdered` nos produtos em vez de uma categoria
  própria, replicando o comportamento do site original.

## O que NÃO foi validado

- **Não testado em navegador real/visual interativo** — a extensão de
  automação de navegador desta sessão não conseguiu alcançar servidores
  locais iniciados via terminal (ambientes de rede separados); a validação
  foi feita via Playwright headless, não por inspeção visual direta em um
  Chrome real. Vale abrir manualmente pelo menos uma vez antes de usar em
  produção.
- **Não testado em mobile real** (touch, teclado virtual, safe-area de
  notch) — só viewport simulado de 480px no Playwright.
- **Sem auditoria de acessibilidade** (contraste, navegação por teclado,
  leitores de tela).
- **Sem teste cross-browser** (Firefox, Safari) — só Chromium.
- **Imagens são todas placeholders SVG genéricos** — precisam ser
  substituídas pelas fotos reais do estabelecimento (mesma proporção:
  quadradas para produtos, larga para o banner).
- Publicação no GitHub Pages (se desejada) ainda não foi configurada nesta
  sessão até este ponto do log.

## Decisões pendentes (do usuário, não técnicas)

- Nome/marca a usar no cardápio: o site de origem mostrava "McCoy's Burger"
  no momento da captura (a loja parece ter mudado de identidade visual em
  relação à URL `o-burger-na-brasa`); o projeto usa "Burger na Brasa" como
  placeholder — trocar em `js/data.js` (`STORE.name`) pela marca definitiva.
- Se este projeto vai virar produto real (com backend, pagamento de
  verdade, etc.) ou permanece como peça de portfólio/demonstração visual.
