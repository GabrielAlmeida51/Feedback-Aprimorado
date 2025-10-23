import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { ThemedView } from '../components/themed-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Lista de imagens (mantenha sincronizada com a galeria)
const images: { [key: string]: any } = {
  '1': require('../assets/images/image.png'),
  '2': require('../assets/images/image copy.png'),
  '3': require('../assets/images/image copy 2.png'),
  '4': require('../assets/images/image copy 3.png'),
  '5': require('../assets/images/image copy 4.png'),
  '6': require('../assets/images/image copy 5.png'),
};

export default function ImageViewScreen() {
  const { imageId } = useLocalSearchParams();
  const image = images[imageId as string];

  return (
    <ThemedView style={styles.container}>
      <Image 
        source={image}
        style={styles.image}
        resizeMode="contain"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: windowWidth,
    height: windowHeight,
  },
});