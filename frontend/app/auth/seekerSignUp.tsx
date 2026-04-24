import { StyleSheet, TextInput, View, Pressable, ScrollView, KeyboardAvoidingView, Platform, Text } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PageStyles } from '@/components/globalStyles/pageStyles'
import Button from '@/components/button'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Eye, EyeClosed, LockKeyhole, Mail, Phone, UserRound } from 'lucide-react-native'
import usePageThemeRender  from '@/components/globalStyles/pageThemeRender'

export default function SeekerSignUp() {
    const router = useRouter()
    const colorScheme = useColorScheme()
    const colorThemeRenderer = usePageThemeRender()

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [viewPassword, setViewPassword] = useState(true)
    
    const [error, setError] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    })
    const [agreed, setAgreed] = useState(false);
    const isValid = fullName && email && phoneNumber && password && confirmPassword && agreed

    const handleSubmit= () => {
        const newErrors = {
            fullName: !fullName ? 'Full name is required' : '',
            email: !email ? 'Email is required' : '',
            phoneNumber: !phoneNumber ? 'Phone number is required' : '',
            password: !password ? 'Password is required' : '',
            confirmPassword: !confirmPassword ? 'Re-enter password to confirm' : '',
        }
        setError(newErrors)


        if (Object.values(newErrors).some(e => e)) return;

        router.replace('/(tenantScreens)')
    }
    
    return (
        <SafeAreaView style={[PageStyles.container, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
            <KeyboardAvoidingView style={{flex: 1}}
                behavior = {Platform.OS === 'android' ? 'height' : 'padding'}
                
            >

                <ScrollView
                    keyboardShouldPersistTaps = "handled"
                    contentContainerStyle={{
                        paddingBottom: 40
                    }}
                    style={[PageStyles.formContainer, {borderColor: colorThemeRenderer.borderColor,
                        backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background,
                    }]}
                    showsVerticalScrollIndicator = {false}
                >
                    <ThemedView style={{display: 'flex', gap: 15, marginVertical: 30}}>
                        <ThemedText style={[PageStyles.formTitle, {color: colorThemeRenderer.oppositeTextColor}]}>Create your account</ThemedText>
                        <ThemedText type='description'>Join Habitex and start our journey with us today</ThemedText>
                    </ThemedView>

                    <ThemedView style={PageStyles.form}>
                        {/* Full name */}
                        <ThemedView>
                            <ThemedText style={[PageStyles.label, {color: colorThemeRenderer.label}]}>Full Name</ThemedText>
                            <ThemedView style={[PageStyles.inputContainer, {
                                borderColor: error.fullName ? 'red' : colorThemeRenderer.borderColor,
                                backgroundColor: colorThemeRenderer.secondaryBackground
                            }]}>
                                <UserRound size={24} color={Colors[colorScheme ?? 'light'].icon}/>
                                <TextInput style={[PageStyles.textInput, {
                                        color: colorThemeRenderer.fontColor
                                    }]} 
                                    placeholder='John Doe'
                                    placeholderTextColor={colorThemeRenderer.fontColor}
                                    value={fullName}
                                    onChangeText={setFullName}
                                />
                            </ThemedView>
                            
                            {error.fullName && (
                                <ThemedText style={PageStyles.errorText}>
                                    {error.fullName}
                                </ThemedText>
                            )}
                        </ThemedView>

                        {/* Email Address */}
                        <ThemedView>
                            <ThemedText style={[PageStyles.label, {color: colorThemeRenderer.label}]}>Email Address</ThemedText>
                            <ThemedView style={[PageStyles.inputContainer, {
                                borderColor: error.email ? 'red' : colorThemeRenderer.borderColor,
                                backgroundColor: colorThemeRenderer.secondaryBackground
                            }]}>
                                <Mail size={24} color={Colors[colorScheme ?? 'light'].icon}/>
                                <TextInput style={[PageStyles.textInput, {
                                        color:  colorThemeRenderer.fontColor
                                    }]} 
                                    placeholder='example@gmail.com'
                                    placeholderTextColor={colorThemeRenderer.fontColor}
                                    value={email}
                                    onChangeText={setEmail}
                                    inputMode='email'
                                />
                            </ThemedView>

                            {error.email && (
                                <ThemedText style={PageStyles.errorText}>
                                    {error.email}
                                </ThemedText>
                            )}
                        </ThemedView>

                        {/* Phone Number */}
                        <ThemedView>
                            <ThemedText style={[PageStyles.label, {color: colorThemeRenderer.label}]}>Phone Number</ThemedText>
                            <ThemedView style={[PageStyles.inputContainer, {
                                borderColor: error.phoneNumber ? 'red' : colorThemeRenderer.borderColor,
                                backgroundColor: colorThemeRenderer.secondaryBackground
                            }]}>
                                <Phone size={24} color={Colors[colorScheme ?? 'light'].icon}/>
                                <TextInput style={[PageStyles.textInput, {
                                        color: colorThemeRenderer.fontColor
                                    }]} 
                                    placeholder='+1 (123) 456-7890'
                                    placeholderTextColor={colorThemeRenderer.fontColor}
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    inputMode='tel'
                                />
                            </ThemedView>

                            {error.phoneNumber && (
                                <ThemedText style={PageStyles.errorText}>
                                    {error.phoneNumber}
                                </ThemedText>
                            )}
                        </ThemedView>

                        {/* Password */}
                        <ThemedView>
                            <ThemedText style={[PageStyles.label, {color: colorThemeRenderer.label}]}>Password</ThemedText>
                            <ThemedView style={[PageStyles.inputContainer, {
                                borderColor: error.password ? 'red' : colorThemeRenderer.borderColor,
                                backgroundColor: colorThemeRenderer.secondaryBackground
                            }]}>
                                <LockKeyhole size={24} color={Colors[colorScheme ?? 'light'].icon}/>
                                <TextInput style={[PageStyles.textInput, {
                                        color: colorThemeRenderer.fontColor
                                    }]} 
                                    placeholder='Enter your password'
                                    placeholderTextColor={colorThemeRenderer.fontColor}
                                    secureTextEntry={viewPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <Pressable onPress={() => setViewPassword(prev => !prev)}
                                    style={{marginRight: 8}}
                                >
                                    {
                                        viewPassword === true ? (<EyeClosed color={Colors[colorScheme ?? 'light'].icon}/>)
                                        : (<Eye color={Colors[colorScheme ?? 'light'].icon}/>)
                                        
                                    }
                                </Pressable>
                                
                            </ThemedView>

                            {error.password && (
                                <ThemedText style={PageStyles.errorText}>
                                    {error.password}
                                </ThemedText>
                            )}
                        </ThemedView>

                        {/* Confirm Password*/}
                        <ThemedView>
                            <ThemedText style={[PageStyles.label, {color: colorThemeRenderer.label}]}>Confirm Password</ThemedText>
                            <ThemedView style={[PageStyles.inputContainer, {
                                borderColor: error.confirmPassword ? 'red' : colorThemeRenderer.borderColor,
                                backgroundColor: colorThemeRenderer.secondaryBackground
                            }]}>
                                <LockKeyhole size={24} color={Colors[colorScheme ?? 'light'].icon}/>
                                <TextInput style={[PageStyles.textInput, {
                                        color: colorThemeRenderer.fontColor
                                    }]} 
                                    placeholder='Confirm Password'
                                    placeholderTextColor={colorThemeRenderer.fontColor}
                                    secureTextEntry = {viewPassword}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />

                                <Pressable onPress={() => setViewPassword(prev => !prev)}
                                    style={{marginRight: 8}}
                                >
                                    {
                                        viewPassword === true ? (<EyeClosed color={Colors[colorScheme ?? 'light'].icon}/>)
                                        : (<Eye color={Colors[colorScheme ?? 'light'].icon}/>)
                                        
                                    }
                                </Pressable>
                            </ThemedView>

                            {error.confirmPassword && (
                                <ThemedText style={PageStyles.errorText}>
                                    {error.confirmPassword}
                                </ThemedText>
                            )}
                        </ThemedView>
                    </ThemedView>

                    <ThemedView style={{marginBottom: 10, alignContent: 'center'}}>
                        <Pressable
                            onPress={() => setAgreed(!agreed)}
                            style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 5 }}
                        >
                            {/* Box */}
                            <View
                                style={{
                                width: 22,
                                height: 22,
                                borderRadius: 6,
                                borderWidth: 2,
                                borderColor: 'gray',
                                backgroundColor: agreed ? 'gray' :  'transparent',
                                alignItems: 'center',
                                justifyContent: 'center',
                                }}
                            >
                                {agreed && (
                                <View
                                    style={{
                                    width: 10,
                                    height: 10,
                                    backgroundColor: 'gray',
                                    borderRadius: 2,
                                    }}
                                />
                                )}
                            </View>

                            <ThemedText type='description'>
                                By signing up, you agree to our <ThemedText type='link'>Terms of Service</ThemedText> and
                                <ThemedText type='link'> Privacy Policy</ThemedText>
                            </ThemedText>
                        </Pressable>
                    </ThemedView>
                    
                    <Button
                        action={handleSubmit}
                        disabled={!agreed}
                    >
                        <ThemedText type='placeholderText'>Sign Up</ThemedText>
                    </Button>

                    <ThemedView style={PageStyles.bottomFormText}>
                        <ThemedText type='description'>Already have an account?</ThemedText>
                        <Pressable onPress={() => router.replace('/auth')}>
                            <ThemedText type='link' style={{color: colorThemeRenderer.link}}>Login</ThemedText>
                        </Pressable>
                    </ThemedView>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({})