import { StyleSheet, Dimensions, Alert, TouchableOpacity, ScrollView, ActionSheetIOS, Platform, Image } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React, { useState, useEffect } from 'react'
import { PageStyles } from '@/components/globalStyles/pageStyles'
import Button from '@/components/button'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/theme'
import usePageThemeRender from '@/components/globalStyles/pageThemeRender'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { CircleCheckBig, MoveRight, Upload, RefreshCw } from 'lucide-react-native'
import * as Progress from 'react-native-progress'
import * as ImagePicker from 'expo-image-picker'

export default function IdentityVerification() {
    const router = useRouter()
    const colorScheme = useColorScheme()
    const colorThemeRenderer = usePageThemeRender()
    const dimension = Dimensions.get('window').width
    
    const [progress, setProgress] = useState(0.5)

    useEffect(() => {
        setProgress(0.75)
    },[])
    return (
        <ThemedView style={PageStyles.container}>
            <ThemedView style={{ marginHorizontal: 10, marginBottom: 20, gap: 10, paddingTop: 10 }}>
                <ThemedView style={PageStyles.progressIndicatorTitle}>
                    <ThemedText>TAKE SELFIE</ThemedText>
                    <ThemedText type='link' style={{ color: colorThemeRenderer.link }}>3 of 4</ThemedText>
                </ThemedView>
                <Progress.Bar
                    progress={progress}
                    width={dimension - 40}
                    color={Colors[colorScheme ?? 'light'].tint}
                    borderWidth={0}
                    unfilledColor={colorScheme === 'light' ? Colors.light.borderColor : Colors.light.tint}
                    animated={true}
                    animationType='timing'
                    animationConfig={{ duration: 1000 }}
                />
            </ThemedView>
            <ThemedText>Identify yourself</ThemedText>
            <Button action={() => router.push('/auth/ownershipProof')}>
                <ThemedText type='placeholderText'>Next Step</ThemedText>
                <MoveRight color={'#fff'} />
            </Button>
        </ThemedView>
    )
}

const styles = StyleSheet.create({})