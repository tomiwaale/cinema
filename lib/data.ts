export interface Movie {
  id: string;
  title: string;
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  genre: string[];
  duration: string;
  rating: string;
  times: string[];
  category?: 'Nollywood' | 'Hollywood';
  language?: string;
  youtubeId?: string;
}

// Bump this string whenever INITIAL_MOVIES changes to bust stale localStorage.
const DATA_VERSION = 'hogis-v4-may2026';

export const INITIAL_MOVIES: Movie[] = [
  {
    id: "m1",
    title: "Mission: Impossible – The Final Reckoning",
    synopsis: "Ethan Hunt and his IMF team race against time to track down and dismantle a terrifying AI weapon before it triggers global chaos. Tom Cruise returns in the most explosive Mission yet.",
    posterUrl: "https://image.tmdb.org/t/p/w500/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/xPNDRM50a58uvv1il2GVZrtWjkZ.jpg",
    genre: ["Action", "Thriller"],
    duration: "2h 49m",
    rating: "PG-13",
    times: ["11:00 AM", "2:30 PM", "6:00 PM", "9:15 PM"],
    category: "Hollywood",
    language: "English",
    youtubeId: "fsQgc9pCyDU"
  },
  {
    id: "m2",
    title: "Sinners",
    synopsis: "Twin brothers try to leave their troubled lives behind and return to their hometown to start again — only to discover that an even greater evil is waiting to welcome them back.",
    posterUrl: "https://image.tmdb.org/t/p/w500/fWPgbnt2LSqkQ6cdQc0SZN9CpLm.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/nAxGnGHOsfzufThz20zgmRwKur3.jpg",
    genre: ["Horror", "Thriller"],
    duration: "2h 18m",
    rating: "R",
    times: ["10:00 AM", "1:15 PM", "4:30 PM", "8:00 PM"],
    category: "Hollywood",
    language: "English",
    youtubeId: "bKGxHflevuk"
  },
  {
    id: "m3",
    title: "Efunroye: The Unicorn",
    synopsis: "A sweeping historical epic chronicling the life of Madam Efunroye Tinubu — a powerful 19th-century Yoruba merchant, slave trader, and kingmaker who shaped the destiny of Lagos. Starring Faithia Williams, Odunlade Adekola, and Femi Adebayo.",
    posterUrl: "/posters/efunroye.jpg",
    backdropUrl: "/posters/efunroye.jpg",
    genre: ["Drama", "Historical"],
    duration: "2h 40m",
    rating: "PG-13",
    times: ["10:30 AM", "1:45 PM", "5:15 PM", "8:30 PM"],
    category: "Nollywood",
    language: "Yoruba",
    youtubeId: "Put0glpD5wM"
  },
  {
    id: "m4",
    title: "Ajosepo 2: The Gathering",
    synopsis: "The family is back and the wahala is worse. Two families reunite for a lavish Yoruba wedding — but old tensions, new drama, and chaotic relatives threaten to tear everything apart. Starring Toyin Abraham, Timini Egbuson, and Bisola Aiyeola.",
    posterUrl: "/posters/ajosepo2.jpg",
    backdropUrl: "/posters/ajosepo2.jpg",
    genre: ["Comedy", "Drama"],
    duration: "2h 05m",
    rating: "PG",
    times: ["9:30 AM", "12:15 PM", "3:30 PM", "7:00 PM"],
    category: "Nollywood",
    language: "Yoruba",
    youtubeId: "DnIJO6C7h3g"
  }
];

export const getMovies = (): Movie[] => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('hogis_version') !== DATA_VERSION) {
      localStorage.removeItem('hogis_movies');
      localStorage.setItem('hogis_version', DATA_VERSION);
      return INITIAL_MOVIES;
    }
    const stored = localStorage.getItem('hogis_movies');
    if (stored) return JSON.parse(stored);
  }
  return INITIAL_MOVIES;
};

export const saveMovies = (movies: Movie[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('hogis_movies', JSON.stringify(movies));
    localStorage.setItem('hogis_version', DATA_VERSION);
  }
};

export interface Order {
  id: string;
  movie: Movie;
  time: string;
  seats: string[];
  totalPrice: number;
  customerName: string;
  email: string;
  status: 'VALID' | 'USED' | 'REFUNDED';
  createdAt: string;
}

export const getOrders = (): Order[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('hogis_orders');
    if (stored) return JSON.parse(stored);
  }
  return [];
};

export const saveOrders = (orders: Order[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('hogis_orders', JSON.stringify(orders));
  }
};

export const generateSeats = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const columns = 12;
  const seats = [];

  for (let i = 0; i < rows.length; i++) {
    for (let j = 1; j <= columns; j++) {
      seats.push({
        id: `${rows[i]}${j}`,
        row: rows[i],
        number: j,
        isOccupied: Math.random() < 0.25,
        price: rows[i] === 'G' || rows[i] === 'H' ? 5000 : 3000
      });
    }
  }
  return seats;
};
