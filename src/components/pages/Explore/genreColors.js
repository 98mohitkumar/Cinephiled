export const genreColorsMap = [
  {
    id: 28,
    name: "Action",
    backgroundColor: "hsla(0, 75%, 35%, 1)", // Deep blood red for intensity and danger
    backgroundImage: `radial-gradient(circle at 30% 70%, hsla(12, 80%, 40%, 1) 15%, transparent 70%),
    radial-gradient(circle at 80% 20%, hsla(45, 85%, 35%, 1) 18%, transparent 65%),
    radial-gradient(circle at 50% 50%, hsla(210, 75%, 30%, 1) 20%, transparent 75%),
    radial-gradient(circle at 60% 90%, hsla(0, 90%, 45%, 1) 12%, transparent 60%);`
  },
  {
    id: 12,
    name: "Adventure",
    backgroundColor: "hsla(32, 70%, 40%, 1)", // A deep, earthy orange-brown for rugged adventure
    backgroundImage: `radial-gradient(circle at 30% 70%, hsla(200, 80%, 35%, 1) 15%, transparent 70%),
    radial-gradient(circle at 50% 50%, hsla(10, 75%, 40%, 1) 20%, transparent 75%),
    radial-gradient(circle at 60% 90%, hsla(120, 50%, 30%, 1) 12%, transparent 60%);`
  },
  {
    id: 16,
    name: "Animation",
    backgroundColor: "hsla(255, 65%, 35%, 1)", // A deeper, rich purple for a vibrant yet grounded feel
    backgroundImage: `radial-gradient(circle at 30% 70%, hsla(10, 75%, 40%, 1) 18%, transparent 70%),
    radial-gradient(circle at 80% 20%, hsla(45, 80%, 38%, 1) 20%, transparent 65%),
    radial-gradient(circle at 50% 50%, hsla(190, 75%, 35%, 1) 22%, transparent 75%),
    radial-gradient(circle at 70% 30%, hsla(120, 70%, 32%, 1) 15%, transparent 60%),
    radial-gradient(circle at 40% 60%, hsla(330, 70%, 42%, 1) 12%, transparent 65%);`
  },
  {
    id: 35,
    name: "Comedy",
    backgroundColor: "hsla(42, 70%, 40%, 1)", // Warm golden amber base
    backgroundImage: `radial-gradient(circle at 20% 30%, hsla(355, 75%, 45%, 1) 20%, transparent 70%),
    radial-gradient(circle at 80% 40%, hsla(220, 65%, 42%, 1) 18%, transparent 75%),
    radial-gradient(circle at 50% 70%, hsla(280, 68%, 40%, 1) 22%, transparent 80%),
    radial-gradient(circle at 30% 80%, hsla(190, 60%, 36%, 1) 25%, transparent 85%),
    radial-gradient(circle at 70% 20%, hsla(15, 70%, 38%, 1) 15%, transparent 65%);`
  },
  {
    id: 80,
    name: "Crime",
    backgroundColor: "hsla(220, 25%, 25%, 1)", // Dark blue-gray base
    backgroundImage: `radial-gradient(circle at 15% 85%, hsla(0, 70%, 35%, 1) 20%, transparent 70%),
    radial-gradient(circle at 85% 15%, hsla(220, 50%, 32%, 1) 18%, transparent 75%),
    radial-gradient(circle at 40% 40%, hsla(45, 40%, 38%, 1) 16%, transparent 80%),
    radial-gradient(circle at 75% 80%, hsla(280, 45%, 28%, 1) 14%, transparent 65%),
    radial-gradient(circle at 25% 30%, hsla(180, 45%, 30%, 1) 12%, transparent 70%);`
  },
  {
    id: 99,
    name: "Documentary",
    backgroundColor: "hsla(190, 40%, 30%, 1)", // Deep muted teal as the base
    backgroundImage: `radial-gradient(circle at 20% 70%, hsla(35, 50%, 45%, 1) 15%, transparent 70%),
    radial-gradient(circle at 80% 30%, hsla(160, 40%, 40%, 1) 18%, transparent 75%),
    radial-gradient(circle at 50% 50%, hsla(220, 50%, 35%, 1) 20%, transparent 80%),
    radial-gradient(circle at 30% 20%, hsla(10, 30%, 38%, 1) 14%, transparent 65%),
    radial-gradient(circle at 85% 85%, hsla(120, 35%, 28%, 1) 12%, transparent 70%);`
  },
  {
    id: 18,
    name: "Drama",
    backgroundColor: "hsla(340, 60%, 30%, 1)", // Deep wine red as the base
    backgroundImage: `radial-gradient(circle at 30% 75%, hsla(280, 50%, 35%, 1) 15%, transparent 70%),
    radial-gradient(circle at 80% 40%, hsla(220, 45%, 38%, 1) 18%, transparent 75%),
    radial-gradient(circle at 50% 50%, hsla(360, 55%, 42%, 1) 20%, transparent 80%),
    radial-gradient(circle at 20% 30%, hsla(30, 30%, 38%, 1) 14%, transparent 65%),
    radial-gradient(circle at 90% 85%, hsla(260, 40%, 28%, 1) 12%, transparent 70%);`
  },
  {
    id: 10751,
    name: "Family",
    backgroundColor: "hsla(40, 70%, 50%, 1)", // Warm golden yellow as the base
    backgroundImage: `radial-gradient(circle at 30% 80%, hsla(20, 85%, 55%, 1) 15%, transparent 70%),
    radial-gradient(circle at 70% 30%, hsla(200, 70%, 50%, 1) 18%, transparent 75%),
    radial-gradient(circle at 50% 50%, hsla(100, 55%, 45%, 1) 20%, transparent 80%),
    radial-gradient(circle at 20% 20%, hsla(50, 65%, 55%, 1) 14%, transparent 65%),
    radial-gradient(circle at 85% 85%, hsla(10, 80%, 60%, 1) 12%, transparent 70%);`
  },
  {
    id: 14,
    name: "Fantasy",
    backgroundColor: "hsla(260, 70%, 45%, 1)", // Deep mystical purple
    backgroundImage: `radial-gradient(circle at 20% 80%, hsla(280, 75%, 50%, 1) 15%, transparent 70%),
    radial-gradient(circle at 70% 20%, hsla(200, 65%, 45%, 1) 18%, transparent 75%),
    radial-gradient(circle at 50% 50%, hsla(160, 70%, 50%, 1) 20%, transparent 80%),
    radial-gradient(circle at 10% 10%, hsla(300, 60%, 55%, 1) 12%, transparent 65%),
    radial-gradient(circle at 85% 85%, hsla(220, 80%, 40%, 1) 10%, transparent 70%);`
  },
  {
    id: 36,
    name: "History",
    backgroundColor: "hsla(30, 45%, 40%, 1)", // Warm earthy brown
    backgroundImage: `radial-gradient(circle at 30% 70%, hsla(20, 55%, 35%, 1) 15%, transparent 70%),
    radial-gradient(circle at 80% 30%, hsla(50, 50%, 45%, 1) 18%, transparent 75%),
    radial-gradient(circle at 50% 50%, hsla(10, 45%, 30%, 1) 20%, transparent 80%),
    radial-gradient(circle at 15% 20%, hsla(40, 60%, 38%, 1) 12%, transparent 65%),
    radial-gradient(circle at 85% 85%, hsla(60, 35%, 50%, 1) 10%, transparent 70%);`
  },
  {
    id: 27,
    name: "Horror",
    backgroundColor: "hsla(350, 80%, 15%, 1)", // Deep blood red
    backgroundImage: `radial-gradient(circle at 30% 70%, hsla(0, 85%, 20%, 1) 15%, transparent 75%),
    radial-gradient(circle at 80% 30%, hsla(280, 60%, 20%, 1) 18%, transparent 70%),
    radial-gradient(circle at 50% 50%, hsla(0, 100%, 10%, 1) 20%, transparent 80%),
    radial-gradient(circle at 15% 20%, hsla(240, 50%, 15%, 1) 12%, transparent 65%),
    radial-gradient(circle at 85% 85%, hsla(310, 40%, 25%, 1) 10%, transparent 70%);`
  },
  {
    id: 10402,
    name: "Music",
    backgroundColor: "hsla(275, 80%, 42%, 1)", // Deep electric purple
    backgroundImage: `radial-gradient(circle at 20% 80%, hsla(200, 90%, 45%, 1) 15%, transparent 70%),
    radial-gradient(circle at 80% 20%, hsla(330, 85%, 50%, 1) 18%, transparent 65%),
    radial-gradient(circle at 50% 50%, hsla(260, 100%, 35%, 1) 20%, transparent 75%),
    radial-gradient(circle at 10% 30%, hsla(180, 75%, 40%, 1) 12%, transparent 60%),
    radial-gradient(circle at 85% 85%, hsla(310, 70%, 55%, 1) 10%, transparent 70%);`
  },
  {
    id: 9648,
    name: "Mystery",
    backgroundColor: "hsla(250, 70%, 25%, 1)", // Deep mysterious blue
    backgroundImage: `radial-gradient(circle at 30% 70%, hsla(210, 80%, 15%, 1) 20%, transparent 70%),
    radial-gradient(circle at 75% 30%, hsla(270, 65%, 25%, 1) 15%, transparent 60%),
    radial-gradient(circle at 50% 50%, hsla(320, 50%, 20%, 1) 12%, transparent 80%),
    radial-gradient(circle at 85% 80%, hsla(180, 40%, 25%, 1) 10%, transparent 75%);`
  },
  {
    id: 10749,
    name: "Romance",
    backgroundColor: "hsla(340, 75%, 40%, 1)", // Deep romantic red
    backgroundImage: `radial-gradient(circle at 30% 70%, hsla(0, 85%, 45%, 1) 15%, transparent 65%),
    radial-gradient(circle at 80% 20%, hsla(330, 70%, 50%, 1) 18%, transparent 60%),
    radial-gradient(circle at 50% 50%, hsla(280, 60%, 40%, 1) 12%, transparent 75%),
    radial-gradient(circle at 20% 30%, hsla(350, 60%, 55%, 1) 10%, transparent 70%);`
  },
  {
    id: 878,
    name: "Science Fiction",
    backgroundColor: "hsla(220, 85%, 30%, 1)", // Deep space blue
    backgroundImage: `radial-gradient(circle at 40% 80%, hsla(255,90%,45%,1) 15%, transparent 60%),
    radial-gradient(circle at 75% 25%, hsla(180, 70%, 40%, 1) 18%, transparent 70%),
    radial-gradient(circle at 50% 50%, hsla(260, 100%, 35%, 1) 20%, transparent 75%),
    radial-gradient(circle at 15% 20%, hsla(300, 80%, 50%, 1) 12%, transparent 65%);`
  },
  {
    id: 10770,
    name: "TV Movie",
    backgroundColor: "hsla(45, 75%, 35%, 1)", // Cinematic warm gold
    backgroundImage: `radial-gradient(circle at 50% 60%, hsla(210, 80%, 35%, 1) 15%, transparent 70%),
    radial-gradient(circle at 30% 20%, hsla(260, 70%, 30%, 1) 18%, transparent 65%),
    radial-gradient(circle at 80% 50%, hsla(45, 90%, 40%, 1) 20%, transparent 75%),
    radial-gradient(circle at 20% 80%, hsla(320, 50%, 35%, 1) 10%, transparent 70%);`
  },
  {
    id: 53,
    name: "Thriller",
    backgroundColor: "hsla(350, 75%, 30%, 1)", // Dark blood red
    backgroundImage: `radial-gradient(circle at 30% 80%, hsla(0, 80%, 30%, 1) 18%, transparent 65%),
    radial-gradient(circle at 70% 20%, hsla(255,60%,25%,1) 15%, transparent 60%),
    radial-gradient(circle at 50% 50%, hsla(200, 40%, 20%, 1) 12%, transparent 70%),
    radial-gradient(circle at 85% 70%, hsla(280, 50%, 30%, 1) 10%, transparent 75%);`
  },
  {
    id: 10752,
    name: "War",
    backgroundColor: "hsla(100, 50%, 20%, 1)", // Military green
    backgroundImage: `radial-gradient(circle at 50% 70%, hsla(90, 55%, 18%, 1) 18%, transparent 60%),
    radial-gradient(circle at 30% 20%, hsla(30, 50%, 25%, 1) 15%, transparent 70%),
    radial-gradient(circle at 80% 50%, hsla(10, 40%, 20%, 1) 12%, transparent 75%),
    radial-gradient(circle at 20% 80%, hsla(200, 30%, 15%, 1) 10%, transparent 65%);`
  },
  {
    id: 37,
    name: "Western",
    backgroundColor: "hsla(30, 75%, 30%, 1)", // Earthy western brown
    backgroundImage: `radial-gradient(circle at 60% 60%, hsla(20, 80%, 30%, 1) 18%, transparent 60%),
    radial-gradient(circle at 20% 30%, hsla(40, 70%, 35%, 1) 15%, transparent 65%),
    radial-gradient(circle at 80% 40%, hsla(10, 50%, 25%, 1) 12%, transparent 70%),
    radial-gradient(circle at 50% 80%, hsla(50, 40%, 20%, 1) 10%, transparent 75%);`
  },
  {
    id: 10759,
    name: "Action & Adventure",
    backgroundColor: "hsla(10, 85%, 35%, 1)", // Deep red-orange
    backgroundImage: `radial-gradient(circle at 30% 80%, hsla(20, 90%, 40%, 1) 18%, transparent 65%),
    radial-gradient(circle at 65% 25%, hsla(225,75%,35%,1) 15%, transparent 60%),
    radial-gradient(circle at 50% 50%, hsla(45, 80%, 50%, 1) 12%, transparent 70%),
    radial-gradient(circle at 85% 70%, hsla(350, 65%, 45%, 1) 10%, transparent 75%);`
  },
  {
    id: 10762,
    name: "Kids",
    backgroundColor: "hsla(45, 90%, 55%, 1)", // Warm yellow
    backgroundImage: `radial-gradient(circle at 50% 50%, hsla(180, 85%, 60%, 1) 18%, transparent 60%),
    radial-gradient(circle at 20% 30%, hsla(300, 75%, 70%, 1) 15%, transparent 70%),
    radial-gradient(circle at 80% 40%, hsla(200, 80%, 65%, 1) 12%, transparent 75%),
    radial-gradient(circle at 40% 80%, hsla(15, 80%, 55%, 1) 10%, transparent 70%);`
  },
  {
    id: 10763,
    name: "News",
    backgroundColor: "hsla(225, 80%, 25%, 1)", // Dark navy blue
    backgroundImage: `radial-gradient(circle at 50% 50%, hsla(210,75%,30%,1) 18%, transparent 60%),
    radial-gradient(circle at 30% 20%, hsla(350, 60%, 35%, 1) 15%, transparent 65%),
    radial-gradient(circle at 80% 40%, hsla(180, 50%, 40%, 1) 12%, transparent 70%),
    radial-gradient(circle at 40% 80%, hsla(0, 85%, 30%, 1) 10%, transparent 75%);`
  },
  {
    id: 10764,
    name: "Reality",
    backgroundColor: "hsla(280, 85%, 40%, 1)", // Deep violet
    backgroundImage: `radial-gradient(circle at 60% 50%, hsla(320, 85%, 50%, 1) 18%, transparent 60%),
    radial-gradient(circle at 20% 30%, hsla(200, 75%, 45%, 1) 15%, transparent 70%),
    radial-gradient(circle at 80% 40%, hsla(350, 65%, 55%, 1) 12%, transparent 75%),
    radial-gradient(circle at 50% 80%, hsla(240, 80%, 35%, 1) 10%, transparent 70%);`
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
    backgroundColor: "hsla(260, 75%, 40%, 1)", // Deep sci-fi purple
    backgroundImage: `radial-gradient(circle at 40% 70%, hsla(180, 85%, 45%, 1) 15%, transparent 65%),
    radial-gradient(circle at 70% 30%, hsla(300, 80%, 50%, 1) 12%, transparent 70%),
    radial-gradient(circle at 20% 20%, hsla(50, 90%, 45%, 1) 10%, transparent 75%),
    radial-gradient(circle at 85% 80%, hsla(220, 70%, 35%, 1) 10%, transparent 75%);`
  },
  {
    id: 10766,
    name: "Soap",
    backgroundColor: "hsla(350, 80%, 50%, 1)", // Passionate deep red
    backgroundImage: `radial-gradient(circle at 50% 50%, hsla(45, 90%, 55%, 1) 15%, transparent 65%),
    radial-gradient(circle at 30% 20%, hsla(340, 85%, 65%, 1) 12%, transparent 70%),
    radial-gradient(circle at 80% 60%, hsla(275,70%,55%,1) 10%, transparent 75%),
    radial-gradient(circle at 70% 80%, hsla(10, 90%, 45%, 1) 10%, transparent 70%);`
  },
  {
    id: 10767,
    name: "Talk",
    backgroundColor: "hsla(25, 85%, 55%, 1)", // Vibrant orange
    backgroundImage: `radial-gradient(circle at 60% 50%, hsla(220, 80%, 50%, 1) 15%, transparent 65%),
    radial-gradient(circle at 30% 20%, hsla(300, 75%, 60%, 1) 12%, transparent 70%),
    radial-gradient(circle at 80% 40%, hsla(20, 85%, 55%, 1) 10%, transparent 75%),
    radial-gradient(circle at 50% 80%, hsla(180, 70%, 45%, 1) 10%, transparent 70%);`
  },
  {
    id: 10768,
    name: "War & Politics",
    backgroundColor: "hsla(355, 85%, 32%, 1)", // Dark red for intensity
    backgroundImage: `radial-gradient(circle at 30% 70%, hsla(220, 70%, 25%, 1) 15%, transparent 65%),
    radial-gradient(circle at 70% 20%, hsla(90, 65%, 35%, 1) 12%, transparent 70%),
    radial-gradient(circle at 40% 40%, hsla(180, 50%, 30%, 1) 10%, transparent 75%),
    radial-gradient(circle at 80% 60%, hsla(0,80%,40%,1) 10%, transparent 70%);`
  }
];
