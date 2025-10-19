import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';

// Using custom fonts: RobotoFlex for body text, Benzin-Bold for headers
const fontConfig = {
  className: 'font-roboto',
  style: { fontFamily: 'RobotoFlex, sans-serif' }
};

const locales = ['en', 'ru', 'uz', 'kz', 'ko'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locale || !locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="dark">
      <body className={fontConfig.className} style={fontConfig.style}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
