import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';

// Using custom fonts: RobotoFlex for body text, Benzin-Bold for headers
const fontConfig = {
  className: 'font-roboto',
  style: { fontFamily: 'RobotoFlex, sans-serif' }
};

export default async function InspectionLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Use English as default locale for inspection pages (no translations needed)
  const messages = await getMessages({ locale: 'en' });

  return (
    <html lang="en" className="dark">
      <body className={fontConfig.className} style={fontConfig.style}>
        <NextIntlClientProvider messages={messages} locale="en">
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

