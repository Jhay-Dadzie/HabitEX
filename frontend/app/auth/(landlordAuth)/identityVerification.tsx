import { StyleSheet, Dimensions, Alert, TouchableOpacity, View } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React, { useState, useEffect, useRef } from 'react'
import { PageStyles } from '@/components/globalStyles/pageStyles'
import Button from '@/components/button'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/theme'
import usePageThemeRender from '@/components/globalStyles/pageThemeRender'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { MoveRight, Upload, RefreshCw, Lightbulb, Camera } from 'lucide-react-native'
import * as Progress from 'react-native-progress'
import * as ImagePicker from 'expo-image-picker'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'

export default function IdentityVerification() {
    const router = useRouter()
    const colorScheme = useColorScheme()
    const colorThemeRenderer = usePageThemeRender()
    const dimension = Dimensions.get('window').width

    const [progress, setProgress] = useState(0.5)
    const [facing, setFacing] = useState<CameraType>('front')
    const [capturedUri, setCapturedUri] = useState<string | null>(null)
    const [permission, requestPermission] = useCameraPermissions()
    const cameraRef = useRef<CameraView>(null)

    // ── Dimensions ──
    const FRAME_WIDTH = dimension - 48
    const FRAME_HEIGHT = FRAME_WIDTH * 1.1

    useEffect(() => {
        setProgress(0.75)
    }, [])

    // ── Request camera permission on mount ──
    useEffect(() => {
        if (!permission?.granted) {
            requestPermission()
        }
    }, [])

    const handleFlip = () => {
        setFacing(prev => (prev === 'front' ? 'back' : 'front'))
    }

    // ── Capture from camera ──
    const handleCapture = async () => {
        if (!cameraRef.current) return
        try {
            const photo = await cameraRef.current.takePictureAsync({ quality: 0.9 })
            if (photo?.uri) {
                setCapturedUri(photo.uri)
            }
        } catch {
            Alert.alert('Error', 'Failed to capture photo. Please try again.')
        }
    }

    // ── Upload from gallery ──
    const handleUpload = async () => {
        const perm = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!perm.granted) {
            Alert.alert('Permission required', 'Please allow access to your gallery.')
            return
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.9,
        })
        if (!result.canceled) {
            setCapturedUri(result.assets[0].uri)
        }
    }

    const handleRetake = () => setCapturedUri(null)

    const handleSubmit = () => {
        if (!capturedUri) {
            Alert.alert('No photo', 'Please take or upload a selfie first.')
            return
        }
        router.push('/auth/ownershipProof')
    }

    return (
        <ThemedView style={PageStyles.container}>

            {/* ── Progress bar ── */}
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

            {/* ── Title + description ── */}
            <ThemedView style={{ gap: 10, marginBottom: 24 }}>
                <ThemedText style={[PageStyles.formTitle, { color: colorThemeRenderer.oppositeTextColor }]}>
                    Selfie Verification
                </ThemedText>
                <ThemedText type='description'>
                    Please position your face within the frame.
                    This ensures you're the owner of the provided documents.
                </ThemedText>
            </ThemedView>

            {/* ── Camera / Preview frame ── */}
            <ThemedView style={[styles.frameOuter, {
                width: FRAME_WIDTH,
                height: FRAME_HEIGHT,
                borderColor: Colors[colorScheme ?? 'light'].tint,
                backgroundColor: colorScheme === 'light' ? '#F0EFFA' : '#1e1e2e',
                alignSelf: 'center',
            }]}>

                {capturedUri ? (
                    /* ── Preview mode ── */
                    <>
                        <ThemedView style={styles.cameraFill}>
                            {/* Using Image for preview */}
                            <ThemedView style={{ flex: 1, borderRadius: 20, overflow: 'hidden' }}>
                                <CameraView style={{ flex: 1 }} />
                            </ThemedView>
                        </ThemedView>
                        {/* Oval overlay */}
                        <View style={styles.ovalOverlay} pointerEvents='none'>
                            <View style={[styles.oval, { borderColor: Colors[colorScheme ?? 'light'].tint }]} />
                        </View>
                        {/* Pill label */}
                        <View style={[styles.pillLabel, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
                            <ThemedText style={styles.pillText}>Photo captured — retake below</ThemedText>
                        </View>
                    </>
                ) : (
                    /* ── Live camera mode ── */
                    <>
                        {permission?.granted ? (
                            <CameraView
                                ref={cameraRef}
                                style={styles.cameraFill}
                                facing={facing}
                            />
                        ) : (
                            /* ── Permission not granted: static placeholder ── */
                            <ThemedView style={[styles.cameraFill, styles.placeholderFill, {
                                backgroundColor: colorScheme === 'light' ? '#E8E7F6' : '#2a2a3e',
                            }]}>
                                {/* Face silhouette icon */}
                                <ThemedView style={[styles.faceIconWrap, {
                                    borderColor: Colors[colorScheme ?? 'light'].tint + '55',
                                }]}>
                                    <Upload
                                        color={Colors[colorScheme ?? 'light'].tint}
                                        size={36}
                                        style={{ opacity: 0.5 }}
                                    />
                                </ThemedView>
                            </ThemedView>
                        )}

                        {/* Oval overlay on top of camera */}
                        <View style={styles.ovalOverlay} pointerEvents='none'>
                            <View style={[styles.oval, { borderColor: Colors[colorScheme ?? 'light'].tint }]} />
                        </View>

                        {/* "Center your face" pill */}
                        <View style={[styles.pillLabel, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
                            <ThemedText style={styles.pillText}>Center your face in the oval</ThemedText>
                        </View>
                    </>
                )}
            </ThemedView>

            {/* ── Camera controls row ── */}
            <ThemedView style={styles.controlsRow}>

                {/* Upload */}
                <TouchableOpacity style={styles.controlBtn} onPress={handleUpload} activeOpacity={0.7}>
                    <ThemedView style={[styles.controlIconWrap, {
                        backgroundColor: colorThemeRenderer.secondaryBackground,
                        borderColor: colorThemeRenderer.borderColor,
                    }]}>
                        <Upload color={colorThemeRenderer.label} />
                    </ThemedView>
                    <ThemedText style={styles.controlLabel}>UPLOAD</ThemedText>
                </TouchableOpacity>

                {/* Shutter / Retake */}
                <TouchableOpacity
                    style={styles.shutterBtn}
                    onPress={capturedUri ? handleRetake : handleCapture}
                    activeOpacity={0.8}
                >
                    <View style={[styles.shutterOuter, { borderColor: Colors[colorScheme ?? 'light'].tint + '55' }]}>
                        <View style={[styles.shutterInner, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
                            {capturedUri
                                ? <RefreshCw color='#fff' size={22} />
                                : <Camera size={35} color={'#fff'}/>
                            }
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Flip */}
                <TouchableOpacity style={styles.controlBtn} onPress={handleFlip} activeOpacity={0.7}>
                    <ThemedView style={[styles.controlIconWrap, {
                        backgroundColor: colorThemeRenderer.secondaryBackground,
                        borderColor: colorThemeRenderer.borderColor,
                    }]}>
                        <RefreshCw color={colorThemeRenderer.label} size={20} />
                    </ThemedView>
                    <ThemedText style={styles.controlLabel}>FLIP</ThemedText>
                </TouchableOpacity>

            </ThemedView>

            {/* ── Tips box ── */}
            <ThemedView style={[styles.tipsBox, {
                backgroundColor: colorScheme === 'light' ? '#F5F5FF' : '#1e1e2e',
                borderColor: Colors[colorScheme ?? 'light'].tint + '44',
            }]}>
                <Lightbulb color={Colors[colorScheme ?? 'light'].tint} style={{ marginTop: 2 }} />
                <ThemedView style={{ flex: 1, gap: 3, backgroundColor: 'transparent' }}>
                    <ThemedText style={{ fontWeight: '500' }}>Tips for success</ThemedText>
                    <ThemedText type='description'>
                        Make sure you're in a well-lit area and remove any hats or sunglasses.
                    </ThemedText>
                </ThemedView>
            </ThemedView>

            {/* ── Next step button ── */}
            <Button action={handleSubmit} disabled={!capturedUri}>
                <ThemedText type='placeholderText'>Next Step</ThemedText>
                <MoveRight color={'#fff'} />
            </Button>

        </ThemedView>
    )
}

const styles = StyleSheet.create({
    // ── Frame ──
    frameOuter: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 24,
        position: 'relative',
    },
    cameraFill: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    placeholderFill: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    // ── Oval overlay ──
    ovalOverlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    oval: {
        width: '58%',
        height: '72%',
        borderRadius: 999,
        borderWidth: 2,
        borderStyle: 'dashed',
        backgroundColor: 'transparent',
    },
    faceIconWrap: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // ── Pill label ──
    pillLabel: {
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center',
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 999,
    },
    pillText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '500',
    },
    // ── Controls row ──
    controlsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        marginBottom: 20,
        backgroundColor: 'transparent',
    },
    controlBtn: {
        alignItems: 'center',
        gap: 6,
    },
    controlIconWrap: {
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlLabel: {
        fontSize: 12,
        letterSpacing: 0.8,
    },
    // ── Shutter button ──
    shutterBtn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    shutterOuter: {
        width: 72,
        height: 72,
        borderRadius: 36,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shutterInner: {
        width: 58,
        height: 58,
        borderRadius: 29,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shutterDot: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
    // ── Tips box ──
    tipsBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        borderWidth: 1,
        borderRadius: 16,
        padding: 14,
        marginBottom: 24,
    },
})