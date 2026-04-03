import { StyleSheet } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React from 'react'
import { PageStyles } from '@/components/globalStyles/pageStyles'
import Button from '@/components/button'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'

export default function OwnershipProof() {
    const router = useRouter()
    const colorScheme = useColorScheme()
    return (
        <ThemedView style={PageStyles.container}>
            <ThemedText>Upload your Ghana Card</ThemedText>
            <Button action={() => router.push('/(landlordScreens)')}>
                <ThemedText type='placeholderText'>Finish Signup</ThemedText>
            </Button>
        </ThemedView>
    )
}

const styles = StyleSheet.create({})