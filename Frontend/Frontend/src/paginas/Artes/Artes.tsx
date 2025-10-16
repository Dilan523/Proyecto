import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { Button, Card } from 'antd';
import CarouselComponent from '../../components/CarouselComponent';
import './artes.css';
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

export default function Artes() {
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedNoticia, setSelectedNoticia] = useState<NewsItem | null>(null);

  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 1,
      title: "La revolución del arte digital",
      excerpt: "Artistas fusionan tecnología y creatividad para redefinir los límites del arte.",
      image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1200&q=80",
      category: "PINTURA",
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
      title: "Teatro callejero: arte sin escenario",
      excerpt: "Las calles se convierten en escenarios vivos para obras que conectan con el público.",
      image: "https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=1200&q=80",
      category: "TEATRO",
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
      title: "Fotografía urbana: la ciudad como lienzo",
      excerpt: "Los fotógrafos contemporáneos encuentran belleza en el caos urbano.",
      image: "https://images.unsplash.com/photo-1473187983305-f615310e7daa?auto=format&fit=crop&w=1200&q=80",
      category: "FOTOGRAFÍA",
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
      title: "Ritmos del alma",
      excerpt: "Nuevos sonidos y artistas emergentes redefinen la escena musical latinoamericana.",
      image: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=1200&q=80",
      category: "MÚSICA",
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
      title: "La revolución del arte digital",
      image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1200&q=80",
      category: "PINTURA",
    },
    {
      id: 2,
      title: "Teatro callejero: arte sin escenario",
      image: "https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=1200&q=80",
      category: "TEATRO",
    },
    {
      id: 3,
      title: "Fotografía urbana: la ciudad como lienzo",
      image: "https://images.unsplash.com/photo-1473187983305-f615310e7daa?auto=format&fit=crop&w=1200&q=80",
      category: "FOTOGRAFÍA",
    },
  ];

  const autores = [
    {
      id: 1,
      nombre: "Ana Ruiz",
      articulo: "El arte que respira ciudad",
      imagen: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: 2,
      nombre: "Carlos Medina",
      articulo: "La nueva era de los museos",
      imagen: "https://i.pravatar.cc/100?img=5",
    },
    {
      id: 3,
      nombre: "María Gutiérrez",
      articulo: "Pintar con el alma",
      imagen: "https://i.pravatar.cc/100?img=7",
    },
    {
      id: 4,
      nombre: "Andrés Pardo",
      articulo: "Teatro y resistencia",
      imagen: "https://i.pravatar.cc/100?img=9",
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
    <div className="artes-page news-body">
      <div className="news-container">
        <CarouselComponent items={artesDestacadas} />

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

        {/* Modal de comentarios */}
        {selectedNoticia && (
          <CommentsModal
            isOpen={showCommentsModal}
            onClose={handleCloseComments}
            noticiaId={selectedNoticia.id}
            noticiaTitle={selectedNoticia.title}
          />
        )}

        {/* Barra de autores */}
        <div className="autores-bar">
          {autores.map((a) => (
            <div key={a.id} className="autor">
              <img src={a.imagen} alt={a.nombre} />
              <h4>{a.nombre}</h4>
              <p>{a.articulo}</p>
            </div>
          ))}
        </div>

        {/* COME SALUDABLE */}
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

      <Footer />
    </div>
  );
}
