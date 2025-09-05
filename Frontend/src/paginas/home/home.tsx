import React, { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Search, User } from "lucide-react";
import "./home.css";

const imagenIzquierda = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Logo_SENA.svg/1200px-Logo_SENA.svg.png";
const imagenDerecha = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Logo_SENA.svg/1200px-Logo_SENA.svg.png";

const imagenesDestacadas = [
  { 
    urlImagen: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    alt: 'Análisis de datos', 
    texto: 'Análisis de tendencias tecnológicas',
    categoria: 'TECNOLOGÍA',
    fecha: 'hace 1 día'
  },
  { 
    urlImagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    alt: 'Estudiante', 
    texto: 'Formación en competencias digitales',
    categoria: 'EDUCACIÓN',
    fecha: 'hace 2 días'
  },
  { 
    urlImagen: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    alt: 'Trabajo en equipo', 
    texto: 'Proyectos colaborativos exitosos',
    categoria: 'CULTURA',
    fecha: 'hace 3 días'
  },
  { 
    urlImagen: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    alt: 'Innovación', 
    texto: 'Nuevas metodologías de enseñanza',
    categoria: 'INNOVACIÓN',
    fecha: 'hace 4 días'
  },
  { 
    urlImagen: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    alt: 'Laboratorio', 
    texto: 'Laboratorios de última tecnología',
    categoria: 'CIENCIA',
    fecha: 'hace 5 días'
  }
];

const iconosRedes = {
  facebook: "https://cdn-icons-png.flaticon.com/512/124/124010.png",
  instagram: "https://cdn-icons-png.flaticon.com/512/174/174855.png",
  x: "https://cdn-icons-png.flaticon.com/512/124/124021.png",
  youtube: "https://cdn-icons-png.flaticon.com/512/174/174883.png",
};

const noticiasRelevantes = [
  {
    id: 1,
    titulo: "Desarticulada banda criminal en operativo conjunto",
    resumen: "Las autoridades llevaron a cabo un exitoso operativo que resultó en la captura de 12 integrantes de una organización delictiva dedicada al hurto de mercancía.",
    imagen: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categoria: "SEGURIDAD",
    fecha: "hace 2 horas",
    autor: "Redacción SN-52",
    likes: 45,
    comentarios: 12,
    compartidos: 8
  },
  {
    id: 2,
    titulo: "Nuevos programas de formación en tecnología",
    resumen: "El centro anuncia la apertura de 5 nuevos programas de formación en áreas de inteligencia artificial y desarrollo web.",
    imagen: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categoria: "EDUCACIÓN",
    fecha: "hace 4 horas",
    autor: "Coordinación Académica",
    likes: 78,
    comentarios: 23,
    compartidos: 15
  },
  {
    id: 3,
    titulo: "Festival cultural reúne a talentos juveniles",
    resumen: "Más de 200 jóvenes participaron en el festival anual que promueve las expresiones artísticas y culturales de la región.",
    imagen: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categoria: "CULTURA",
    fecha: "hace 6 horas",
    autor: "Área Cultural",
    likes: 92,
    comentarios: 18,
    compartidos: 22
  },
  {
    id: 4,
    titulo: "Avances en proyectos de investigación aplicada",
    resumen: "Estudiantes e instructores presentaron los resultados de sus proyectos de investigación en el evento semestral de innovación.",
    imagen: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categoria: "INVESTIGACIÓN",
    fecha: "hace 8 horas",
    autor: "Centro de Innovación",
    likes: 67,
    comentarios: 31,
    compartidos: 19
  }
];

export const Inicio: React.FC = () => {
  const [likedArticles, setLikedArticles] = useState<Set<number>>(new Set());
  const [savedArticles, setSavedArticles] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const handleLike = (articleId: number) => {
    setLikedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const handleSave = (articleId: number) => {
    setSavedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const handleShare = (article: any) => {
    if (navigator.share) {
      navigator.share({
        title: article.titulo,
        text: article.resumen,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <div className="container">
      {/* Main Container */}
      <div className="main-container">
        {/* Sidebar Left */}
        <aside className="sidebar-left">
          {/* Search */}
          <div className="sidebar-section">
            <h3>Search</h3>
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Buscar..."
                className="sidebar-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Featured Article */}
          <div className="sidebar-section">
            <h3>Featured Article</h3>
            <div className="featured-preview">
              <img 
                src="https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Featured Article" 
              />
              <div className="featured-actions">
                <button className="featured-btn like-btn">
                  <Heart size={16} />
                  Me gustó
                </button>
                <button className="featured-btn share-btn">
                  <Share2 size={16} />
                  Compartir
                </button>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="sidebar-section">
            <h3>Highlights</h3>
            <div className="highlights-grid">
              {imagenesDestacadas.slice(0, 5).map((item, index) => (
                <div key={index} className="highlight-circle">
                  <img src={item.urlImagen} alt={item.alt} />
                  <span className="highlight-label">{item.categoria}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="sidebar-section">
            <h3>Newsletter Sign-Up</h3>
            <div className="newsletter-content">
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Newsletter" 
              />
              <div className="newsletter-actions">
                <button className="newsletter-btn like-btn">
                  <Heart size={16} />
                  Me gustó
                </button>
                <button className="newsletter-btn share-btn">
                  <Share2 size={16} />
                  Compartir
                </button>
              </div>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="sidebar-section">
            <h3>Popular Tags</h3>
            <div className="tags-container">
              <span className="tag">No hay etiquetas aún.</span>
            </div>
          </div>

          {/* Networks */}
          <div className="sidebar-section">
            <h3>Redes</h3>
            <div className="networks-tags">
              <span className="network-tag">DEPORTES</span>
              <span className="network-tag">REPORTES</span>
              <span className="network-tag">CULTURA</span>
              <span className="network-tag">BIENESTAR</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="main-sections">
            {/* Sports Section */}
            <section className="content-section">
              <h2>DEPORTES</h2>
              <div className="section-content">
                <p>Data comment contains actual impacts for society, beneficial parameters and exemplary that requires...</p>
              </div>
            </section>

            {/* Arts Section */}
            <section className="content-section">
              <h2>ARTE</h2>
              <div className="section-content">
                <p>Data comment contains actual impacts for society, beneficial parameters and exemplary that requires...</p>
              </div>
            </section>

            {/* Culture Section */}
            <section className="content-section">
              <h2>CULTURA</h2>
              <div className="section-content">
                <p>Data comment contains actual impacts for society, beneficial parameters and exemplary that requires...</p>
              </div>
            </section>

            {/* Wellness Section */}
            <section className="content-section">
              <h2>BIENESTAR</h2>
              <div className="section-content">
                <p>Data comment contains actual impacts for society, beneficial parameters and exemplary that requires...</p>
              </div>
            </section>

            {/* Main News */}
            <section className="news-section">
              <h2>Noticias Relevantes</h2>
              <div className="news-grid">
                {noticiasRelevantes.map((noticia) => (
                  <article key={noticia.id} className="news-card">
                    <img 
                      src={noticia.imagen} 
                      alt={noticia.titulo}
                      className="news-image"
                    />
                    <div className="news-content">
                      <span className="news-category">{noticia.categoria}</span>
                      <h3 className="news-title">{noticia.titulo}</h3>
                      <p className="news-summary">{noticia.resumen}</p>
                      <div className="news-meta">
                        <span className="news-author">{noticia.autor}</span>
                        <span className="news-date">{noticia.fecha}</span>
                      </div>
                      <div className="news-actions">
                        <button 
                          onClick={() => handleLike(noticia.id)}
                          className={`action-btn like-btn ${likedArticles.has(noticia.id) ? 'active' : ''}`}
                        >
                          <Heart size={16} />
                          <span>{noticia.likes + (likedArticles.has(noticia.id) ? 1 : 0)}</span>
                        </button>
                        <button className="action-btn comment-btn">
                          <MessageCircle size={16} />
                          <span>{noticia.comentarios}</span>
                        </button>
                        <button 
                          onClick={() => handleShare(noticia)}
                          className="action-btn share-btn"
                        >
                          <Share2 size={16} />
                          <span>{noticia.compartidos}</span>
                        </button>
                        <button 
                          onClick={() => handleSave(noticia.id)}
                          className={`action-btn save-btn ${savedArticles.has(noticia.id) ? 'active' : ''}`}
                        >
                          <Bookmark size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* Sidebar Right */}
        <aside className="sidebar-right">
          <div className="sidebar-section">
            <h3>Latest News</h3>
            <div className="latest-news">
              {imagenesDestacadas.map((item, index) => (
                <div key={index} className="latest-item">
                  <img src={item.urlImagen} alt={item.alt} />
                  <div className="latest-content">
                    <span className="latest-category">{item.categoria}</span>
                    <p className="latest-text">{item.texto}</p>
                    <span className="latest-date">{item.fecha}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="sidebar-section">
            <h3>Premios</h3>
            <div className="awards-list">
              <div className="award-item">La Red de Internet</div>
              <div className="award-item">Diversidad Personalizada</div>
              <div className="award-item">Desarrollos Climáticos NY</div>
            </div>
          </div>

          {/* Weekend Message */}
          <div className="sidebar-section weekend-section">
            <div className="weekend-content">
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Weekend" 
              />
              <div className="weekend-text">
                <h3>VAS A LOGRAR GRANDES COSAS</h3>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-lateral-izquierda">
            <img src={imagenIzquierda} alt="Imagen Izquierda" />
          </div>
          <div className="footer-content">
            <h2 className="footer-title">SN-52</h2>
            <div className="footer-social-and-contact">
              <div className="footer-social">
                {Object.entries(iconosRedes).map(([key, url]) => (
                  <a key={key} href="#" target="_blank" rel="noopener noreferrer">
                    <img src={url} alt={key} />
                  </a>
                ))}
              </div>
              <div className="footer-contact">
                <a href="mailto:SN_52@SENA.com">SN_52@SENA.com</a>
                <span className="footer-sep">·</span>
                <a href="tel:1234567890">123-456-7890</a>
              </div>
            </div>
          </div>
          <div className="footer-lateral-derecha">
            <img src={imagenDerecha} alt="Imagen Derecha" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;