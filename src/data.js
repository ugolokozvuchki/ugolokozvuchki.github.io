const base = import.meta.env.BASE_URL; 

export const ACTORS_DATA = [
  {
    id: 1,
    name: "Денис",
    description: "Головний голос студії. Озвучую епічних лиходіїв, головних героїв та брутальних детективів.",
    // Використовуємо зворотні лапки (`) і ${base} для динамічного шляху
    audioUrl: `${base}audio/sera.mp3`, 
    videos: [
      { 
        url: `${base}video/1.1.Неплохая-отсылочка.mp4`, 
        poster: `${base}video/Хвостатое свидание.png` 
      },
      { 
        url: `${base}video/1.6.Заигрались.mp4`, 
        poster: `${base}video/Хвостатое свидание.png` 
      },
       
    ]
  },
  {
    id: 2,
    name: "Анна",
    description: "Майстер емоційних сцен. Відповідаю за жіночих персонажів.",
    audioUrl: `${base}audio/sera.mp3`,
    videos: [
      { 
        url: `${base}video/1.6.Заигрались.mp4`, 
        poster: `${base}video/Хвостатое свидание.png` 
      }
    ]
  }
  // ... сюди будеш просто додавати нових акторів
];