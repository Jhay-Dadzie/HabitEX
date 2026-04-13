import { StyleSheet, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform, Text, TouchableOpacity, Image } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PageStyles } from '@/components/globalStyles/pageStyles'
import Button from '@/components/button'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Eye, EyeClosed, LockKeyhole, Mail} from 'lucide-react-native'
import usePageThemeRender  from '@/components/globalStyles/pageThemeRender'

export default function Login() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const colorThemeRenderer = usePageThemeRender()

  const [email_PhoneNumber, setEmail_PhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [viewPassword, setViewPassword] = useState(true)
  
  const isValid =  email_PhoneNumber &&  password 

  const handleSubmit= () => {
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
                <ThemedText style={[PageStyles.formTitle, {color: colorThemeRenderer.oppositeTextColor}]}>Login into your account</ThemedText>
                <ThemedText type='description'>Secure access to your santuary</ThemedText>
            </ThemedView>

            <ThemedView style={PageStyles.form}>
                {/* Email Address or Phone Number */}
                <ThemedView>
                    <ThemedText style={[PageStyles.label, {color: colorThemeRenderer.label}]}>Email Address</ThemedText>
                    <ThemedView style={[PageStyles.inputContainer, {
                        borderColor: colorThemeRenderer.borderColor,
                        backgroundColor: colorScheme === 'light' ? '#F8FAFC' : '#1E293B'
                    }]}>
                        <Mail size={24} color={Colors[colorScheme ?? 'light'].icon}/>
                        <TextInput style={[PageStyles.textInput, {
                                color:  colorThemeRenderer.fontColor
                            }]} 
                            placeholder='Enter email or phone number'
                            placeholderTextColor={colorThemeRenderer.fontColor}
                            value={email_PhoneNumber}
                            onChangeText={setEmail_PhoneNumber}
                            inputMode='email'
                        />
                    </ThemedView>
                </ThemedView>

                {/* Password */}
                <ThemedView>
                    <ThemedText style={[PageStyles.label, {color: colorThemeRenderer.label}]}>Password</ThemedText>
                    <ThemedView style={[PageStyles.inputContainer, {
                    borderColor: colorThemeRenderer.borderColor,
                    backgroundColor: colorScheme === 'light' ? '#F8FAFC' : '#1E293B'
                    }]}
                    >
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
                </ThemedView>

                <ThemedText type='link' style={{marginTop: -10, marginBottom: 20, alignSelf: 'flex-end', color: colorThemeRenderer.link}}
                    onPress={() => router.push('/')}
                >
                    Forgot Password?
                </ThemedText>
            </ThemedView>
        
          <Button
            action={handleSubmit}
            disabled={!isValid}
          >
            <ThemedText type='placeholderText'>Login</ThemedText>
          </Button>

            <ThemedView style={PageStyles.continueWith}>
                <ThemedView style={[PageStyles.line,{
                        backgroundColor: Colors[colorScheme ?? 'light'].icon
                    }]} 
                />
                <ThemedText style={{marginHorizontal: 10}}>
                    OR CONTINUE WITH
                </ThemedText>
                <ThemedView style={[PageStyles.line,{
                        backgroundColor: Colors[colorScheme ?? 'light'].icon
                    }]} 
                />
            </ThemedView>

            <ThemedView style={PageStyles.authOptionContainer}>
                <TouchableOpacity 
                    activeOpacity={0.5}
                    style={[PageStyles.authOptionButton, {
                        borderColor: colorThemeRenderer.borderColor
                    }]}
                >
                    <Image source={require('@/assets/icons/google.png')} style={PageStyles.authIcon}/>
                    <ThemedText style={PageStyles.authText}>Google</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity 
                    activeOpacity={0.5}
                    style={[PageStyles.authOptionButton, {
                        borderColor: colorThemeRenderer.borderColor
                    }]}
                >
                    <Image source={require('@/assets/icons/facebook.png')} style={PageStyles.authIcon}/>
                    <ThemedText style={PageStyles.authText}>Facebook</ThemedText>
                </TouchableOpacity>
            </ThemedView>

            <ThemedView style={PageStyles.bottomFormText}>
                <ThemedText type='description'>Don't have an account?</ThemedText>
                <ThemedText type='link' onPress={() => router.replace('/(onboarding)/role')} style={{color: colorThemeRenderer.link}}>Signup</ThemedText>
            </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
      
  )
}

const styles = StyleSheet.create({})