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
      'Rinoceronte', 'Hipopótamo', 'Cebra', 'León', 'Tigre', 'Lobo', 'Zorro', 'Mofeta',
      'Castor', 'Nutria', 'Foca', 'Morsa', 'Ballena', 'Pez espada', 'Caballito de mar', 'Estrella de mar',
      'Cangrejo', 'Abeja', 'Mariposa', 'Mosquito', 'Araña', 'Escorpión', 'Serpiente', 'Rana',
      'Avestruz', 'Loro', 'Águila', 'Gallina', 'Cerdo', 'Oveja', 'Burro', 'Perezoso',
      'Ornitorrinco', 'Hámster', 'Conejo', 'Topo',
    ],
  },
  {
    id: 'peliculas',
    name: 'Películas',
    emoji: '🎬',
    color: '#ff6b6b',
    words: [
      'Titanic', 'El Rey León', 'Toy Story', 'Harry Potter', 'Jurassic Park', 'Shrek', 'Star Wars',
      'Frozen', 'Matrix', 'Buscando a Nemo', 'El Padrino', 'Regreso al futuro',
      'Piratas del Caribe', 'Coco', 'Gladiator', 'E.T.', 'Mary Poppins', 'Avatar', 'Up',
      'La La Land', 'Indiana Jones', 'Grease', 'Los Increíbles', 'El Señor de los Anillos',
      'Los Vengadores', 'Spider-Man', 'Batman', 'Rocky', 'Terminator', 'Alien', 'Forrest Gump',
      'Pretty Woman', 'Dirty Dancing', 'Top Gun', 'Los Cazafantasmas', 'Mamma Mia', 'Aladdín',
      'La Bella y la Bestia', 'Cenicienta', 'Pinocho', 'Dumbo', 'Ice Age', 'Cars', 'Ratatouille',
      'Wall-E', 'Del revés', 'Kung Fu Panda', 'Los Minions', 'Jumanji', 'Solo en casa', 'Encanto',
      'Barbie', 'Torrente', 'Ocho apellidos vascos', 'El laberinto del fauno', 'Casablanca',
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
      'Domador de leones', 'Arqueóloga', 'Electricista', 'Abogada', 'Enfermera', 'Policía',
      'Panadero', 'Carnicero', 'Agricultor', 'Pastor', 'Minero', 'Albañil', 'Escultor',
      'Cantante', 'Bailarina', 'Periodista', 'Presentador de televisión', 'Programador',
      'Científica', 'Bibliotecaria', 'Farmacéutico', 'Juez', 'Cajera', 'Mecánico',
      'Conductor de autobús', 'Azafata', 'Pescador', 'Leñador', 'Cerrajero', 'Barrendero',
      'Sastre', 'Torero', 'Futbolista', 'Youtuber', 'Repartidor', 'Niñera', 'Guardia de seguridad',
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
      'Pimientos de Padrón', 'Algodón de azúcar', 'Cocido', 'Lentejas', 'Salmorejo', 'Jamón serrano',
      'Queso manchego', 'Chorizo', 'Calamares', 'Gambas al ajillo', 'Ensaladilla rusa', 'Empanada',
      'Pan con tomate', 'Albóndigas', 'Pisto', 'Mejillones', 'Croissant', 'Magdalena', 'Donut',
      'Tarta de queso', 'Arroz con leche', 'Natillas', 'Crema catalana', 'Torrijas', 'Roscón de Reyes',
      'Polvorones', 'Chocolate', 'Nachos', 'Kebab', 'Ramen', 'Lasaña', 'Perrito caliente',
      'Burrito', 'Plátano', 'Piña', 'Uvas', 'Limón', 'Coco', 'Brócoli', 'Calabaza', 'Champiñón',
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
      'Jugar al ping-pong', 'Hacer la cama', 'Fregar los platos', 'Tender la ropa', 'Pasear al perro',
      'Cortar el césped', 'Freír un huevo', 'Llamar a un taxi', 'Hacer cola', 'Montar en bici',
      'Saltar a la comba', 'Pintarse las uñas', 'Afeitarse', 'Ducharse', 'Atarse los cordones',
      'Hacer la compra', 'Aparcar el coche', 'Cambiar una rueda', 'Tirarse en paracaídas',
      'Tocar la batería', 'Tocar el violín', 'Dirigir una orquesta', 'Hacer un castillo de arena',
      'Soplar las velas', 'Abrir un regalo', 'Hacer un muñeco de nieve', 'Montar una tienda de campaña',
      'Hacer flexiones', 'Levantar pesas', 'Saltar en una cama elástica', 'Andar por la cuerda floja',
      'Hacer el pino', 'Dormir la siesta',
    ],
  },
  {
    id: 'mimica',
    name: 'Mímica',
    emoji: '🎭',
    color: '#e879f9',
    words: [
      'Correr', 'Nadar', 'Saltar', 'Llorar', 'Reír', 'Gritar', 'Susurrar', 'Comer', 'Beber',
      'Dormir', 'Despertarse', 'Cocinar', 'Barrer', 'Conducir', 'Volar', 'Escribir', 'Leer',
      'Dibujar', 'Cantar', 'Bailar', 'Abrazar', 'Saludar', 'Empujar', 'Arrastrar', 'Lanzar',
      'Atrapar', 'Patear', 'Trepar', 'Gatear', 'Cojear', 'Tiritar', 'Rascarse', 'Toser',
      'Esconderse', 'Espiar', 'Rezar', 'Meditar', 'Boxear', 'Coser', 'Serrar', 'Martillear',
      'Cavar', 'Regar', 'Amasar', 'Pelar', 'Exprimir', 'Doblar', 'Pedalear', 'Galopar', 'Desfilar',
      'Aplaudir', 'Silbar', 'Olfatear', 'Tropezar', 'Desmayarse', 'Peinarse', 'Maquillarse',
      'Vestirse', 'Estirarse', 'Columpiarse',
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
      'Calculadora', 'Rodillo', 'Cubo de Rubik', 'Abanico', 'Sartén', 'Tenedor', 'Llave',
      'Cartera', 'Gafas de sol', 'Reloj', 'Anillo', 'Bufanda', 'Guantes', 'Calcetín', 'Mochila',
      'Maleta', 'Almohada', 'Lámpara', 'Espejo', 'Peine', 'Secador de pelo', 'Toalla', 'Esponja',
      'Nevera', 'Microondas', 'Lavadora', 'Aspiradora', 'Auriculares', 'Cargador del móvil',
      'Bolígrafo', 'Goma de borrar', 'Sobre', 'Vela', 'Mechero', 'Martillo', 'Destornillador',
      'Cinta adhesiva', 'Globo', 'Cometa', 'Peonza',
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
      'Portugal', 'Islandia', 'Tailandia', 'Holanda', 'Cuba', 'Escocia', 'Francia', 'Alemania',
      'Inglaterra', 'Estados Unidos', 'Chile', 'Colombia', 'Venezuela', 'Uruguay', 'Bolivia',
      'Ecuador', 'Panamá', 'Costa Rica', 'República Dominicana', 'Jamaica', 'Sudáfrica', 'Senegal',
      'Etiopía', 'Turquía', 'Arabia Saudí', 'Nepal', 'Vietnam', 'Corea del Sur', 'Filipinas',
      'Nueva Zelanda', 'Finlandia', 'Suecia', 'Dinamarca', 'Polonia', 'Austria', 'Bélgica',
      'Croacia', 'Andorra', 'Mónaco', 'Vaticano', 'Malta', 'Mongolia',
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
      'Salto de pértiga', 'Atletismo', 'Gimnasia rítmica', 'Lucha libre', 'Kárate', 'Taekwondo',
      'Sumo', 'Piragüismo', 'Vela', 'Windsurf', 'Snowboard', 'Hockey sobre hielo', 'Bádminton',
      'Squash', 'Tenis de mesa', 'Voleibol', 'Vóley playa', 'Críquet', 'Fútbol americano',
      'Billar', 'Dardos', 'Bolos', 'Triatlón', 'Lanzamiento de jabalina', 'Salto de longitud',
      'Fórmula 1', 'Motociclismo', 'Rally', 'Paracaidismo', 'Puenting', 'Parkour', 'Equitación',
      'Pelota vasca', 'Natación',
    ],
  },
  {
    id: 'juegos',
    name: 'Juegos',
    emoji: '🎮',
    color: '#a3e635',
    words: [
      // Videojuegos
      'Super Mario Bros', 'Tetris', 'Pac-Man', 'Minecraft', 'Fortnite', 'The Legend of Zelda',
      'Pokémon', 'Sonic', 'Street Fighter', 'Mortal Kombat', 'Call of Duty', 'Grand Theft Auto',
      'Los Sims', 'Animal Crossing', 'Mario Kart', 'Space Invaders', 'Candy Crush', 'Angry Birds',
      'Among Us', 'League of Legends', 'Final Fantasy', 'Assassin’s Creed', 'Halo', 'Crash Bandicoot',
      'Tomb Raider', 'Donkey Kong', 'Roblox',
      // Personajes
      'Luigi', 'Princesa Peach', 'Bowser', 'Link', 'Pikachu', 'Lara Croft', 'Kirby', 'Yoshi',
      'Master Chief', 'Kratos',
      // Empresas y consolas
      'Nintendo', 'PlayStation', 'Xbox', 'Sega', 'Atari', 'Ubisoft', 'Capcom', 'Game Boy',
      // Juegos de mesa
      'Monopoly', 'Parchís', 'Juego de la oca', 'Ajedrez', 'Damas', 'Trivial', 'Pictionary',
      'Scrabble', 'Cluedo', 'Catan', 'Risk', 'Uno', 'Dominó', 'Jenga', 'Twister', 'Dixit',
      'Hundir la flota', 'Cuatro en raya', 'Tabú', 'Mus',
    ],
  },
];

/**
 * Junta varias categorías en un único mazo para la partida.
 * Las palabras repetidas entre categorías (p. ej. «Coco» en Películas y Comida) solo aparecen una vez.
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
