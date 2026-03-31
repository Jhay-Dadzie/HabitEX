import { ScrollView, StyleSheet } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React from 'react'

export default function index() {
  return (
    <ThemedView style={{flex: 1}}>
        <ThemedText>Welcome to the home page</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({})