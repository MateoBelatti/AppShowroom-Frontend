import { MapPin, Mail } from 'lucide-react';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import "./contactoPage.css";

const ContactPage: React.FC = () => {
    return (
        <section className="contact-section py-5">
            <div className="container px-4">
                
                <div className="text-center mb-5 pt-4">
                    <h2 className="contact-title mb-3">Ponte en contacto</h2>
                    <p className="contact-subtitle mx-auto">
                        Estamos aquí para resolver tus dudas y ayudarte a encontrar la pieza perfecta para tu hogar.
                    </p>
                </div>

                <div className="contact-card-container">
                    <div className="contact-card shadow-sm">
                        
                        <div className="contact-item">
                            <div className="icon-wrapper">
                                <Mail size={24} strokeWidth={1.5} />
                            </div>
                            <div className="contact-info">
                                <h5 className="contact-info-title">Email</h5>
                                <a href="mailto:hola@canelaartesanias.com" className="contact-info-link">
                                    hola@canelaartesanias.com
                                </a>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="icon-wrapper">
                                <FaWhatsapp size={24} strokeWidth={1.5} />
                            </div>
                            <div className="contact-info">
                                <h5 className="contact-info-title">WhatsApp</h5>
                                <a href="https://wa.me/542911234567" target="_blank" rel="noopener noreferrer" className="contact-info-link">
                                    +54 291 123 4567
                                </a>
                            </div>
                        </div>

                        <div className="contact-item item-highlighted">
                            <div className="icon-wrapper">
                                <MapPin size={24} strokeWidth={1.5} />
                            </div>
                            <div className="contact-info">
                                <h5 className="contact-info-title">Ubicación</h5>
                                <span className="contact-info-text">
                                    Bahía Blanca, Buenos Aires
                                </span>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="icon-wrapper">
                                <FaInstagram size={24} strokeWidth={1.5} />
                            </div>
                            <div className="contact-info">
                                <h5 className="contact-info-title">Instagram</h5>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="contact-info-link">
                                    @canela.artesanias
                                </a>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="icon-wrapper">
                                <FaFacebook size={24} strokeWidth={1.5} />
                            </div>
                            <div className="contact-info">
                                <h5 className="contact-info-title">Facebook</h5>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="contact-info-link">
                                    Canela Artesanías
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default ContactPage;