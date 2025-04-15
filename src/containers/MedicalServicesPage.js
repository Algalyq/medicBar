import React, { useState, useEffect, useRef } from 'react';
import { ServiceCard, ServicePrice, ServiceImage } from '../components/ServiceCard';
import { Button } from '../components/Button';
import styled from 'styled-components';
import defaultTranslations from '../utils/defaultTranslations';

const MedicalServicesPage = ({ onServiceSelect, services, language, translations }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const t = translations[language] || translations['kk'] || {};

  const servicesData = [
    {
      id: 'food_poisoning',
      image: 'https://diapazon.kz/images/2022/09/03/CvnpIEnFbI_a4_710x444.jpeg',
      translations: {
        en: {
          title: 'Food Poisoning',
          description: 'Treatment of food-related illnesses',
          price: '80$'
        },
        kk: {
          title: 'Тамақ Улауы',
          description: 'Тамақпен байланысты аурулардың емдеуі.',
          price: '80$'
        },
        ru: {
          title: 'Отравление Пищевое',
          description: 'Лечение заболеваний, связанных с пищей.',
          price: '80$'
        }
      }
    },
    {
      id: 'alcohol_poisoning',
      image: 'https://onbso.ru/wp-content/uploads/2024/02/%D0%9E%D1%82%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-1300x650.jpg',
      translations: {
        en: {
          title: 'Alcohol Poisoning',
          description: 'Treatment of alcohol-related poisoning',
          price: '90$'
        },
        kk: {
          title: 'Алкогольдік Улау',
          description: 'Алкогольмен байланысты улауды емдеу.',
          price: '90$'
        },
        ru: {
          title: 'Отравление Алкогольное',
          description: 'Лечение алкогольного отравления.',
          price: '90$'
        }
      }
    },
    // {
    //   id: 'intestinal_poisoning',
    //   image: 'https://example.com/intestinal-poisoning.jpg',
    //   translations: {
    //     en: {
    //       title: 'Intestinal Poisoning',
    //       description: 'Treatment of intestinal problems',
    //       price: '75$'
    //     },
    //     kk: {
    //       title: 'Ішек Улауы',
    //       description: 'Ішек проблемаларын емдеу.',
    //       price: '75$'
    //     },
    //     ru: {
    //       title: 'Кишечные Отравления',
    //       description: 'Лечение кишечных проблем.',
    //       price: '75$'
    //     }
    //   }
    // },
    {
      id: 'iv_injections',
      image: 'https://vrachnadom-spb.ru/images/podgotovka_k_ukolu.webp',
      translations: {
        en: {
          title: 'IV Injections',
          description: 'Professional IV injection services',
          price: '100$'
        },
        kk: {
          title: 'Капельница, Инъекциялар, Барлық Түрлері',
          description: 'Кәсіби капельница және инъекция қызметтері.',
          price: '100$'
        },
        ru: {
          title: 'Капельница, Уколы, Все Виды',
          description: 'Профессиональные услуги капельницы и инъекций.',
          price: '100$'
        }
      }
    },
    {
      id: 'dressings_enemas',
      image: 'https://dobdocchel.ru/wp-content/uploads/2022/02/2-768x648.jpg',
      translations: {
        en: {
          title: 'Dressings and Enemas',
          description: 'Specialized care for dressings and cleansing',
          price: '85$'
        },
        kk: {
          title: 'Бинттеу, Клизма, Асқазан Жуу',
          description: 'Бинттеу және тазалауға арналған мамандандырылған күтім.',
          price: '85$'
        },
        ru: {
          title: 'Перевязки, Клизмы, Промывание Живота',
          description: 'Специализированный уход для перевязок и очищения.',
          price: '85$'
        }
      }
    },
  ];

  const handleOnlineConsultationClick = () => {
    onServiceSelect('online'); // Trigger form display in parent
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    const touchEnd = e.targetTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      setCurrentIndex((prev) => (prev === servicesData.length - 1 ? 0 : prev + 1));
      setTouchStart(null);
    } else if (diff < -50) {
      setCurrentIndex((prev) => (prev === 0 ? servicesData.length - 1 : prev - 1));
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const HeroSection = styled.div`
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                url('https://images.unsplash.com/photo-1576091160550-2173dba999ef') center/cover;
    color: white;
    padding: 80px 20px;
    text-align: center;
    margin-bottom: 40px;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 20px;
      text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
    }

    @media (max-width: 768px) {
      padding: 60px 15px;
      h1 { font-size: 2rem; }
    }
  `;

  const ServicesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 16px;
      padding: 10px;
    }
  `;

  return (
    <div className="medical-services-page">
      <HeroSection>
        <h1>{t.services?.title || defaultTranslations.services.title[language] || defaultTranslations.services.title.en}</h1>
        <Button onClick={handleOnlineConsultationClick}>
          {t.services?.bookConsultation || defaultTranslations.services.bookConsultation[language] || defaultTranslations.services.bookConsultation.en}
        </Button>
      </HeroSection>

      <ServicesGrid>
        {servicesData.map(service => (
          <ServiceCard key={service.id}>
            <ServicePrice>{service.translations[language]?.price || service.translations.en.price}</ServicePrice>
            <ServiceImage style={{ backgroundImage: `url(${service.image})` }} />
            <h3>{service.translations[language]?.title || service.translations.en.title}</h3>
            <p>{service.translations[language]?.description || service.translations.en.description}</p>
            <Button onClick={() => onServiceSelect(service.id)}>
              {t.services?.bookNow || defaultTranslations.services.bookNow[language] || defaultTranslations.services.bookNow.en}
            </Button>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </div>
  );
};

export default MedicalServicesPage;