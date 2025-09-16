import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { Button, Card, Carousel } from 'antd';
import './deportes.css';

interface Comment {
  id: number;
  text: string;
  author: string;
}

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
  commentsList: Comment[];
}

interface FeaturedNews {
  id: number;
  title: string;
  image: string;
  category: string;
}

export default function Deportes() {
  const [isAdmin, setIsAdmin] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [showComments, setShowComments] = useState<{[id: number]: boolean}>({});
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 1,
      title: "El deporte no es solo cuestión de agilidad física y mental",
      excerpt: "El deporte no es solo cuestión de agilidad física, bienestar y calidad de vida. Cuando hacemos actividad física, no solo fortalecemos nuestros músculos y mejoramos nuestra resistencia...",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      category: "SALUD",
      likes: 45,
      comments: 12,
      isLiked: false,
      isSaved: false,
      commentsList: [
        { id: 1, text: "Excelente artículo!", author: "Usuario1" },
        { id: 2, text: "Muy informativo.", author: "Usuario2" }
      ]
    },
    {
      id: 2,
      title: "Nuevas técnicas de entrenamiento revolucionan el atletismo",
      excerpt: "Los últimos avances en ciencias del deporte están cambiando la forma en que los atletas se preparan para las competencias más exigentes del mundo...",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
      category: "ENTRENAMIENTO",
      likes: 32,
      comments: 8,
      isLiked: false,
      isSaved: false,
      commentsList: [
        { id: 1, text: "Interesante!", author: "Usuario3" }
      ]
    },
    {
      id: 3,
      title: "Impacto de la nutrición en el rendimiento deportivo",
      excerpt: "Una alimentación adecuada puede marcar la diferencia entre ganar y perder. Descubre cómo los deportistas de élite optimizan su nutrición...",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
      category: "NUTRICIÓN",
      likes: 28,
      comments: 15,
      isLiked: false,
      isSaved: false,
      commentsList: [
        { id: 1, text: "Buen consejo.", author: "Usuario4" }
      ]
    },
    {
      id: 4,
      title: "La importancia del descanso en el deporte",
      excerpt: "El sueño y la recuperación son tan importantes como el entrenamiento mismo. Exploramos las últimas investigaciones sobre el descanso deportivo...",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
      category: "RECUPERACIÓN",
      likes: 39,
      comments: 6,
      isLiked: false,
      isSaved: false,
      commentsList: [
        { id: 1, text: "Totalmente de acuerdo.", author: "Usuario5" }
      ]
    }
  ]);

  const featuredNews: FeaturedNews[] = [
    {
      id: 1,
      title: "Final del Campeonato Mundial de Fútbol",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=500&fit=crop",
      category: "FÚTBOL"
    },
    {
      id: 2,
      title: "Nuevos récords en atletismo olímpico",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=500&fit=crop",
      category: "ATLETISMO"
    },
    {
      id: 3,
      title: "Innovaciones en equipamiento deportivo",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=500&fit=crop",
      category: "TECNOLOGÍA"
    }
  ];

  const toggleLike = (id: number) => {
    setNews(news.map(item =>
      item.id === id
        ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
        : item
    ));
  };

  const toggleSave = (id: number) => {
    setNews(news.map(item =>
      item.id === id
        ? { ...item, isSaved: !item.isSaved }
        : item
    ));
  };

  const categories = ['Todas', 'SALUD', 'ENTRENAMIENTO', 'NUTRICIÓN', 'RECUPERACIÓN', 'FÚTBOL', 'ATLETISMO', 'TECNOLOGÍA'];
  const filteredNews = news.filter(item => (selectedCategory === 'Todas' || item.category === selectedCategory));

  return (
    <div className="deportes-page news-body">
      <div className="news-container">
        
        <header className="page-header">
           <h1 className="page-title">Últimas Noticias Deportivas</h1>
          <div className="admin-toggle">
            <Button
              onClick={() => setIsAdmin(!isAdmin)}
              type={isAdmin ? 'primary' : 'default'}
              size="small"
            >
              {isAdmin ? 'Modo Admin' : 'Modo Usuario'}
            </Button>
          </div>
        </header>

        <section className="featured-section">
          <Carousel autoplay>
            {featuredNews.map((item) => (
              <div key={item.id} className="featured-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="featured-image"
                />
                <div className="featured-overlay" />
                <div className="featured-content">
                   <span className="featured-category">{item.category}</span>
                   <h2 className="featured-title">{item.title}</h2>
                </div>
              </div>
            ))}
          </Carousel>
        </section>

        <section className="main-content">
          <div className="news-header">
            <h2 className="section-title">Noticias Recientes</h2>
           {isAdmin && (
              <Link to="/crearArt">
                <Button type="primary" icon={<Plus size={18} />}>
                  Agregar Noticia
                </Button>
              </Link>
            )}
          </div>

          <div className="news-grid">
            {filteredNews.map((item) => (
              <Card key={item.id} className="news-card" cover={<img src={item.image} alt={item.title} className="news-image" />}>
                <div className="news-content">
                  <div>
                    <span className="news-category">{item.category}</span>
                    <h3 className="news-item-title">{item.title}</h3>
                    <p className="news-excerpt">{item.excerpt}</p>
                  </div>
                  <div className="news-actions">
                    <Button type="text" size="small" icon={<Heart size={18} />} onClick={() => toggleLike(item.id)} className={"action-btn " + (item.isLiked ? "like-active" : "")}>
                      {item.likes}
                    </Button>
                    <Button type="text" size="small" icon={<MessageCircle size={18} />} onClick={() => setShowComments(prev => ({...prev, [item.id]: !prev[item.id]}))} className="action-btn">
                      {item.comments}
                    </Button>
                    <Button type="text" size="small" icon={<Share2 size={18} />} className="action-btn" />
                    <div className="flex-grow" />
                    <Button type="text" size="small" icon={<Bookmark size={18} />} onClick={() => toggleSave(item.id)} className={"action-btn " + (item.isSaved ? "save-active" : "")} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {filteredNews.map(item => showComments[item.id] && (
          <div key={`comments-${item.id}`} className="comments-section">
            <h4>Comentarios</h4>
            {item.commentsList.map(comment => (
              <div key={comment.id} className="comment">
                <strong>{comment.author}:</strong> {comment.text}
              </div>
            ))}
          </div>
        ))}
              {/* Nueva sección COME SALUDABLE fuera del contenedor news-container */}
      <section className="come-saludable-section">
        <div className="come-saludable-text">
          <h1>COME SALUDABLE</h1>
          <p>
            La importancia de la alimentación en el entrenamiento<br />
            Cuando hablamos de entrenar, muchos piensan solo en el ejercicio físico, pero la verdad es que una parte 
            fundamental del rendimiento y los resultados está en la alimentación. Comer bien no solo ayuda a tener energía para entrenar
            , sino que también permite una mejor recuperación, evita lesiones y mejora el desempeño en cada sesión.<br /><br />
            Una alimentación adecuada aporta los nutrientes que el cuerpo necesita para funcionar correctamente. Los carbohidratos son la 
            principal fuente de energía, las proteínas ayudan a reparar y fortalecer los músculos, y las grasas saludables mantienen el buen
            ionamiento del cuerpo. Además, las vitaminas y minerales juegan un papel clave en mantenernos activos, prevenir fatiga y regular
             los procesos internos.<br /><br />
            Cuando se entrena sin una buena alimentación, el cuerpo se desgasta, se vuelve 
            más propenso a enfermarse y los resultados tardan mucho más en verse. Por eso, cuidar lo que se 
            come antes, durante y después del ejercicio es tan importante como el entrenamiento mismo.<br /><br />
            Al final, cuerpo y mente trabajan juntos, y una alimentación equilibrada es el combustible que mantiene 
            esa máquina andando.<br />
            Comer bien no es solo por estética, sino por salud, bienestar y por respeto al esfuerzo que se hace en cada entrenamiento.<br />
            La comida saludable aporta nutrientes esenciales que fortalecen el cuerpo, mejoran la energía y favorecen la recuperación 
            muscular. Mantener una buena alimentación potencia el rendimiento y optimiza los resultados del entrenamiento diario.
          </p>
        </div>
        <div className="come-saludable-images">
          {[ 
            { id: 1, src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop" },
            { id: 2, src: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&h=300&fit=crop" },
            { id: 3, src: "https://infociudad.com.ar/wp-content/uploads/2017/10/comida-sana-a-domicilio-1-1024x684.jpg" },
            { id: 4, src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop" }
          ].map(item => (
            <Card key={item.id} className="news-card" cover={<img src={item.src} alt={`Imagen saludable ${item.id}`} className="news-image" />}>
              <div className="news-content">
                <div className="news-actions">
                  <Button type="text" size="small" icon={<Heart size={18} />} className="action-btn"></Button>
                  <Button type="text" size="small" icon={<MessageCircle size={18} />} className="action-btn">Comentar</Button>
                  <Button type="text" size="small" icon={<Bookmark size={18} />} className="action-btn"></Button>
                  <Button type="text" size="small" icon={<Share2 size={18} />} className="action-btn">Compartir</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
};
