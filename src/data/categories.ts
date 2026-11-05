import type { Category } from '../types';

// Para añadir una categoría basta con añadir un objeto más a esta lista.
export const CATEGORIES: Category[] = [
  {
    id: 'animales',
    name: 'Animales',
    emoji: '🦒',
    color: '#ffb347',
    words: [
      'Jirafa', 'Pingüino', 'Canguro', 'Pulpo', 'Murciélago', 'Camaleón', 'Elefante', 'Medusa',
      'Koala', 'Cocodrilo', 'Búho', 'Tortuga', 'Delfín', 'Flamenco', 'Erizo', 'Gorila',
      'Caracol', 'Ardilla', 'Tiburón', 'Mapache', 'Hormiga', 'Pavo real', 'Oso panda', 'Camello',
    ],
  },
  {
    id: 'peliculas',
    name: 'Películas',
    emoji: '🎬',
    color: '#ff6b6b',
    words: [
      'Titanic', 'El Rey León', 'Toy Story', 'Harry Potter', 'Jurassic Park', 'Shrek', 'Star Wars',
      'Frozen', 'Tiburón', 'Matrix', 'Buscando a Nemo', 'El Padrino', 'Regreso al futuro',
      'Piratas del Caribe', 'Coco', 'Gladiator', 'E.T.', 'Mary Poppins', 'Avatar', 'Up',
      'La La Land', 'Indiana Jones', 'Grease', 'Los Increíbles',
    ],
  },
  {
    id: 'profesiones',
    name: 'Profesiones',
    emoji: '👩‍🚒',
    color: '#4ecdc4',
    words: [
      'Bombero', 'Astronauta', 'Dentista', 'Fontanero', 'Peluquera', 'Cartero', 'Socorrista',
      'Mago', 'Piloto', 'Cocinero', 'Veterinaria', 'Jardinero', 'Árbitro', 'Detective',
      'Payaso', 'Fotógrafa', 'Carpintero', 'Profesora', 'Camarero', 'Cirujano', 'Taxista',
      'Domador de leones', 'Arqueóloga', 'Electricista',
    ],
  },
  {
    id: 'comida',
    name: 'Comida',
    emoji: '🥘',
    color: '#ffd93d',
    words: [
      'Paella', 'Tortilla de patatas', 'Churros', 'Gazpacho', 'Croquetas', 'Pizza', 'Sushi',
      'Palomitas', 'Espaguetis', 'Hamburguesa', 'Helado', 'Aguacate', 'Bocadillo', 'Flan',
      'Pulpo a la gallega', 'Sandía', 'Fabada', 'Turrón', 'Patatas bravas', 'Tacos', 'Huevo frito',
      'Pimientos de Padrón', 'Algodón de azúcar', 'Cocido',
    ],
  },
  {
    id: 'acciones',
    name: 'Acciones',
    emoji: '🤸',
    color: '#a78bfa',
    words: [
      'Bostezar', 'Estornudar', 'Hacer la croqueta', 'Patinar', 'Pescar', 'Bucear', 'Planchar',
      'Hacer malabares', 'Tejer', 'Escalar', 'Hacer surf', 'Ordeñar una vaca', 'Remar', 'Roncar',
      'Hacer yoga', 'Lavarse los dientes', 'Montar a caballo', 'Hacerse un selfie', 'Bailar flamenco',
      'Cambiar un pañal', 'Hinchar un globo', 'Pintar una pared', 'Dar de comer a las palomas',
      'Jugar al ping-pong',
    ],
  },
  {
    id: 'objetos',
    name: 'Objetos',
    emoji: '🧲',
    color: '#6bcbff',
    words: [
      'Paraguas', 'Cepillo de dientes', 'Tostadora', 'Imán', 'Brújula', 'Grapadora', 'Sacacorchos',
      'Linterna', 'Escoba', 'Mando a distancia', 'Tijeras', 'Despertador', 'Hamaca', 'Lupa',
      'Prismáticos', 'Ventilador', 'Pinza de la ropa', 'Candado', 'Chupete', 'Embudo',
      'Calculadora', 'Rodillo', 'Cubo de Rubik', 'Abanico',
    ],
  },
  {
    id: 'paises',
    name: 'Países',
    emoji: '🌍',
    color: '#7ee081',
    words: [
      'Japón', 'Brasil', 'Egipto', 'Australia', 'México', 'Italia', 'Noruega', 'India', 'Canadá',
      'Grecia', 'Argentina', 'China', 'Marruecos', 'Rusia', 'Perú', 'Irlanda', 'Kenia', 'Suiza',
      'Portugal', 'Islandia', 'Tailandia', 'Holanda', 'Cuba', 'Escocia',
    ],
  },
  {
    id: 'deportes',
    name: 'Deportes',
    emoji: '🏓',
    color: '#ff8fab',
    words: [
      'Fútbol', 'Baloncesto', 'Esgrima', 'Golf', 'Waterpolo', 'Boxeo', 'Curling', 'Tenis',
      'Ciclismo', 'Esquí', 'Halterofilia', 'Rugby', 'Petanca', 'Surf', 'Judo', 'Natación sincronizada',
      'Béisbol', 'Pádel', 'Tiro con arco', 'Maratón', 'Patinaje artístico', 'Balonmano', 'Polo',
      'Salto de pértiga',
    ],
  },
];

/**
 * Junta varias categorías en un único mazo para la partida.
 * Las palabras repetidas entre categorías (p. ej. «Tiburón» en Animales y Películas) solo aparecen una vez.
 */
export function buildDeck(selected: Category[]): Category {
  if (selected.length === 1) return selected[0];
  const words = [...new Set(selected.flatMap((c) => c.words))];
  return {
    id: selected.map((c) => c.id).join('+'),
    name: selected.length === 2 ? selected.map((c) => c.name).join(' + ') : `${selected.length} categorías`,
    emoji: selected.map((c) => c.emoji).join(''),
    color: selected[0].color,
    words,
    includes: selected.map((c) => c.name),
  };
}
