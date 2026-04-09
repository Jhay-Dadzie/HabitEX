import { Image, StyleSheet, Pressable, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useState } from 'react'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useThemeRender from '@/components/globalStyles/pageThemeRender'
import Button from '@/components/button'
import { PageStyles } from '@/components/globalStyles/pageStyles'
import { MoveRight } from 'lucide-react-native'
export default function Role() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const colorThemeRenderer = useThemeRender()
  const [selectedRole, setSelectedRole] = useState<'seeker' | 'landlord' | null>(null)
  
  const navigateToScreen = () => {
    if (selectedRole === 'landlord') {
      router.push('/auth/landlordSignUp')
    } else {
      router.push('/auth/seekerSignUp')
    }
  }

  return (
    <SafeAreaView style={[PageStyles.container, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
      <ThemedView>
        <ThemedText type='title'>Logo</ThemedText>
      </ThemedView>

      <ThemedView style={styles.headerContainer}>
        <ThemedText type='title' style={[styles.text, {color: colorThemeRenderer.oppositeTextColor}]}>How would you like to use Habitex?</ThemedText>
        <ThemedText type='description' style={styles.text}>Choose your journey to help us personalize your experience.</ThemedText>
      </ThemedView>

      <ThemedView style={[styles.cardContainer, {marginTop: 30}]}>
        <Pressable onPress={() => setSelectedRole('seeker')}>

          <ThemedView style={[styles.card,
            {borderColor: selectedRole === 'seeker' ? Colors[colorScheme ?? 'light'].tint : colorThemeRenderer.borderColor}
          ]}>
            <Image source={require('@/assets/images/bedroom.jpg')} style={styles.image} />

            <ThemedView style={styles.cardText}>
              <ThemedText type='defaultSemiBold' style={{color: colorThemeRenderer.oppositeTextColor}}>House Seeker</ThemedText>
              <ThemedText type='default'>Find your dream home from our curated verified listings.</ThemedText>
            </ThemedView>

          </ThemedView>
        </Pressable>

        <Pressable onPress={() => setSelectedRole('landlord')}>
          <ThemedView style={[styles.card,
            {borderColor: selectedRole === 'landlord' ? Colors[colorScheme ?? 'light'].tint : colorThemeRenderer.borderColor}
          ]}>
            <Image source={require('@/assets/images/lanlord.jpg')} style={styles.image} />

            <ThemedView style={styles.cardText}>
              <ThemedText type='defaultSemiBold' style={{color: colorThemeRenderer.oppositeTextColor}}>Landlord</ThemedText>
              <ThemedText type='default'>List your property and connect with reliable tenants.</ThemedText>
            </ThemedView>

          </ThemedView>
        </Pressable>
        
      </ThemedView>

      {
        selectedRole && (
          <ThemedView style={{marginBottom: 50}}>
            <Button action={navigateToScreen}>
              <ThemedText type='placeholderText'>Proceed</ThemedText>
              <MoveRight color={'#fff'}/>
            </Button>
          </ThemedView>            
        )
      }
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
    padding: 20,
    gap: 25
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
    padding: 20,
    gap: 25
  },
  text: {
    textAlign: 'center'
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderRadius: 26,
    borderWidth: 0.7,
    padding: 15,
    width: '100%',
    height: 150,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 24,
    elevation: 5

  },
  cardText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
    marginTop: 5
  },
  image: {
    overflow: 'hidden',
    width: 100,
    height: '100%',
    borderRadius: 24
  }
})