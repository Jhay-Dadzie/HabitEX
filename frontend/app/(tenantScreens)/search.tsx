import { StyleSheet } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React from 'react'

export default function Search() {
  return (
    <ThemedView style={{flex: 1}}>
      <ThemedText>This is the search page</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({})