import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

const SettingsScreen = () => {
  const { t, currentLanguage, switchLanguage, switchLanguageWithRestart, availableLanguages, isRTL, getTextAlign, getFlexDirection } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const handleLanguageChange = (languageCode) => {
    if (languageCode !== currentLanguage) {
      Alert.alert(
        t('settings.selectLanguage'),
        t('settings.languageChangeMessage'),
        [
          {
            text: t('common.cancel'),
            style: 'cancel',
          },
          {
            text: t('common.ok'),
            onPress: async () => {
              setShowLanguageModal(false);
              await switchLanguageWithRestart(languageCode);
            },
          },
        ]
      );
    } else {
      setShowLanguageModal(false);
    }
  };

  const getCurrentLanguageName = () => {
    const language = availableLanguages.find(lang => lang.code === currentLanguage);
    return language ? language.nativeName : 'English';
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    header: {
      padding: 20,
      paddingBottom: 10,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#2c3e50',
      textAlign: getTextAlign('left'),
    },
    content: {
      flex: 1,
      padding: 20,
    },
    settingItem: {
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 20,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    settingHeader: {
      flexDirection: getFlexDirection('row'),
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    settingLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#2c3e50',
      textAlign: getTextAlign('left'),
    },
    settingValue: {
      fontSize: 14,
      color: '#3498db',
      fontWeight: '500',
    },
    settingDescription: {
      fontSize: 14,
      color: '#7f8c8d',
      marginTop: 8,
      textAlign: getTextAlign('left'),
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: 16,
      padding: 20,
      width: '80%',
      maxWidth: 300,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: 20,
      textAlign: getTextAlign('left'),
    },
    languageOption: {
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 8,
      marginBottom: 8,
    },
    selectedLanguageOption: {
      backgroundColor: '#e3f2fd',
    },
    languageOptionText: {
      fontSize: 16,
      color: '#2c3e50',
      textAlign: getTextAlign('left'),
    },
    selectedLanguageOptionText: {
      color: '#3498db',
      fontWeight: '600',
    },
    modalButtons: {
      flexDirection: getFlexDirection('row'),
      justifyContent: isRTL() ? 'flex-start' : 'flex-end',
      marginTop: 20,
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: '#ecf0f1',
    },
    modalButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginLeft: 10,
    },
    modalButtonText: {
      fontSize: 16,
      color: '#3498db',
      fontWeight: '600',
    },
    appInfo: {
      marginTop: 30,
      padding: 20,
      backgroundColor: '#ffffff',
      borderRadius: 12,
      alignItems: 'center',
    },
    appName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: 5,
    },
    appVersion: {
      fontSize: 14,
      color: '#7f8c8d',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('settings.title')}</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setShowLanguageModal(true)}
          activeOpacity={0.7}
        >
          <View style={styles.settingHeader}>
            <Text style={styles.settingLabel}>{t('settings.language')}</Text>
            <Text style={styles.settingValue}>{getCurrentLanguageName()}</Text>
          </View>
          <Text style={styles.settingDescription}>
            Choose your preferred language for the app interface
          </Text>
        </TouchableOpacity>

        <View style={styles.appInfo}>
          <Text style={styles.appName}>{t('app.title')}</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
        </View>
      </View>

      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('settings.selectLanguage')}</Text>
            
            {availableLanguages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageOption,
                  currentLanguage === language.code && styles.selectedLanguageOption,
                ]}
                onPress={() => handleLanguageChange(language.code)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.languageOptionText,
                    currentLanguage === language.code && styles.selectedLanguageOptionText,
                  ]}
                >
                  {language.nativeName}
                </Text>
              </TouchableOpacity>
            ))}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowLanguageModal(false)}
              >
                <Text style={styles.modalButtonText}>{t('common.cancel')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingsScreen;