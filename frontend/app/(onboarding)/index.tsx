import React, { useRef, useState, useEffect } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import {
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Animated,
} from 'react-native';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

type Slide = {
  id: string;
  title: string;
  description: string;
  image: any;
};

const slides: Slide[] = [
  {
    id: '1',
    title: 'Find houses near you',
    description:
      'Discover the perfect home in your favorite neighborhood with our advanced search tools.',
    image: require('@/assets/images/house1.png'),
  },
  {
    id: '2',
    title: 'Filter by price, utilities, and payment type',
    description:
      'Customize your search to find the perfect home that fits your budget and lifestyle preferences.',
    image: require('@/assets/images/filter.png'),
  },
  {
    id: '3',
    title: 'Chat directly with landlords',
    description:
      'Connect instantly to ask questions and schedule viewings without any middleman.',
    image: require('@/assets/images/chat.png'),
  },
];

export default function OnboardingScreen() {
  const colorScheme = useColorScheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const dotAnimations = useRef(slides.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    slides.forEach((_, index) => {
      Animated.timing(dotAnimations[index], {
        toValue: index === currentIndex ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [currentIndex]);
  const oppositeColor = colorScheme === 'light' ? Colors.light.contrastColor : Colors.dark.contrastColor
  const oppositeTextColor = colorScheme === 'light' ? Colors.light.text : Colors.dark.text

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / width
    );
    setCurrentIndex(index);
  };

  const renderItem = ({ item }: { item: Slide }) => {
    return (
      <ThemedView style={styles.slide}>
        <ThemedView style={styles.card}>
          <Image source={item.image} style={styles.image} />
        </ThemedView>

        <ThemedText type='title' style={[styles.title, {color: oppositeColor}]}>{item.title}</ThemedText>
        <ThemedText type='description' style={[styles.description, {color: oppositeTextColor}]}>{item.description}</ThemedText>
      </ThemedView>
    );
  };

  return (
    <ThemedView style={{flex: 1}}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.logo}>Haven</ThemedText>
        <Link href={'/role'} asChild>
          <ThemedText type='link'>Skip</ThemedText>
        </Link>
        
      </ThemedView>

      <ThemedView>
          {/* Slides */}
        <FlatList
          contentContainerStyle= {
            {paddingBottom: 40}
          }
          ref={flatListRef}
          data={slides}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          keyExtractor={(item) => item.id}
        />

        {/* Pagination Dots */}
        <ThemedView style={styles.pagination}>
          {slides.map((_, index) => {
            const width = dotAnimations[index].interpolate({
              inputRange: [0, 1],
              outputRange: [5, 25],
            });

            const backgroundColor = dotAnimations[index].interpolate({
              inputRange: [0, 1],
              outputRange: ['#D3D3D3', getActiveDotColor(colorScheme)],
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    width,
                    backgroundColor,
                  },
                ]}
              />
            );
          })}
        </ThemedView>
      </ThemedView>
      
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  logo: {
    fontSize: 18,
    fontWeight: '600',
  },

  slide: {
    width,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },

  card: {
    width: '100%',
    height: 280,
    backgroundColor: '#EDEBFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },

  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
    borderRadius: 24
  },

  title: {
    marginVertical: 10,
    textAlign: 'center'
  },

  description: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 30
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  dot: {
    height: 5,
    borderRadius: 100,
    marginHorizontal: 5,
  },
});

const getActiveDotColor = (scheme: string | null | undefined) => {
  return Colors[(scheme ?? 'light') as keyof typeof Colors].complementaryColor;
};
