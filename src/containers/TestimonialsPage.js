import React, { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const TestimonialsPage = ({ language, translations }) => {
  const testimonials = [
    {
      id: 1,
      name: "Paul Fischer",
      rating: 5,
      comment: {
        en: "The possibility to transmit my MRI images online and subsequently receive a clear and understandable assessment from the radiologist has given me a great sense of security.",
        es: "La posibilidad de transmitir mis imágenes de resonancia magnética en línea y luego recibir una evaluación clara y comprensible del radiólogo me ha dado una gran sensación de seguridad.",
        kk: "МРТ суреттерімді онлайн жіберіп, содан кейін радиологтан түсінікті және анық бағалау алу маған үлкен сенімділік берді.",
        ru: "Возможность передавать снимки МРТ онлайн и затем получать четкую и понятную оценку от радиолога дала мне большое чувство безопасности."
      },
      avatar: "👨‍⚕️"
    },
    {
      id: 2,
      name: "Maria Gonzalez",
      rating: 5,
      comment: {
        en: "The video consultation was so convenient and the doctor was extremely knowledgeable. Saved me hours of waiting at a clinic!",
        es: "¡La consulta por video fue muy conveniente y el médico fue extremadamente conocedor. ¡Me ahorró horas de espera en una clínica!",
        kk: "Бейне консультация өте ыңғайлы болды және дәрігер өте білімді болды. Клиникада сағаттар бойы күтуден құтқарды!",
        ru: "Видеоконсультация была очень удобной, а врач чрезвычайно компетентен. Сэкономил мне часы ожидания в клинике!"
      },
      avatar: "👩"
    },
    {
      id: 3,
      name: "James Wilson",
      rating: 4,
      comment: {
        en: "The home doctor visit was prompt and professional. The doctor had all the necessary equipment and provided excellent care.",
        es: "La visita del médico a domicilio fue rápida y profesional. El médico tenía todo el equipo necesario y brindó una excelente atención.",
        kk: "Үйге дәрігердің келуі тез және кәсіби болды. Дәрігерде қажетті жабдықтардың бәрі болды және тамаша күтім көрсетті.",
        ru: "Визит врача на дом был быстрым и профессиональным. У врача было все необходимое оборудование, и он оказал отличную помощь."
      },
      avatar: "🧔"
    },
    {
      id: 4,
      name: "Sarah Johnson",
      rating: 5,
      comment: {
        en: "The medical treatment abroad service helped me get world-class treatment at a fraction of the cost I would have paid locally.",
        es: "El servicio de tratamiento médico en el extranjero me ayudó a obtener un tratamiento de clase mundial a una fracción del costo que habría pagado localmente.",
        kk: "Шетелдегі медициналық емдеу қызметі маған жергілікті төлегеннен әлдеқайда арзан әлемдік деңгейдегі ем алуға көмектесті.",
        ru: "Услуга лечения за границей помогла мне получить лечение мирового уровня за небольшую часть стоимости, которую я бы заплатил на месте."
      },
      avatar: "👩‍🦰"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile || !isAutoScrolling) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile, isAutoScrolling, testimonials.length]);

  const goToNext = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setIsAutoScrolling(false);
    setCurrentIndex(index);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    const touchEnd = e.targetTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      goToNext();
      setTouchStart(null);
    } else if (diff < -50) {
      goToPrev();
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  const t = translations[language] || translations['en'] || {};

  return (
    <div className="patient-reviews">
      <div className="reviews-header">
        <h1>{t.testimonialsTitle || 'Testimonials'}</h1>
        <p className="reviews-subtitle">{t.testimonialsSubtitle || 'What our patients think about us'}</p>
      </div>

      {isMobile ? (
        <div className="reviews-slider" ref={sliderRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
          <div className="slider-track" style={{
            transform: `translateX(-${currentIndex * 100}%)`
          }}>
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="slider-slide">
                <div className="review-card">
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`review-star ${i < testimonial.rating ? 'filled' : ''}`}>★</span>
                    ))}
                  </div>
                  <p className="review-text">"{testimonial.comment[language] || testimonial.comment['en'] || ''}"</p>
                  <div className="review-author">
                    <span className="review-avatar">{testimonial.avatar}</span>
                    <span className="review-name">{testimonial.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          
          <div className="slider-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="reviews-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="review-card">
              <div className="review-rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`review-star ${i < testimonial.rating ? 'filled' : ''}`}>★</span>
                ))}
              </div>
              <p className="review-text">"{testimonial.comment[language] || testimonial.comment['en'] || ''}"</p>
              <div className="review-author">
                <span className="review-avatar">{testimonial.avatar}</span>
                <span className="review-name">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsPage;