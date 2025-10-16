import axios from 'axios';

export interface Noticia {
  id: number;
  titulo: string;
  contenido: string;
  contenidoTexto: string;
  categoria: string;
  fecha: string;
  imagen?: string;
  etiquetas: string[];
  likes: number;
  comentarios: number;
  compartidos: number;
  autor: string;
  estado: 'borrador' | 'publicado';
}

const STORAGE_KEY = 'noticias_creadas';

// Función para obtener todas las noticias creadas desde localStorage
export const getNoticiasCreadas = (): Noticia[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error al obtener noticias:', error);
    return [];
  }
};

// Función para guardar una nueva noticia
export const crearNoticia = async (noticiaData: Omit<Noticia, 'id' | 'likes' | 'comentarios' | 'compartidos'>): Promise<Noticia> => {
  try {
    // Simular envío al backend (por ahora localStorage)
    const noticias = getNoticiasCreadas();
    const nuevaNoticia: Noticia = {
      ...noticiaData,
      id: Date.now(), // ID único basado en timestamp
      likes: 0,
      comentarios: 0,
      compartidos: 0,
    };

    noticias.unshift(nuevaNoticia); // Agregar al inicio
    localStorage.setItem(STORAGE_KEY, JSON.stringify(noticias));

    // Aquí irá la llamada real al backend cuando esté listo
    // const response = await axios.post('/api/noticias', noticiaData);
    // return response.data;

    return nuevaNoticia;
  } catch (error) {
    console.error('Error al crear noticia:', error);
    throw error;
  }
};

// Función para actualizar likes de una noticia
export const toggleLikeNoticia = (id: number): void => {
  const noticias = getNoticiasCreadas();
  const index = noticias.findIndex(n => n.id === id);
  if (index !== -1) {
    // Aquí se podría hacer una llamada al backend para likes
    // Por ahora, solo local
    noticias[index].likes += 1; // Simplificado, en realidad toggle
    localStorage.setItem(STORAGE_KEY, JSON.stringify(noticias));
  }
};

// Función para actualizar guardados (simulado)
export const toggleSaveNoticia = (id: number): void => {
  // Por ahora solo log, luego backend
  console.log('Guardar noticia:', id);
};

// Función para compartir noticia
export const shareNoticia = (noticia: Noticia): void => {
  if (navigator.share) {
    navigator.share({
      title: noticia.titulo,
      text: noticia.contenidoTexto.substring(0, 100) + '...',
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert('Enlace copiado al portapapeles');
  }
};

// Función para obtener noticias por categoría (simulado)
export const getNoticiasPorCategoria = (categoria: string): Noticia[] => {
  const noticias = getNoticiasCreadas();
  return noticias.filter(n => n.categoria.toLowerCase() === categoria.toLowerCase());
};
