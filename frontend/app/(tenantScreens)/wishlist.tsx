import { StyleSheet } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React from 'react'

export default function Wishlist() {
  return (
    <ThemedView style={{flex: 1}}>
      <ThemedText>Add to your wishlist</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({})