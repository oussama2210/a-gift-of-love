import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language | null>(null);

  if (language === null) {
    return null; // Will be handled by language selector
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isRTL: language === "ar",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const translations = {
  ar: {
    happyBirthday: "عيد ميلاد سعيد",
    toTheMost: "يا أجمل إنسانة في حياتي",
    name: "آيات",
    message1: "في يومك الخاص، أريدك أن تعرفي أنك أجمل هدية منحتني إياها الحياة.",
    message2: "كل يوم معك هو احتفال، وكل لحظة بجانبك هي نعمة.",
    loveForever: "أحبك إلى الأبد",
    wish1: "حب لا ينتهي",
    wish2: "سعادة دائمة",
    wish3: "أحلام تتحقق",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "English",
    welcome: "مرحباً بك",
  },
  en: {
    happyBirthday: "Happy Birthday",
    toTheMost: "To the most beautiful person in my life",
    name: "Ayat",
    message1: "On your special day, I want you to know that you are the most beautiful gift life has given me.",
    message2: "Every day with you is a celebration, and every moment by your side is a blessing.",
    loveForever: "I Love You Forever",
    wish1: "Endless Love",
    wish2: "Eternal Happiness",
    wish3: "Dreams Come True",
    selectLanguage: "Select Language",
    arabic: "العربية",
    english: "English",
    welcome: "Welcome",
  },
};
