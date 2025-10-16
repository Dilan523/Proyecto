import React, { useState } from 'react';
import { Plus, Heart, MessageCircle, Share2, Bookmark, BookOpen, Music, Film, Landmark } from 'lucide-react';
import { Button, Card } from 'antd';
import CarouselComponent from '../../components/CarouselComponent';
import './Cultura.css';
import CommentsModal from '../../components/CommentsModal';
import Footer from '../../components/Footer';

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

interface ArteDestacado {
  id: number;
  title: string;
  image: string;
  category: string;
}

interface CultureCategory {
  id: number;
  title: string;
  image: string;
  description: string;
  icon: string;
}

export default function Cultura() {
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedNoticia, setSelectedNoticia] = useState<NewsItem | null>(null);

  const cultureCategories: CultureCategory[] = [
    {
      id: 1,
      title: 'Literatura',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop',
      description: 'Sumérgete en mundos imaginarios y reflexiones profundas a través de la palabra escrita. Un viaje por las grandes obras de la literatura universal, la poesía y el ensayo contemporáneo.',
      icon: '📚',
    },
    {
      id: 2,
      title: 'Música',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      description: 'Explora el poder de la música en la cultura. Desde géneros tradicionales hasta las tendencias modernas, descubre cómo la música une y expresa emociones.',
      icon: '🎵',
    },
    {
      id: 3,
      title: 'Cine',
      image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800&h=600&fit=crop',
      description: 'Descubre la magia del séptimo arte. Analizamos películas de culto, directores icónicos y el impacto del cine en la cultura popular.',
      icon: '🎬',
    },
    {
      id: 4,
      title: 'Tradiciones',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
      description: 'Conoce las tradiciones y costumbres que definen nuestra identidad cultural. Festivales, rituales y prácticas que unen comunidades.',
      icon: '🎭',
    },
  ];

  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 1,
      title: "La literatura como herramienta de cambio social",
      excerpt: "La literatura no solo entretiene, sino que transforma sociedades y mentes...",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
      category: "LITERATURA",
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
      title: "Evolución de la música en la cultura moderna",
      excerpt: "Cómo la música ha evolucionado y sigue influyendo en nuestras vidas...",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      category: "MÚSICA",
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
      title: "El cine como reflejo de la sociedad",
      excerpt: "Análisis de cómo las películas capturan y critican aspectos sociales...",
      image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&h=300&fit=crop",
      category: "CINE",
      likes: 28,
      comments: 15,
      isLiked: false,
      isSaved: false,
      commentsList: [
        { id: 1, text: "Buen análisis.", author: "Usuario4" }
      ]
    },
    {
      id: 4,
      title: "Preservación de tradiciones culturales",
      excerpt: "Importancia de mantener vivas nuestras raíces culturales...",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop",
      category: "TRADICIONES",
      likes: 39,
      comments: 6,
      isLiked: false,
      isSaved: false,
      commentsList: [
        { id: 1, text: "Totalmente de acuerdo.", author: "Usuario5" }
      ]
    }
  ]);

  const artesDestacadas: ArteDestacado[] = [
    {
      id: 1,
      title: "Festival Internacional de Literatura",
      image:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=500&fit=crop",
      category: "LITERATURA",
    },
    {
      id: 2,
      title: "Concierto de Música Tradicional",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=500&fit=crop",
      category: "MÚSICA",
    },
    {
      id: 3,
      title: "Premios de Cine Nacional",
      image:
        "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=1200&h=500&fit=crop",
      category: "CINE",
    },
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

  const handleOpenComments = (noticia: NewsItem) => {
    setSelectedNoticia(noticia);
    setShowCommentsModal(true);
  };

  const handleCloseComments = () => {
    setShowCommentsModal(false);
    setSelectedNoticia(null);
  };

  const filteredNews = news;

  return (
    <div className="cultura-page">
      <div className="cultura-container">

        <CarouselComponent items={artesDestacadas} />

        <section className="cultura-gallery-accordion">
          {cultureCategories.map((categoria) => (
            <div key={categoria.id} className="cultura-card-item">
              <div className="cultura-card-image-wrapper">
                <img src={categoria.image} alt={categoria.title} className="cultura-card-image" />
                <div className="cultura-card-overlay" />
              </div>
              <div className="cultura-card-content">
                <div className="cultura-card-title-wrapper">
                  <div className="cultura-card-icon">
                    {categoria.id === 1 && <BookOpen size={20} />}
                    {categoria.id === 2 && <Music size={20} />}
                    {categoria.id === 3 && <Film size={20} />}
                    {categoria.id === 4 && <Landmark size={20} />}
                  </div>
                  <h3 className="cultura-card-title">{categoria.title}</h3>
                </div>
                <button className="cultura-card-trigger">
                  <Plus size={20} />
                </button>
              </div>
              <div className="cultura-card-details">
                <p>{categoria.description}</p>
                <Button type="primary" className="category-btn">
                  Ver más
                </Button>
              </div>
            </div>
          ))}
        </section>

        <section className="main-content">
          <div className="news-grid">
            {filteredNews.map(item => (
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
                    <Button type="text" size="small" icon={<MessageCircle size={18} />} onClick={() => handleOpenComments(item)} className="action-btn">
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

        {selectedNoticia && (
          <CommentsModal
            isOpen={showCommentsModal}
            onClose={handleCloseComments}
            noticiaId={selectedNoticia.id}
            noticiaTitle={selectedNoticia.title}
          />
        )}

      </div>
      <Footer />
    </div>
  );
}
