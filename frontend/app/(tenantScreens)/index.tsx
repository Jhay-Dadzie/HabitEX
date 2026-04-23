import { StyleSheet, Dimensions, Alert, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React, { useState, useEffect, useRef } from 'react'
import { PageStyles } from '@/components/globalStyles/pageStyles'
import Button from '@/components/button'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/theme'
import usePageThemeRender from '@/components/globalStyles/pageThemeRender'
import { useColorScheme } from '@/hooks/use-color-scheme'


export default function index() {
  const colorScheme = useColorScheme()
  return (
    <ScrollView style={[ PageStyles.container, {
      backgroundColor: Colors[colorScheme ?? 'light'].background
    }]}>
      <ThemedText>Welcome to the home page</ThemedText>
        
    </ScrollView>
  )
}

const styles = StyleSheet.create({})