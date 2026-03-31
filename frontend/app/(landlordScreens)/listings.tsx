import { StyleSheet } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React from 'react'

export default function Listings() {
  return (
    <ThemedView style={{flex: 1}}>
      <ThemedText>Manage your property listings</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({})