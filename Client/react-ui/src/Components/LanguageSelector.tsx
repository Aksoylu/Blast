import { Button, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
   // window.electronStore.setLanguage(lng);
  };

  return (
    <HStack spacing={4}>
      <Button onClick={() => changeLanguage('en')}>English</Button>
      <Button onClick={() => changeLanguage('tr')}>Türkçe</Button>
    </HStack>
  );
};
