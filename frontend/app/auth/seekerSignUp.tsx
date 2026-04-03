import { StyleSheet } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PageStyles } from '@/components/globalStyles/pageStyles'
import Button from '@/components/button'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { MoveRight } from 'lucide-react-native'

export default function SeekerSignUp() {
    const router = useRouter()
    const colorScheme = useColorScheme()
    return (
        <SafeAreaView style={[PageStyles.container, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
            <ThemedText>Create account as a seeker</ThemedText>
            <Button action={() => router.push('/(tenantScreens)')}>
                <ThemedText type='placeholderText'>Sign Up</ThemedText>
            </Button>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({})