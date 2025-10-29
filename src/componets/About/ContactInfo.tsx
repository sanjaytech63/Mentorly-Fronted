import React from 'react';

const ContactInfo: React.FC = () => {

    return (
        <div className="aspect-w-16 aspect-h-9 h-64 md:h-110">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.223234056201!2d77.3623885753338!3d28.502508875737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce8aa0c5e7c0f%3A0x1c1f74efc74f1b2e!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh%20201309!5e0!3m2!1sen!2sin!4v1698765432100!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mentorly Location"
                className=""
            ></iframe>
        </div>
    );
};

export default ContactInfo;