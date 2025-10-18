'use client';

import { useTranslations } from 'next-intl';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');

  const socialLinks = [
    { icon: Youtube, href: 'https://www.youtube.com/@ALIASAUTO', label: 'Youtube' },
    { icon: Instagram, href: 'https://www.instagram.com/aliasauto.uz/', label: 'Instagram' },
    
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-black text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
                <h3 className="text-2xl font-bold mb-4">Alias Auto Korea</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              {t('description')}
            </p>
            <a 
              href="https://www.aliasauto.kr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-400 transition-colors font-medium"
            >
              {t('website')}
            </a>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-white/10 p-2 rounded-lg hover:bg-white/5"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-300">
              <p>Songdo, Incheon, Korea</p>
              <p>Almaty, Kazakhstan</p>
              <p>aliasautokr@gmail.com</p>
              <p>+82 10 5922 1404</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
