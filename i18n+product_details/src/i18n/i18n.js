import i18n from "i18next";
import { initReactI18next } from "react-i18next";


const savedLanguage=localStorage.getItem("lang")


const resources = {
  en: {
    translation: {
    //  Deyer teyin edirsiz, hansiki siz onu komponentlerde cagiracaqsiniz
      home:"Home",
      salam:"Hello"
    }
  },

  az: {
    translation: {
    // Cagirilan deyer eyni qalir, sadece tercume hissesi
      home:"Ev",
       salam:"Salam"
    }
  }
};


// lng hissesi-default olaraq sehifem hansi dilde acilsin 
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, 
   
    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;