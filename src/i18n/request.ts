import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Use the provided locale or fallback to 'en'
  const activeLocale = locale || 'en';

  try {
    // Import the messages for the active locale
    const messages = (await import(`../messages/${activeLocale}.json`)).default;

    return {
      locale: activeLocale,
      messages
    };
  } catch {
    // Fallback to English messages if the requested locale fails
    try {
      const fallbackMessages = (await import(`../messages/en.json`)).default;
      
      return {
        locale: 'en',
        messages: fallbackMessages
      };
    } catch (fallbackError) {
      throw fallbackError;
    }
  }
});
