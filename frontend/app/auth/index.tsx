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

export default function Login() {
    const router = useRouter()
    const colorScheme = useColorScheme()
    return (
        <ThemedView style={PageStyles.container}>
            <ThemedText>Identify yourself</ThemedText>
            <Button action={() => router.push('/')}>
                <ThemedText type='placeholderText'>Login</ThemedText>
                
            </Button>
        </ThemedView>
    )
}

const styles = StyleSheet.create({})