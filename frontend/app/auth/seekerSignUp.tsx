import { StyleSheet, TextInput, View, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PageStyles } from '@/components/globalStyles/pageStyles'
import Button from '@/components/button'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { LockKeyhole, Mail, Phone, UserRound } from 'lucide-react-native'
import usePageThemeRender  from '@/components/globalStyles/pageThemeRender'

export default function SeekerSignUp() {
    const router = useRouter()
    const colorScheme = useColorScheme()
    const colorThemeRenderer = usePageThemeRender()

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNmber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [agreed, setAgreed] = useState(false);
    
    return (
        <SafeAreaView style={[PageStyles.container, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
            <ScrollView style={[PageStyles.formContainer, {borderColor: colorThemeRenderer.borderColor,
                backgroundColor: colorScheme === 'light' ? '#fff' : Colors.dark.background
            }]}>
                <ThemedView style={{display: 'flex', gap: 15, marginVertical: 30}}>
                    <ThemedText style={[PageStyles.formTitle, {color: colorThemeRenderer.oppositeTextColor}]}>Create your account</ThemedText>
                    <ThemedText type='description'>Join Habitex and start our journey with us today</ThemedText>
                </ThemedView>

                <ThemedView style={PageStyles.form}>
                    {/* Full name */}
                    <ThemedView>
                        <ThemedText style={[PageStyles.label, {color: colorThemeRenderer.label}]}>Full Name</ThemedText>
                        <ThemedView style={[PageStyles.inputContainer, {
                            borderColor: colorThemeRenderer.borderColor,
                            backgroundColor: colorScheme === 'light' ? '#F8FAFC' : '#1E293B'
                        }]}>
                            <UserRound size={24} color={Colors[colorScheme ?? 'light'].icon}/>
                            <TextInput style={[PageStyles.textInput, {
                                    color: colorThemeRenderer.fontColor
                                }]} 
                                placeholder='John Doe'
                                placeholderTextColor={colorThemeRenderer.fontColor}
                            />
                        </ThemedView>
                    </ThemedView>

                    {/* Email Address */}
                    <ThemedView>
                        <ThemedText style={[PageStyles.label, {color: colorThemeRenderer.label}]}>Email Address</ThemedText>
                        <ThemedView style={[PageStyles.inputContainer, {
                            borderColor: colorThemeRenderer.borderColor,
                            backgroundColor: colorScheme === 'light' ? '#F8FAFC' : '#1E293B'
                        }]}>
                            <Mail size={24} color={Colors[colorScheme ?? 'light'].icon}/>
                            <TextInput style={[PageStyles.textInput, {
                                    color: colorThemeRenderer.fontColor
                                }]} 
                                placeholder='example@gmail.com'
                                placeholderTextColor={colorThemeRenderer.fontColor}
                            />
                        </ThemedView>
                    </ThemedView>

                    {/* Phone Number */}
                    <ThemedView>
                        <ThemedText style={[PageStyles.label, {color: colorThemeRenderer.label}]}>Phone Number</ThemedText>
                        <ThemedView style={[PageStyles.inputContainer, {
                            borderColor: colorThemeRenderer.borderColor,
                            backgroundColor: colorScheme === 'light' ? '#F8FAFC' : '#1E293B'
                        }]}>
                            <Phone size={24} color={Colors[colorScheme ?? 'light'].icon}/>
                            <TextInput style={[PageStyles.textInput, {
                                    color: colorThemeRenderer.fontColor
                                }]} 
                                placeholder='+1 (123) 456-7890'
                                placeholderTextColor={colorThemeRenderer.fontColor}
                            />
                        </ThemedView>
                    </ThemedView>

                    {/* Password */}
                    <ThemedView>
                        <ThemedText style={[PageStyles.label, {color: colorThemeRenderer.label}]}>Password</ThemedText>
                        <ThemedView style={[PageStyles.inputContainer, {
                            borderColor: colorThemeRenderer.borderColor,
                            backgroundColor: colorScheme === 'light' ? '#F8FAFC' : '#1E293B'
                        }]}>
                            <LockKeyhole size={24} color={Colors[colorScheme ?? 'light'].icon}/>
                            <TextInput style={[PageStyles.textInput, {
                                    color: colorThemeRenderer.fontColor
                                }]} 
                                placeholder='Enter your password'
                                placeholderTextColor={colorThemeRenderer.fontColor}
                                secureTextEntry
                            />
                        </ThemedView>
                    </ThemedView>

                    {/* Confirm Password*/}
                    <ThemedView>
                        <ThemedText style={[PageStyles.label, {color: colorThemeRenderer.label}]}>Confirm Password</ThemedText>
                        <ThemedView style={[PageStyles.inputContainer, {
                            borderColor: colorThemeRenderer.borderColor,
                            backgroundColor: colorScheme === 'light' ? '#F8FAFC' : '#1E293B'
                        }]}>
                            <LockKeyhole size={24} color={Colors[colorScheme ?? 'light'].icon}/>
                            <TextInput style={[PageStyles.textInput, {
                                    color: colorThemeRenderer.fontColor
                                }]} 
                                placeholder='Confirm Password'
                                placeholderTextColor={colorThemeRenderer.fontColor}
                                secureTextEntry
                            />
                        </ThemedView>
                    </ThemedView>
                </ThemedView>

                <ThemedView style={{marginBottom: 10, alignContent: 'center'}}>
                    <Pressable
                        onPress={() => setAgreed(!agreed)}
                        style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
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
                
                <Button action={() => router.push('/(tenantScreens)')}>
                    <ThemedText type='placeholderText'>Sign Up</ThemedText>
                </Button>
            </ScrollView>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({})