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

interface UploadBoxProps {
    label: string;
    subtitle: string;
    icon: React.ReactNode;
    onPress: () => void;
    hasFile: boolean;
    fileUri: string | null;
}

const UploadBox: React.FC<UploadBoxProps> = ({
    label,
    subtitle,
    icon,
    onPress,
    hasFile,
    fileUri,
}) => {
    const colorThemeRenderer = usePageThemeRender()
    const colorScheme = useColorScheme()

    if (fileUri) {
        return (
            <TouchableOpacity
                style={[styles.idCardContainer, styles.idContainerActive, {
                    borderColor: Colors[colorScheme ?? 'light'].tint,
                    borderStyle: 'solid',
                    padding: 0,
                    overflow: 'hidden',
                }]}
                onPress={onPress}
                activeOpacity={0.85}
            >
                <Image
                    source={{ uri: fileUri }}
                    style={styles.previewImage}
                    resizeMode='cover'
                />
                <ThemedView style={styles.retakeBadge}>
                    <RefreshCw color={'#fff'} size={14} />
                    <ThemedText style={styles.retakeText}>Tap to retake</ThemedText>
                </ThemedView>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity
            style={[styles.idCardContainer, {
                borderColor: colorThemeRenderer.borderColor,
                backgroundColor: colorThemeRenderer.secondaryBackground,
            }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {icon}
            <ThemedText type='subtitle'>{label}</ThemedText>
            <ThemedText type='description'>{subtitle}</ThemedText>
        </TouchableOpacity>
    )
}

const requirements = [
    'Not expired and valid',
    'All four corners visible',
    'No glare or blurring',
];

export default function CardIdentity() {
    const router = useRouter()
    const colorScheme = useColorScheme()
    const colorThemeRenderer = usePageThemeRender()
    const dimension = Dimensions.get('window').width
    const [progress, setProgress] = useState(0.25)
    const [frontFile, setFrontFile] = useState<string | null>(null);
    const [backFile, setBackFile] = useState<string | null>(null);

    const Icon = () => (
        <ThemedView style={[styles.iconContainer, {
            backgroundColor: colorThemeRenderer.iconContainer
        }]}>
            <Upload color={Colors[colorScheme ?? 'light'].tint} />
        </ThemedView>
    )

    const handlePickImage = (side: 'front' | 'back') => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Cancel', 'Take a Photo', 'Choose from Gallery'],
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) openCamera(side)
                    if (buttonIndex === 2) openGallery(side)
                }
            )
        } else {
            Alert.alert(
                'Upload ID Card',
                'Choose an option',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Take a Photo', onPress: () => openCamera(side) },
                    { text: 'Choose from Gallery', onPress: () => openGallery(side) },
                ]
            )
        }
    }

    const openCamera = async (side: 'front' | 'back') => {
        const permission = await ImagePicker.requestCameraPermissionsAsync()
        if (!permission.granted) {
            Alert.alert('Permission required', 'Please allow access to your camera')
            return
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.9,
        })
        if (!result.canceled) {
            const uri = result.assets[0].uri
            if (side === 'front') setFrontFile(uri)
            else setBackFile(uri)
        }
    }

    const openGallery = async (side: 'front' | 'back') => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!permission.granted) {
            Alert.alert('Permission required', 'Please allow access to your gallery')
            return
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.9,
        })
        if (!result.canceled) {
            const uri = result.assets[0].uri
            if (side === 'front') setFrontFile(uri)
            else setBackFile(uri)
        }
    }

    const handleSubmit = () => {
        if (!frontFile || !backFile) {
            Alert.alert('Missing files', 'Please upload both sides of your Ghana Card.')
            return
        }
        router.push('/auth/identityVerification')
    }

    useEffect(() => {
        setProgress(0.5);
    }, []);

    return (
        <ThemedView style={PageStyles.container}>
            <ThemedView style={{ marginHorizontal: 10, marginBottom: 20, gap: 10, paddingTop: 10 }}>
                <ThemedView style={PageStyles.progressIndicatorTitle}>
                    <ThemedText>IDENTITY CARD UPLOAD</ThemedText>
                    <ThemedText type='link' style={{ color: colorThemeRenderer.link }}>2 of 4</ThemedText>
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

            <ScrollView contentContainerStyle={{ paddingBottom: 35 }}>

                <ThemedView style={{ display: 'flex', gap: 15, marginTop: 15, marginBottom: 30 }}>
                    <ThemedText style={[PageStyles.formTitle, { color: colorThemeRenderer.oppositeTextColor }]}>
                        Upload Identity Card
                    </ThemedText>
                    <ThemedText type='description'>
                        Please provide a clear photo of the front and back of your national ID.
                        Ensure all details are legible and within the frame
                    </ThemedText>
                </ThemedView>

                <ThemedView style={[styles.main]}>
                    <ThemedView>
                        <ThemedText style={[PageStyles.label, { color: colorThemeRenderer.label, marginBottom: 10 }]}>
                            Front Side
                        </ThemedText>
                        <UploadBox
                            label='Take a photo or upload'
                            subtitle='PNG, JPG up to 10MB'
                            icon={<Icon />}
                            onPress={() => handlePickImage('front')}
                            hasFile={!!frontFile}
                            fileUri={frontFile}
                        />
                    </ThemedView>

                    <ThemedView>
                        <ThemedText style={[PageStyles.label, { color: colorThemeRenderer.label, marginBottom: 10 }]}>
                            Back Side
                        </ThemedText>
                        <UploadBox
                            label='Take a photo or upload'
                            subtitle='PNG, JPG up to 10MB'
                            icon={<Icon />}
                            onPress={() => handlePickImage('back')}
                            hasFile={!!backFile}
                            fileUri={backFile}
                        />
                    </ThemedView>
                </ThemedView>

                <ThemedView style={[styles.requirementsBox, {
                    backgroundColor: colorScheme === 'light' ? '#F0FDF4' : '#626764',
                }]}>
                    <ThemedText style={{ fontWeight: 500, color: '#10B981', marginBottom: 10 }}>REQUIREMENTS</ThemedText>
                    {requirements.map((req, index) => (
                        <ThemedView key={index} style={[styles.requirementPoints, {
                            backgroundColor: colorThemeRenderer.tipsBackground,
                        }]}>
                            <CircleCheckBig color={'#10B981'} />
                            <ThemedText style={{ color: colorThemeRenderer.tipsTextColor }}>{req}</ThemedText>
                        </ThemedView>
                    ))}
                </ThemedView>

                <Button action={handleSubmit} disabled={!frontFile || !backFile}>
                    <ThemedText type='placeholderText'>Next Step</ThemedText>
                    <MoveRight color={'#fff'} />
                </Button>

            </ScrollView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        gap: 25,
        marginBottom: 25,
    },
    idCardContainer: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
        paddingHorizontal: 20,
    },
    
    idContainerActive: {
        borderWidth: 2,
        borderStyle: 'solid',
    },
    previewImage: {
        width: '100%',
        height: 180,
        borderRadius: 18,
    },
    retakeBadge: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 10,
        backgroundColor: 'rgba(0,0,0,0.45)',
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
    },
    retakeText: {
        color: '#fff',
        fontSize: 13,
    },
    iconContainer: {
        padding: 15,
        borderRadius: 9999,
        marginBottom: 20,
    },
    requirementsBox: {
        borderWidth: 1,
        padding: 15,
        marginBottom: 25,
        borderRadius: 20,
        borderColor: '#b0f7c9',
        backgroundColor: '#F0FDF4',
    },
    requirementPoints: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
})