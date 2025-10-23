import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';

interface ImageItem {
  id: string;
  uri: ImageSourcePropType;
}

// Lista inicial de imagens
const initialImages: ImageItem[] = [
  { id: '1', uri: require('../assets/images/image.png') },
  { id: '2', uri: require('../assets/images/image copy.png') },
  { id: '3', uri: require('../assets/images/image copy 2.png') },
  { id: '4', uri: require('../assets/images/image copy 3.png') },
  { id: '5', uri: require('../assets/images/image copy 4.png') },
  { id: '6', uri: require('../assets/images/image copy 5.png') },
];

const COLUMN_NUM = 2;
const windowWidth = Dimensions.get('window').width;
const imageSize = (windowWidth - (COLUMN_NUM + 1) * 10) / COLUMN_NUM;

export default function GalleryScreen() {
  const [images, setImages] = useState<ImageItem[]>(initialImages);
  const [showDeleteButton, setShowDeleteButton] = useState<string | null>(null);

  const [lastPress, setLastPress] = useState<{ id: string; time: number } | null>(null);
  
  const handlePress = (imageId: string) => {
    const currentTime = new Date().getTime();
    
    if (lastPress && lastPress.id === imageId && currentTime - lastPress.time < 300) {
      // Duplo clique detectado
      setShowDeleteButton(imageId);
      setLastPress(null);
    } else {
      setLastPress({ id: imageId, time: currentTime });
    }
  };

  const handleDelete = (imageId: string) => {
    setImages(current => current.filter(img => img.id !== imageId));
    setShowDeleteButton(null);
  };

  const renderItem = ({ item }: { item: ImageItem }) => (
    <View style={styles.imageContainer}>
      <Pressable
        onPress={() => handlePress(item.id)}
        style={({ pressed }) => [
          styles.imageWrapper,
          pressed && styles.pressed
        ]}
      >
        <Image source={item.uri} style={styles.image} />
        {showDeleteButton !== item.id && (
          <Link href={{ pathname: '/image-view', params: { imageId: item.id } }} asChild>
            <Pressable style={styles.touchOverlay}>
              <View />
            </Pressable>
          </Link>
        )}
        {showDeleteButton === item.id && (
          <View style={styles.deleteButtonContainer}>
            <Pressable
              onPress={() => handleDelete(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </Pressable>
          </View>
        )}
      </Pressable>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {images.length === 0 ? (
        <View style={styles.emptyState}>
          <ThemedText style={styles.emptyText}>
            Nenhuma imagem na galeria
          </ThemedText>
          <ThemedText style={styles.emptySubtext}>
            Adicione algumas imagens para começar!
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={COLUMN_NUM}
          contentContainerStyle={styles.list}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 5,
  },
  imageContainer: {
    margin: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: imageSize,
    height: imageSize,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#fff',
    position: 'relative',
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  touchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  deleteButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});