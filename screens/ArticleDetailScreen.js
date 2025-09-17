import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';

const ArticleDetailScreen = ({ route }) => {
  const router = useRouter();
  const { article } = route.params;
  const { t } = useLanguage();

  const goBack = () => {
    router.back();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      paddingTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ecf0f1',
    },
    backButton: {
      padding: 8,
      marginRight: 10,
    },
    backButtonText: {
      fontSize: 16,
      color: '#3498db',
      fontWeight: '600',
    },
    headerTitle: {
      flex: 1,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2c3e50',
      textAlign: 'left',
    },
    content: {
      flex: 1,
    },
    scrollContainer: {
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: 15,
      lineHeight: 36,
      textAlign: 'left',
    },
    meta: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 20,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ecf0f1',
    },
    metaItem: {
      marginRight: 15,
      marginBottom: 8,
    },
    metaLabel: {
      fontSize: 12,
      color: '#95a5a6',
      fontWeight: '600',
      textTransform: 'uppercase',
      marginBottom: 2,
    },
    metaValue: {
      fontSize: 14,
      color: '#2c3e50',
      fontWeight: '500',
    },
    category: {
      backgroundColor: '#3498db',
      color: '#ffffff',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      fontSize: 12,
      fontWeight: '600',
      alignSelf: 'flex-start',
      marginBottom: 20,
    },
    summary: {
      fontSize: 18,
      color: '#34495e',
      lineHeight: 28,
      marginBottom: 25,
      fontStyle: 'italic',
      textAlign: 'left',
    },
    articleContent: {
      fontSize: 16,
      color: '#2c3e50',
      lineHeight: 26,
      textAlign: 'left',
    },
    featuredBadge: {
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: '#f39c12',
      borderRadius: 16,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    featuredText: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>
            ← {t('articles.backToList')}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.scrollContainer}>
          {article.featured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>★ {t('articles.featured')}</Text>
            </View>
          )}

          <Text style={styles.title}>{article.title}</Text>

          <View style={styles.meta}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>{t('articles.author')}</Text>
              <Text style={styles.metaValue}>{article.author}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>{t('articles.published')}</Text>
              <Text style={styles.metaValue}>{article.publishDate}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>{t('articles.readTime')}</Text>
              <Text style={styles.metaValue}>{article.readTime}</Text>
            </View>
          </View>

          <Text style={styles.category}>{article.category}</Text>

          <Text style={styles.summary}>{article.summary}</Text>

          <Text style={styles.articleContent}>{article.content}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ArticleDetailScreen;