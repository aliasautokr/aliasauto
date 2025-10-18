'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';
import Image from 'next/image';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'uz', name: 'O\'zbek', flag: '🇺🇿' },
  { code: 'kz', name: 'Қазақ', flag: '🇰🇿' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();

  // Extract locale from pathname - prioritize this over useLocale()
  const pathLocale = pathname.split('/')[1] || 'en';
  const currentLocale = pathLocale; // Always use pathname-based locale detection
  const currentLanguage = languages.find(lang => lang.code === currentLocale);
  
  const handleLanguageChange = (newLocale: string) => {
    // Get the path without the current locale
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '';
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    router.push(newPath);
    router.refresh(); // Force a refresh to update the locale
    setIsLangOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={scrollToTop}
              className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
            >
              <Image
                src="/logo.png"
                alt="AliasAuto"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
              >
                {t('home')}
              </button>
              <button
                onClick={() => scrollToSection('about')}
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
              >
                {t('about')}
              </button>
              <button
                onClick={() => scrollToSection('services')}
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
              >
                {t('services')}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
              >
                {t('contact')}
              </button>
            </div>
          </div>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-2"
              >
                <Globe className="h-4 w-4" />
                <span>{currentLanguage?.flag}</span>
              </Button>
              
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-lg rounded-lg shadow-2xl shadow-black/50 border border-white/10 z-50 transition-all duration-300 ease-in-out animate-in fade-in-0 slide-in-from-top-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 flex items-center space-x-3 text-white transition-all duration-200 ease-in-out first:rounded-t-lg last:rounded-b-lg ${
                        lang.code === currentLocale ? 'bg-white/10' : ''
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90 backdrop-blur-xl border-t border-white/10">
              <button
                onClick={() => scrollToSection('home')}
                    className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium w-full text-left transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
              >
                {t('home')}
              </button>
              <button
                onClick={() => scrollToSection('about')}
                    className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium w-full text-left transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
              >
                {t('about')}
              </button>
              <button
                onClick={() => scrollToSection('services')}
                    className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium w-full text-left transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
              >
                {t('services')}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                    className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium w-full text-left transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
              >
                {t('contact')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
