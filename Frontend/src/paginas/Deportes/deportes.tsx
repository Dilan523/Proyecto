import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import './deportes.css';
import { Carousel } from 'antd';

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
}

interface FeaturedNews {
  id: number;
  title: string;
  image: string;
  category: string;
}

const NewsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 1,
      title: "El deporte no es solo cuestión de agilidad física y mental",
      excerpt: "El deporte no es solo cuestión de agilidad física, bienestar y calidad de vida. Cuando hacemos actividad física, no solo fortalecemos nuestros músculos y mejoramos nuestra resistencia, sino que también, una que también ayuda al bienestar...",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      category: "SALUD",
      likes: 45,
      comments: 12,
      isLiked: false,
      isSaved: false
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
      isSaved: false
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
      isSaved: false
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
      isSaved: false
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredNews.length) % featuredNews.length);
  };
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

  return (
    <div className="news-container">
      {/* Header */}
      <div className="header-section">
        <div className="header-content">
          <div className="admin-toggle">
            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className={isAdmin ? 'admin-active' : 'admin-inactive'}
            >
              {isAdmin ? 'Modo Admin' : 'Modo Usuario'}
            </button>
          </div>
        </div>
      </div>

      <div className="main-content">
        {/* Carrusel */}
 



 
        {/* Header noticias */}
        <div className="news-header">
         {isAdmin && ( 
            <Link to="/CrearArt"  className="add-news-btn">
              <Plus size={20} />
                Agregar Noticia
            </Link>
          )}
        </div>

        {/* Grid de noticias */}
        <div className="news-grid">
          {news.map((item) => (
            <div key={item.id} className="news-card">
              <div className="news-layout">
                <div className="news-image-container">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="news-image"
                  />
                </div>

                <div className="news-content">
                  <div>
                    <div className="news-meta">
                      <span className="news-category">
                        {item.category}
                      </span>
                    </div>
                    
                    <h3 className="news-item-title">
                      {item.title}
                    </h3>
                    
                    <p className="news-excerpt">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="news-actions">
                    <button 
                      onClick={() => toggleLike(item.id)}
                      className={`action-btn ${item.isLiked ? 'action-btn-liked' : 'action-btn-default'}`}
                    >
                      <Heart size={18} className={item.isLiked ? 'fill-current' : ''} />
                      {item.likes}
                    </button>
                    
                    <button className="action-btn action-btn-default">
                      <MessageCircle size={18} />
                      {item.comments}
                    </button>
                    
                    <button className="action-btn action-btn-default">
                      <Share size={18} />
                    </button>
                  </div>

                  <div className="save-action">
                    <button 
                      onClick={() => toggleSave(item.id)}
                      className={`save-btn ${item.isSaved ? 'save-btn-saved' : 'save-btn-default'}`}
                    >
                      <Bookmark size={18} className={item.isSaved ? 'fill-current' : ''} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;