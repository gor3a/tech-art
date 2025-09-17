import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { I18nManager } from 'react-native';

const ArticlesScreen = () => {
  const router = useRouter();
  const { t, currentLanguage } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    loadArticles();
  }, [currentLanguage]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const articlesData = currentLanguage === 'ar' 
        ? require('../data/articles-ar.json')
        : require('../data/articles-en.json');
      
      setArticles(articlesData);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToArticle = (article) => {
    router.push({
      pathname: '/article-detail',
      params: { article: JSON.stringify(article) }
    });
  };

  const renderArticleItem = ({ item }) => (
    <TouchableOpacity
      style={styles.articleCard}
      onPress={() => navigateToArticle(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSummary}>{item.summary}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.cardMeta}>
            <Text style={styles.cardCategory}>{item.category}</Text>
            <Text style={styles.cardAuthor}>{item.author}</Text>
          </View>
          <Text style={styles.cardReadTime}>{item.readTime}</Text>
        </View>
      </View>
      {item.featured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>★</Text>
        </View>
      )}
    </TouchableOpacity>
  );

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
      textAlign: 'left',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: '#7f8c8d',
    },
    articleCard: {
      backgroundColor: '#ffffff',
      marginHorizontal: 20,
      marginBottom: 15,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
      overflow: 'hidden',
    },
    cardContent: {
      padding: 20,
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
      marginBottom: 15,
      textAlign: 'left',
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    cardMeta: {
      flex: 1,
    },
    cardCategory: {
      fontSize: 12,
      color: '#3498db',
      fontWeight: '600',
      marginBottom: 4,
      textAlign: 'left',
    },
    cardAuthor: {
      fontSize: 12,
      color: '#95a5a6',
      textAlign: 'left',
    },
    cardReadTime: {
      fontSize: 12,
      color: '#95a5a6',
      fontWeight: '500',
    },
    featuredBadge: {
      position: 'absolute',
      top: 15,
      right: 15,
      backgroundColor: '#f39c12',
      borderRadius: 12,
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    featuredText: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    emptyText: {
      fontSize: 16,
      color: '#7f8c8d',
      textAlign: 'center',
    },
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('articles.title')}</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>{t('articles.loading')}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('articles.title')}</Text>
      </View>
      
      {articles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{t('articles.noArticles')}</Text>
        </View>
      ) : (
        <FlatList
          data={articles}
          renderItem={renderArticleItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default ArticlesScreen;