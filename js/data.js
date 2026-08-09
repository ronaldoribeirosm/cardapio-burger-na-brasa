// Dados mockados do cardápio — troque as imagens em assets/products e assets/banner
// pelas fotos reais do estabelecimento. Nenhuma chamada de rede é feita: tudo roda
// no navegador, sem backend.

const STORE = {
  name: "Revoada Lanches",
  address: "Rua da Revoada, 88 — Centro",
  city: "Campos do Jordão, SP",
  logo: "assets/banner/logo-placeholder.svg",
  banner: "assets/banner/banner.jpg",
  openUntil: "01:00",
  cashbackPct: 5,
  deliveryEta: "40min - 1h10",
  minOrder: 15.9,
};

const CATEGORIES = ["Kits Revoada", "Lanches", "Cachorro-Quente", "Porções", "Bebidas"];

const PRODUCTS = [
  {
    id: "kit-revoada-mania",
    category: "Kits Revoada",
    mostOrdered: true,
    tag: "O favorito!",
    name: "Kit Revoada Mania",
    shortDesc: "6 mini burgers, fritas crocantes, anéis de cebola e molho da casa.",
    description:
      "O kit mais pedido da Revoada: 6 mini hambúrgueres artesanais, uma porção generosa de batata frita crocante, anéis de cebola empanados e molho especial da casa. Serve bem 2 pessoas.",
    price: 64.9,
    image: "assets/products/kit-revoada-mania.jpg",
    modifierGroups: [
      {
        id: "molho-kit",
        title: "Escolha o molho",
        type: "single",
        max: 1,
        options: [
          { id: "molho-barbecue", name: "Barbecue Defumado", price: 0 },
          { id: "molho-especial", name: "Especial da Casa", price: 0 },
          { id: "molho-picante", name: "Picante", price: 0 },
        ],
      },
    ],
  },
  {
    id: "kit-trio-sliders",
    category: "Kits Revoada",
    mostOrdered: true,
    name: "Kit Trio Sliders",
    shortDesc: "3 mini cheeseburgers no pão preto + fritas.",
    description:
      "Três mini cheeseburgers no pão australiano, queijo derretido e cebola caramelizada, acompanhados de batata frita crocante.",
    price: 39.9,
    image: "assets/products/kit-trio-sliders.jpg",
    modifierGroups: [],
  },
  {
    id: "kit-duplo",
    category: "Kits Revoada",
    name: "Kit Duplo Revoada",
    shortDesc: "2 X-Tudo + fritas + 2 refrigerantes.",
    description: "Dois lanches X-Tudo completos, uma porção de fritas para dividir e dois refrigerantes gelados.",
    price: 74.9,
    image: "assets/products/kit-duplo.jpg",
    modifierGroups: [],
  },
  {
    id: "x-burger",
    category: "Lanches",
    name: "X-Burger",
    shortDesc: "Pão, hambúrguer 150g e queijo derretido.",
    description: "O clássico de boteco: pão macio, hambúrguer artesanal de 150g grelhado na chapa e queijo derretido.",
    price: 14.9,
    image: "assets/products/x-burger.jpg",
    modifierGroups: [
      {
        id: "ponto",
        title: "Escolha o ponto",
        type: "single",
        max: 1,
        options: [
          { id: "mal-passado", name: "Mal passado", price: 0 },
          { id: "ao-ponto", name: "Ao ponto", price: 0 },
          { id: "bem-passado", name: "Bem passado", price: 0 },
        ],
      },
    ],
  },
  {
    id: "x-salada",
    category: "Lanches",
    mostOrdered: true,
    name: "X-Salada",
    shortDesc: "Hambúrguer, queijo, alface, tomate e maionese da casa.",
    description: "Hambúrguer de 150g, queijo derretido, alface crocante, tomate fresco e maionese temperada da casa.",
    price: 17.9,
    image: "assets/products/x-salada.jpg",
    modifierGroups: [
      {
        id: "turbine-salada",
        title: "Turbine com:",
        type: "single",
        max: 1,
        options: [
          { id: "ovo-frito", name: "Ovo Frito", price: 3.9 },
          { id: "bacon", name: "Bacon Crocante", price: 5.9 },
        ],
      },
    ],
  },
  {
    id: "x-bacon",
    category: "Lanches",
    name: "X-Bacon",
    shortDesc: "Hambúrguer, queijo e fatias generosas de bacon.",
    description: "Hambúrguer de 150g, queijo derretido e fatias generosas de bacon crocante no pão macio.",
    price: 20.9,
    image: "assets/products/x-bacon.jpg",
    modifierGroups: [],
  },
  {
    id: "x-tudo",
    category: "Lanches",
    mostOrdered: true,
    tag: "Novidade",
    name: "X-Tudo Revoada",
    shortDesc: "Hambúrguer duplo, queijo, bacon, ovo, presunto e salada.",
    description:
      "O lanche completo da casa: dois hambúrgueres, queijo derretido, bacon crocante, ovo, presunto, alface, tomate e milho, tudo no pão brioche.",
    price: 26.9,
    image: "assets/products/x-tudo.jpg",
    modifierGroups: [
      {
        id: "extras-tudo",
        title: "Adicionais",
        type: "multi",
        max: 3,
        options: [
          { id: "extra-bacon", name: "Bacon extra", price: 5.9 },
          { id: "extra-queijo", name: "Queijo extra", price: 4.9 },
          { id: "extra-ovo", name: "Ovo extra", price: 3.9 },
        ],
      },
    ],
  },
  {
    id: "x-egg",
    category: "Lanches",
    name: "X-Egg",
    shortDesc: "Hambúrguer, queijo e ovo.",
    description: "Hambúrguer de 150g, queijo derretido e ovo frito com gema mole no pão macio.",
    price: 18.9,
    image: "assets/products/x-egg.jpg",
    modifierGroups: [],
  },
  {
    id: "dog-simples",
    category: "Cachorro-Quente",
    name: "Cachorro-Quente Simples",
    shortDesc: "Pão, salsicha, molho e batata palha.",
    description: "Pão macio, salsicha suculenta, molho especial da casa e batata palha crocante.",
    price: 12.9,
    image: "assets/products/dog-simples.jpg",
    modifierGroups: [],
  },
  {
    id: "dog-completo",
    category: "Cachorro-Quente",
    mostOrdered: true,
    name: "Cachorro-Quente Completo",
    shortDesc: "Salsicha, purê, milho, ervilha, batata palha e queijo.",
    description:
      "O clássico dog de boteco: salsicha, purê de batata, milho, ervilha, batata palha, queijo ralado e os molhos da casa.",
    price: 19.9,
    image: "assets/products/dog-completo.jpg",
    modifierGroups: [
      {
        id: "molho-dog",
        title: "Escolha uma Maionese",
        type: "multi",
        max: 5,
        options: [
          { id: "sem-maionese", name: "Não quero Maionese!", price: 0 },
          { id: "maionese-alho", name: "Maionese de Alho", price: 2.9 },
          { id: "maionese-picante", name: "Maionese Picante", price: 2.9 },
        ],
      },
    ],
  },
  {
    id: "batata-frita",
    category: "Porções",
    name: "Batata Frita Crocante",
    shortDesc: "Porção individual de batata frita.",
    description: "Porção de batata frita crocante, temperada na hora.",
    price: 15.9,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
  {
    id: "aneis-cebola",
    category: "Porções",
    name: "Anéis de Cebola",
    shortDesc: "Anéis de cebola empanados e crocantes.",
    description: "Anéis de cebola empanados, fritos na hora, servidos com molho especial.",
    price: 18.9,
    image: "assets/products/aneis-cebola.jpg",
    modifierGroups: [],
  },
  {
    id: "refrigerante-lata",
    category: "Bebidas",
    name: "Refrigerante Lata 350ml",
    shortDesc: "Lata gelada — Coca-Cola, Guaraná ou Fanta.",
    description: "Refrigerante gelado em lata de 350ml.",
    price: 7.9,
    image: "assets/products/refrigerante-lata.jpg",
    modifierGroups: [
      {
        id: "sabor-refri",
        title: "Escolha o sabor",
        type: "single",
        max: 1,
        options: [
          { id: "coca", name: "Coca-Cola", price: 0 },
          { id: "guarana", name: "Guaraná Antarctica", price: 0 },
          { id: "fanta", name: "Fanta Laranja", price: 0 },
        ],
      },
    ],
  },
  {
    id: "suco-natural",
    category: "Bebidas",
    name: "Suco Natural",
    shortDesc: "Suco de laranja natural, feito na hora.",
    description: "Suco de laranja natural, espremido na hora.",
    price: 9.9,
    image: "assets/products/suco-natural.jpg",
    modifierGroups: [],
  },
];

const PAYMENT_METHODS = {
  online: [
    { id: "pix", name: "PIX", icon: "📱" },
    { id: "credito-online", name: "Cartão de Crédito", icon: "💳" },
    { id: "apple-pay", name: "Apple Pay", icon: "🍎" },
    { id: "google-pay", name: "Google Pay", icon: "🔺" },
  ],
  delivery: [
    { id: "dinheiro", name: "Dinheiro", icon: "💵" },
    { id: "credito-entrega", name: "Cartão de Crédito", icon: "💳" },
    { id: "debito-entrega", name: "Cartão de Débito", icon: "💳" },
    { id: "vale-refeicao", name: "Vale Refeição", icon: "🎫", fee: "Taxa adicional de 3%" },
    { id: "vale-alimentacao", name: "Vale Alimentação", icon: "🎫", fee: "Taxa adicional de 3%" },
  ],
};
