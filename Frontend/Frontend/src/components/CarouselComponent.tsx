import React from 'react';
import { Carousel } from 'antd';

interface ArteDestacado {
  id: number;
  title: string;
  image: string;
  category: string;
}

interface CarouselComponentProps {
  items: ArteDestacado[];
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ items }) => {
  return (
    <header className="artes-header">
      <Carousel autoplay>
        {items.map((item) => (
          <div key={item.id} className="artes-carousel-slide">
            <img
              src={item.image}
              alt={item.title}
              className="artes-carousel-img"
            />
            <div className="artes-carousel-text">
              <span>{item.category}</span>
              <h2>{item.title}</h2>
            </div>
          </div>
        ))}
      </Carousel>
    </header>
  );
};

export default CarouselComponent;
