import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { setLanguage, submitOrder, setSelectedService } from '../redux/actions/orderActions';
import LanguageSelector from '../components/LanguageSelector';
import OrderButton from '../components/OrderButton';
import PhoneInput from '../components/PhoneInput';
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
    id: 'home',
    name: 'Medic to Home',
    description: {
      kk: 'Біз дәрігерді сіздің орналасқан жеріңізге жібереміз.',
      ru: 'Мы отправим врача к вам домой.',
    },
  },
  {
    id: 'online',
    name: 'Online Medic',
    description: {
      kk: 'Дәрігермен бейне қоңырау арқылы кеңес алыңыз.',
      ru: 'Проконсультируйтесь с врачом по видеосвязи.',
    },
  },
];

const HomeContainer = ({ language, setLanguage, submitOrder, selectedService, setSelectedService }) => {
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const formRef = useRef(null); // Ref to scroll to form

  useEffect(() => {
    if (!language) setShowLanguageSelector(true);
  }, [language]);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setShowLanguageSelector(false);
  };

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setShowForm(true);
    // Scroll to form smoothly
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleOrderClick = () => {
    // if (!selectedService) {
    //   alert(translations[language]?.selectServiceError || translations['en'].selectServiceError);
    //   return;
    // }
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    let formatted = '';

    if (digits.startsWith('7')) {
      formatted = '+7';
      if (digits.length > 1) {
        formatted += ' (' + digits.slice(1, Math.min(4, digits.length));
      }
      if (digits.length > 4) {
        formatted += ') ' + digits.slice(4, Math.min(7, digits.length));
      }
      if (digits.length > 7) {
        formatted += ' ' + digits.slice(7, Math.min(9, digits.length));
      }
      if (digits.length > 9) {
        formatted += ' ' + digits.slice(9, Math.min(11, digits.length));
      }
    } else if (digits.length > 0) {
      formatted = '+' + digits;
    }

    return formatted;
  };

  const validatePhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    if (!digits.startsWith('7') || digits.length !== 11) {
      return translations[language]?.phoneError || 'Please enter a valid phone number in the format +7 (***) *** ** **';
    }
    return '';
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    const formatted = formatPhoneNumber(input);
    setPhone(formatted);
    setPhoneError(validatePhoneNumber(formatted));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    const phoneValidationError = validatePhoneNumber(phone);
    if (!name) {
      alert(translations[language]?.nameError || 'Please enter your name');
      return;
    }
    if (phoneValidationError || !phone) {
      alert(phoneValidationError || translations[language]?.phoneError || 'Please enter a valid phone number');
      return;
    }
    // if (!selectedService) {
    //   alert(translations[language]?.selectServiceError || translations['en'].selectServiceError);
    //   return;
    // }

    submitOrder({ name, phone, language, service: selectedService });
    telegramService.sendOrder({ name, phone, language, service: selectedService });
    setShowForm(false);
    setSelectedService(null);
    setName(name);
    setPhone(phone);
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
              value={phone}
              onChange={handlePhoneChange}
              placeholder={t.phonePlaceholder || '+7 (***) *** ** **'}
              className={`form-input ${phoneError ? 'error' : ''}`}
            />
            {phoneError && <span className="error-message">{phoneError}</span>}
          </div>
          <OrderButton onClick={handleSubmit} label={t.sendRequest} />
        </div>
      )}

      {showConfirmation && (
        <ConfirmationMessage 
          message={t.confirmation.replace('[phone]', phone).replace('[name]', name)}
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