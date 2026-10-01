import { Testimonial, FaqItem, PricingPlan } from '../types';

export const ASSETS = {
  heroPhoneCut: '/storage/phone_mockup_cutting_1790338619001.webp',
  heroVideo: '/storage/mini_vsl_v2.mp4',
  heroCanvaEmbed: '',
  videoCover: '/storage/capa_vsl_v2.webp',
  momAvatar: '/storage/Lucia.webp',
  childCraft1: '/storage/child_playing_craft_1_1790338650695.webp',
  paperDollFlatlay: '/storage/paper_doll_flatlay_1790338663775.webp',
  twoGirlsPlaying: '/storage/two_girls_playing_1790338677187.webp',
  prova1: '/storage/prova_social_1.webp',
  prova2: '/storage/prova_social_2_v2.webp',
  prova3: '/storage/prova_social_3.webp',
  prova4: '/storage/prova_social_4.webp',
  provaKid1: '/storage/prova_kid_1.webp',
  provaKid2: '/storage/prova_kid_2.webp',
  provaKid3: '/storage/prova_kid_3.webp',
  provaKid4: '/storage/prova_kid_4.webp',
  provaKid5: '/storage/prova_kid_5.webp',
  demonstracao1: '/storage/demonstracao_1.webp',
  demonstracao2: '/storage/demonstracao_2.webp',
  demonstracao3: '/storage/demonstracao_3.webp',
  demonstracao4: '/storage/demonstracao_4.webp',
  demonstracao5: '/storage/demonstracao_5.webp',
};

export const WHAT_YOU_RECEIVE_ITEMS = [
  {
    id: '1',
    title: 'Bonecas com vários temas',
    subtitle: 'Princesas, fadas, heroínas, estudantes, profissões e muito mais',
    iconColor: 'bg-pink-100 text-pink-600',
  },
  {
    id: '2',
    title: 'Roupas temáticas para combinar',
    subtitle: 'Vestidos de festa, looks de praia, inverno, escola e muito mais',
    iconColor: 'bg-purple-100 text-purple-600',
  },
  {
    id: '3',
    title: 'Acesso digital',
    subtitle: 'Pelo celular ou tablet, a qualquer hora.',
    iconColor: 'bg-pink-100 text-pink-600',
  },
  {
    id: '4',
    title: 'Guia de boas-vindas com método de uso',
    subtitle: 'Dicas práticas de corte, colagem e conservação das peças',
    iconColor: 'bg-rose-100 text-rose-600',
  },
  {
    id: '5',
    title: 'Acesso imediato enviado por e-mail',
    subtitle: 'Link direto e seguro enviado logo após a confirmação',
    iconColor: 'bg-fuchsia-100 text-fuchsia-600',
  },
  {
    id: '6',
    title: 'Acesso vitalício',
    subtitle: 'Baixe quando quiser e imprima quantas vezes sua filha pedir',
    iconColor: 'bg-pink-100 text-pink-600',
  },
];

export const GALLERY_ITEMS = [
  {
    id: 'g1',
    image: ASSETS.childCraft1,
    caption: 'Sofia (5 anos) concentrada recortando as roupinhas de fada',
    tag: 'Foco e criatividade',
  },
  {
    id: 'g2',
    image: ASSETS.paperDollFlatlay,
    caption: 'Mais de 300 modelos organizados em folhas A4 coloridas',
    tag: 'Pronto para imprimir',
  },
  {
    id: 'g3',
    image: ASSETS.twoGirlsPlaying,
    caption: 'Irmãs brincando juntas no quarto longe dos celulares',
    tag: 'Tarde sem telas',
  },
  {
    id: 'g4',
    image: ASSETS.heroPhoneCut,
    caption: 'Fácil de recortar com abas anatômicas para prender as roupas',
    tag: 'Encaixe perfeito',
  },
];

export interface DemonstrationItem {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  highlight: string;
}

export const DEMONSTRATION_ITEMS: DemonstrationItem[] = [
  {
    id: 'demo-1',
    image: ASSETS.demonstracao1,
    title: 'Modelos de Bonecas & Trocas de Roupas',
    category: 'Pronto para Recortar',
    description: 'Design pensado com abas de encaixe para a criança trocar de look com facilidade sem precisar colar.',
    highlight: 'Traço nítido e delicado',
  },
  {
    id: 'demo-2',
    image: ASSETS.demonstracao2,
    title: 'Coleções Temáticas Completas',
    category: 'Variedade Encantadora',
    description: 'Dezenas de estilos que despertam a imaginação: vestidos, conjuntos casuais, penteados e calçados combinando.',
    highlight: 'Cores vivas para impressão',
  },
  {
    id: 'demo-3',
    image: ASSETS.demonstracao3,
    title: 'Personagens Fofos e Detalhados',
    category: 'Qualidade Digital',
    description: 'Ilustrações de alta definição desenhadas para prender a atenção das pequenas longe das telas.',
    highlight: 'Formato A4 padrão',
  },
  {
    id: 'demo-4',
    image: ASSETS.demonstracao4,
    title: 'Cenários, Casinhas e Ambientes',
    category: 'Mundo de Faz de Conta',
    description: 'Cômodos e cenários lúdicos onde as crianças criam historinhas completas com suas bonecas.',
    highlight: 'Estímulo à narrativa infantil',
  },
  {
    id: 'demo-5',
    image: ASSETS.demonstracao5,
    title: 'Pets, Bichinhos e Acessórios',
    category: 'Diversão em Família',
    description: 'Companheiros fiéis de papel, bolsas, lacinhos e itens temáticos para deixar as brincadeiras ainda mais mágicas.',
    highlight: 'Fácil recorte com tesoura sem ponta',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Mariana Silva',
    location: 'São Paulo, SP',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&h=160&q=80',
    rating: 5,
    daughterAge: 'mãe da Alice, 4 anos',
    quote:
      'Minha filha não queria sair do tablet por nada. Imprimi o combo de princesas e ontem passamos 2 horas brincando juntas criando histórias. Foi muito especial, recomendo para todas as mães!',
    tag: 'Compra Verificada',
  },
  {
    id: '2',
    name: 'Fernanda Costa',
    location: 'Belo Horizonte, MG',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80',
    rating: 5,
    daughterAge: 'mãe da Sofia, 6 anos',
    quote:
      'Adorei a facilidade. É só imprimir e recortar! Minha filha Sofia amou as opções de roupinhas e ficou horas trocando e imaginando. Salvou minhas tardes de fim de semana com ela!',
    tag: 'Compra Verificada',
  },
  {
    id: '3',
    name: 'Camila Rodrigues',
    location: 'Curitiba, PR',
    avatar: '/storage/camila_rodrigues.webp',
    rating: 5,
    daughterAge: 'mãe da Clara e Laura (5 e 7 anos)',
    quote:
      'Eu lembro das bonecas de papel da minha infância e queria muito passar isso para elas. Esse material é incrível e lindo. Elas já colecionam as bonequinhas numa pasta. Muito prático e o valor é quase de graça pelo tanto de conteúdo.',
    tag: 'Compra Verificada',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'PACOTE BÁSICO',
    popular: false,
    originalPrice: 44.9,
    price: 9.9,
    discountPercentage: 78,
    features: [
      '+200 Bonecas de papel criativas!',
      'Guia de boas-vindas com método de uso',
      'Recebimento imediato pelo e-mail',
      'Suporte via WhatsApp',
      'Acesso vitalício',
    ],
    ctaText: 'QUERO O BÁSICO',
    checkoutUrl: 'https://pay.lowify.com.br/checkout.php?product_id=Abi8Xx',
  },
  {
    id: 'premium',
    name: 'PACOTE ALEGRIA',
    popular: true,
    originalPrice: 119.9,
    price: 24.9,
    discountPercentage: 79,
    highlightText: 'Mais de 80% escolhem esta opção',
    features: [
      '+500 Bonecas de papel criativas!',
      'Guarda-roupa completo por boneca',
      'Guia de boas-vindas com método de uso',
      'Recebimento imediato pelo e-mail',
      'Suporte prioritário via WhatsApp',
      'Acesso vitalício ilimitado',
    ],
    exclusiveBonuses: [
      '100 Cenários temáticos para historinhas',
      '500 Pets fofos de papel',
      '60 Acessórios e sapatinhos para bonecas',
      '120 Casinhas e cômodos de bonecas',
      'Atualizações mensais com novos temas',
    ],
    ctaText: 'QUERO O PACOTE COMPLETO',
    checkoutUrl: 'https://pay.lowify.com.br/go.php?offer=9f3a1b8f',
  },
];

export const ALEGRIA_SPECIAL_OFFER: PricingPlan = {
  id: 'alegria_special',
  name: 'PACOTE ALEGRIA (OFERTA EXCLUSIVA)',
  popular: true,
  originalPrice: 24.9,
  price: 16.9,
  discountPercentage: 85,
  highlightText: 'Oferta especial de oportunidade única',
  features: [
    '+500 Bonecas de papel criativas!',
    'Guarda-roupa completo por boneca',
    'Guia de boas-vindas com método de uso',
    'Recebimento imediato pelo e-mail',
    'Suporte prioritário via WhatsApp',
    'Acesso vitalício ilimitado',
  ],
  exclusiveBonuses: [
    '100 Cenários temáticos para historinhas',
    '500 Pets fofos de papel',
    '60 Acessórios e sapatinhos para bonecas',
    '120 Casinhas e cômodos de bonecas',
    'Atualizações mensais com novos temas',
  ],
  ctaText: 'SIM! QUERO O PACOTE ALEGRIA POR R$ 16,90',
  checkoutUrl: 'https://pay.lowify.com.br/go.php?offer=1b1b44d3',
};

export const FAQS: FaqItem[] = [
  {
    id: 'faq-receive',
    question: 'Como vou receber o material?',
    answer:
      'O envio é 100% digital e imediato! Logo após a confirmação do pagamento (no Pix ou Cartão a liberação é instantânea), você recebe um e-mail com o acesso a todos os arquivos em PDF prontos para imprimir. Você pode baixar direto no seu celular, tablet ou computador e imprimir na sua impressora comum ou papelaria quantas vezes quiser.',
  },
  {
    id: 'faq-1',
    question: 'Para quem é indicado?',
    answer:
      'É indicado para meninas de 3 a 11 anos, e especialmente para mães que desejam diminuir o uso excessivo de telas (tablets, celulares e televisão), estimulando a imaginação, coordenação motora fina e momentos de conexão em família.',
  },
  {
    id: 'faq-2',
    question: 'Vou receber o material em casa?',
    answer:
      'Não, este é um produto 100% digital em formato PDF. Você receberá o link de acesso por e-mail imediatamente após a confirmação da compra. Isso permite que você imprima na hora, quantas vezes quiser, sem esperar frete nem pagar entrega!',
  },
  {
    id: 'faq-3',
    question: 'E se eu não gostar, posso pedir reembolso?',
    answer:
      'Com certeza! Confiamos tanto na qualidade do nosso material que oferecemos Garantia Incondicional de 7 Dias. Se por qualquer motivo você ou sua filha não amarem as bonecas, basta mandar um único e-mail ou mensagem no WhatsApp que estornamos 100% do seu valor.',
  },
  {
    id: 'faq-5',
    question: 'Preciso usar algum tipo de papel específico?',
    answer:
      'Você pode imprimir em papel sulfite comum (75g) que funciona perfeitamente! Para maior durabilidade das bonecas que ficam de pé, recomendamos papel com gramatura um pouco maior, como papel cartão, couchê ou offset 120g a 180g (fácil de achar em qualquer papelaria). Você também pode colar em cartolina ou plastificar com fita adesiva larga.',
  },
  {
    id: 'faq-6',
    question: 'Posso imprimir quantas vezes quiser?',
    answer:
      'Sim! O acesso é vitalício. Se alguma boneca amassar ou rasgar na brincadeira, basta abrir o PDF e imprimir uma nova página sem pagar nenhum centavo a mais.',
  },
];
