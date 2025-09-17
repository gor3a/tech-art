import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  I18nManager
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { t, currentLanguage } = useLanguage();
  const [featuredArticles, setFeaturedArticles] = useState([]);

  useEffect(() => {
    loadFeaturedArticles();
  }, [currentLanguage]);

  const loadFeaturedArticles = async () => {
    try {
      const articlesData = currentLanguage === 'ar' 
        ? require('../data/articles-ar.json')
        : require('../data/articles-en.json');
      
      const featured = articlesData.filter(article => article.featured);
      setFeaturedArticles(featured);
    } catch (error) {
      console.error('Error loading articles:', error);
    }
  };

  const navigateToArticle = (article) => {
    navigation.navigate('ArticleDetail', { article });
  };

  const navigateToAllArticles = () => {
    navigation.navigate('Articles');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    scrollContainer: {
      padding: 20,
    },
    header: {
      marginBottom: 30,
      alignItems: 'flex-start',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: 10,
      textAlign: 'left',
    },
    subtitle: {
      fontSize: 16,
      color: '#7f8c8d',
      lineHeight: 24,
      textAlign: 'left',
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: 20,
      textAlign: 'left',
    },
    featuredCard: {
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
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: 8,
      textAlign: 'left',
    },
    cardSummary: {
      fontSize: 14,
      color: '#7f8c8d',
      lineHeight: 20,
      marginBottom: 12,
      textAlign: 'left',
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardCategory: {
      fontSize: 12,
      color: '#3498db',
      fontWeight: '600',
    },
    cardReadTime: {
      fontSize: 12,
      color: '#95a5a6',
    },
    viewAllButton: {
      backgroundColor: '#3498db',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    viewAllButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('home.welcome')}</Text>
          <Text style={styles.subtitle}>{t('home.description')}</Text>
        </View>

        <Text style={styles.sectionTitle}>{t('home.featuredArticles')}</Text>

        {featuredArticles.map((article) => (
          <TouchableOpacity
            key={article.id}
            style={styles.featuredCard}
            onPress={() => navigateToArticle(article)}
            activeOpacity={0.7}
          >
            <Text style={styles.cardTitle}>{article.title}</Text>
            <Text style={styles.cardSummary}>{article.summary}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardCategory}>{article.category}</Text>
              <Text style={styles.cardReadTime}>{article.readTime}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={navigateToAllArticles}
          activeOpacity={0.8}
        >
          <Text style={styles.viewAllButtonText}>{t('home.viewAllArticles')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;