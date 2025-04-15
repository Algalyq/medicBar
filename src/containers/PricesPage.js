import React from 'react';
import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Import icons from react-icons

const PricesPage = ({ language, translations }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

    // Auto-scroll on mobile
    let interval;
    if (isMobile) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === servicePrices.length - 1 ? 0 : prev + 1));
      }, 5000); // Auto-scroll every 5 seconds
    }

    return () => clearInterval(interval); // Cleanup interval on unmount or resize
  }, [isMobile]);

  // Default to English if language or translations are not provided
  const t = translations[language] || translations['en'] || {};

  // Define prices for each service
  const servicePrices = [
    {
      id: 'online',
      title: { en: 'Online Consultation', kk: 'Онлайн Консультация', ru: 'Онлайн Консультация', es: 'Consulta en Línea' },
      price: { en: '$50', kk: '50$', ru: '50$', es: '$50' },
      description: { en: 'Virtual doctor consultation via video call.', kk: 'Бейне қоңырау арқылы дәрігермен виртуалды консультация.', ru: 'Виртуальная консультация врача по видеосвязи.', es: 'Consulta virtual del médico por videollamada.' },
    },
    {
      id: 'food_poisoning',
      title: { en: 'Food Poisoning', kk: 'Тамақ Улауы', ru: 'Отравление Пищевое', es: 'Intoxicación Alimentaria' },
      price: { en: '$80', kk: '80$', ru: '80$', es: '$80' },
      description: { en: 'Treatment for food-related illnesses.', kk: 'Тамақпен байланысты аурулардың емдеуі.', ru: 'Лечение заболеваний, связанных с пищей.', es: 'Tratamiento para enfermedades relacionadas con alimentos.' },
    },
    {
      id: 'alcohol_poisoning',
      title: { en: 'Alcohol Poisoning', kk: 'Алкогольдік Улау', ru: 'Отравление Алкогольное', es: 'Intoxicación por Alcohol' },
      price: { en: '$90', kk: '90$', ru: '90$', es: '$90' },
      description: { en: 'Treatment for alcohol-related poisoning.', kk: 'Алкогольмен байланысты улауды емдеу.', ru: 'Лечение алкогольного отравления.', es: 'Tratamiento para intoxicación por alcohol.' },
    },
    {
      id: 'intestinal_poisoning',
      title: { en: 'Intestinal Poisoning', kk: 'Ішек Улауы', ru: 'Кишечные Отравления', es: 'Intoxicación Intestinal' },
      price: { en: '$75', kk: '75$', ru: '75$', es: '$75' },
      description: { en: 'Treatment for intestinal issues.', kk: 'Ішек проблемаларын емдеу.', ru: 'Лечение кишечных проблем.', es: 'Tratamiento para problemas intestinales.' },
    },
    {
      id: 'iv_injections',
      title: { en: 'IV Drip, Injections, All Types', kk: 'Капельница, Инъекциялар, Барлық Түрлері', ru: 'Капельница, Уколы, Все Виды', es: 'Suero IV, Inyecciones, Todos los Tipos' },
      price: { en: '$100', kk: '100$', ru: '100$', es: '$100' },
      description: { en: 'Professional IV and injection services.', kk: 'Кәсіби капельница және инъекция қызметтері.', ru: 'Профессиональные услуги капельницы и инъекций.', es: 'Servicios profesionales de suero IV y inyecciones.' },
    },
    {
      id: 'dressings_enemas',
      title: { en: 'Dressings, Enemas, Stomach Lavage', kk: 'Бинттеу, Клизма, Асқазан Жуу', ru: 'Перевязки, Клизмы, Промывание Живота', es: 'Vendajes, Enemas, Lavado Gástrico' },
      price: { en: '$85', kk: '85$', ru: '85$', es: '$85' },
      description: { en: 'Specialized care for dressings and cleansing.', kk: 'Бинттеу және тазалауға арналған мамандандырылған күтім.', ru: 'Специализированный уход для перевязок и очищения.', es: 'Cuidado especializado para vendajes y limpieza.' },
    },
  ];

  return (
    <div className="prices-page">
      <div className="prices-header">
        <h1>{t.pricesTitle || 'Our Service Prices'}</h1>
        <p className="subtitle">{t.pricesSubtitle || 'Transparent pricing for all our medical services'}</p>
      </div>

      {isMobile ? (
        <div className="carousel">
          <button className="carousel-button prev" onClick={() => setCurrentIndex((prev) => (prev === 0 ? servicePrices.length - 1 : prev - 1))}>
            <FiChevronLeft />
          </button>
          <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {servicePrices.map((service) => (
              <div key={service.id} className="carousel-slide">
                <div className="price-card">
                  <h3>{service.title[language] || service.title['en']}</h3>
                  <p className="price">{service.price[language] || service.price['en']}</p>
                  <p className="description">{service.description[language] || service.description['en']}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-button next" onClick={() => setCurrentIndex((prev) => (prev === servicePrices.length - 1 ? 0 : prev + 1))}>
            <FiChevronRight />
          </button>
          <div className="carousel-dots">
            {servicePrices.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="prices-grid">
          {servicePrices.map((service) => (
            <div key={service.id} className="price-card">
              <h3>{service.title[language] || service.title['en']}</h3>
              <p className="price">{service.price[language] || service.price['en']}</p>
              <p className="description">{service.description[language] || service.description['en']}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PricesPage;