import { ScrollView, StyleSheet } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React from 'react'
import { Link } from 'expo-router'

export default function index() {
  return (
    <ThemedView style={{flex: 1}}>
        <ThemedText>Welcome to the home page</ThemedText>
        <Link href={'/(landlordScreens)'} asChild >
          <ThemedText>
            Press to switch to landlord
          </ThemedText>
        
        </Link>
    </ThemedView>
  )
}

const styles = StyleSheet.create({})