import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import ArticleDetailScreen from '@/screens/ArticleDetailScreen';

export default function ArticleDetailPage() {
  const { article } = useLocalSearchParams();
  
  const articleData = article ? JSON.parse(article as string) : null;
  
  if (!articleData) {
    return null;
  }

  return <ArticleDetailScreen route={{ params: { article: articleData } }} />;
}