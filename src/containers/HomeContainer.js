import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { setLanguage, submitOrder, setSelectedService } from '../redux/actions/orderActions';
import LanguageSelector from '../components/LanguageSelector';
import OrderButton from '../components/OrderButton';
import { ConfirmationMessage } from '../components/ConfirmationMessage';
import translations from '../utils/translations';
import telegramService from '../services/telegramService';
import Content from '../containers/Content';
import MedicalServicesPage from './MedicalServicesPage';
import TestimonialsPage from './TestimonialsPage';
import PricesPage from './PricesPage';

const languages = [
  { code: 'kk', name: 'Қазақша' },
  { code: 'ru', name: 'Русский' },
];

const services = [
  {
    id: 'food_poisoning',
    image: 'https://diapazon.kz/images/2022/09/03/CvnpIEnFbI_a4_710x444.jpeg',
    translations: {
      en: { title: 'Food Poisoning', description: 'Treatment of food-related illnesses', price: '80$' },
      kk: { title: 'Тамақ Улауы', description: 'Тамақпен байланысты аурулардың емдеуі.', price: '80$' },
      ru: { title: 'Отравление Пищевое', description: 'Лечение заболеваний, связанных с пищей.', price: '80$' },
    },
  },
  {
    id: 'alcohol_poisoning',
    image: 'https://onbso.ru/wp-content/uploads/2024/02/%D0%9E%D1%82%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-1300x650.jpg',
    translations: {
      en: { title: 'Alcohol Poisoning', description: 'Treatment of alcohol-related poisoning', price: '90$' },
      kk: { title: 'Алкогольдік Улау', description: 'Алкогольмен байланысты улауды емдеу.', price: '90$' },
      ru: { title: 'Отравление Алкогольное', description: 'Лечение алкогольного отравления.', price: '90$' },
    },
  },
  {
    id: 'iv_injections',
    image: 'https://vrachnadom-spb.ru/images/podgotovka_k_ukolu.webp',
    translations: {
      en: { title: 'IV Injections', description: 'Professional IV injection services', price: '100$' },
      kk: { title: 'Капельница, Инъекциялар, Барлық Түрлері', description: 'Кәсіби капельница және инъекция қызметтері.', price: '100$' },
      ru: { title: 'Капельница, Уколы, Все Виды', description: 'Профессиональные услуги капельницы и инъекций.', price: '100$' },
    },
  },
  {
    id: 'dressings_enemas',
    image: 'https://dobdocchel.ru/wp-content/uploads/2022/02/2-768x648.jpg',
    translations: {
      en: { title: 'Dressings and Enemas', description: 'Specialized care for dressings and cleansing', price: '85$' },
      kk: { title: 'Бинттеу, Клизма, Асқазан Жуу', description: 'Бинттеу және тазалауға арналған мамандандырылған күтім.', price: '85$' },
      ru: { title: 'Перевязки, Клизмы, Промывание Живота', description: 'Специализированный уход для перевязок и очищения.', price: '85$' },
    },
  },
];

const HomeContainer = ({ language, setLanguage, submitOrder, selectedService, setSelectedService }) => {
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const [phone, setPhone] = useState('+7');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const formRef = useRef(null);
  const phoneInputRef = useRef(null);

  useEffect(() => {
    if (!language) setShowLanguageSelector(true);
  }, [language]);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setShowLanguageSelector(false);
  };

  const handleServiceSelect = (serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    if (service) {
      const translation = service.translations[language] || service.translations['kk'];
      setSelectedService(translation.title);
    } else {
      setSelectedService('Звандап біліп ал');
    }
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleOrderClick = () => {
    setSelectedService('Звандап біліп ал');
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const formatPhoneNumber = (digits) => {
    // Remove non-digits and ensure it starts with '7'
    const cleanDigits = digits.replace(/\D/g, '');
    let formatted = '+7';

    if (cleanDigits.length > 1) {
      formatted += ' (' + cleanDigits.slice(1, Math.min(4, cleanDigits.length));
    }
    if (cleanDigits.length > 4) {
      formatted += ') ' + cleanDigits.slice(4, Math.min(7, cleanDigits.length));
    }
    if (cleanDigits.length > 7) {
      formatted += ' ' + cleanDigits.slice(7, Math.min(9, cleanDigits.length));
    }
    if (cleanDigits.length > 9) {
      formatted += ' ' + cleanDigits.slice(9, Math.min(11, cleanDigits.length));
    }

    return formatted;
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    const selectionStart = e.target.selectionStart;
    let digits = input.replace(/\D/g, '');

    // Always enforce starting with '7'
    if (digits.length === 0 || !digits.startsWith('7')) {
      digits = '7' + digits;
    }

    // Limit to 11 digits (including leading 7)
    if (digits.length > 11) {
      digits = digits.slice(0, 11);
    }

    const formatted = formatPhoneNumber(digits);
    setPhone(formatted);
    setPhoneError('');

    // Adjust cursor position
    setTimeout(() => {
      const newPosition = Math.min(selectionStart + (formatted.length - input.length), formatted.length);
      phoneInputRef.current.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    if (!name) {
      alert(translations[language]?.nameError || 'Please enter your name');
      return;
    }
    if (!phone) {
      alert(translations[language]?.phoneError || 'Please enter a valid phone number');
      return;
    }

    try {
      submitOrder({ name, phone, language, service: selectedService });
      console.log(phone, name)
      setMessage(t.confirmation.replace('[phone]', phone).replace('[name]', name))

      await telegramService.sendOrder({ name, phone, language, service: selectedService });
      
      setShowForm(false);
      setShowConfirmation(true);
      setSelectedService(null);
      setName('');
      setPhone('+7');
    } catch (error) {
      alert(t.orderError || 'Failed to submit order. Please try again.');
      console.error('Order submission failed:', error);
    }
  };

  const t = translations[language] || translations['kk'];

  if (showLanguageSelector) {
    return <LanguageSelector languages={languages} onSelect={handleLanguageSelect} />;
  }

  return (
    <>
      <MedicalServicesPage
        onServiceSelect={handleServiceSelect}
        services={services}
        language={language}
        translations={translations}
      />
      <TestimonialsPage
        language={language}
        translations={translations}
      />
      {!showForm && !showConfirmation && (
        <OrderButton onClick={handleOrderClick} label={t.orderNow} />
      )}

      {showForm && (
        <div className="order-form" ref={formRef}>
          <h2>{t.orderFormTitle || 'Place Your Order'}</h2>
          <div className="form-group">
            <label htmlFor="name">{t.nameLabel || 'Name'}</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder={t.namePlaceholder || 'Enter your name'}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">{t.phoneLabel || 'Phone Number'}</label>
            <input
              type="tel"
              id="phone"
              ref={phoneInputRef}
              value={phone}
              onInput={handlePhoneChange}
              placeholder="+7 (XXX) XXX XX XX"
              className={`form-input ${phoneError ? 'error' : ''}`}
              pattern="[0-9]*"
              inputMode="numeric"
            />
            {phoneError && <span className="error-message">{phoneError}</span>}
          </div>
          <OrderButton onClick={handleSubmit} label={t.sendRequest} />
        </div>
      )}

      {showConfirmation && (
        <ConfirmationMessage
          message={message}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  console.log('Current Redux State:', state);
  return {
    language: state.language,
    selectedService: state.selectedService,
  };
};

const mapDispatchToProps = {
  setLanguage,
  submitOrder,
  setSelectedService,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);