import { StyleSheet } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React from 'react'

export default function Profile() {
  return (
    <ThemedView style={{flex: 1}}>
      <ThemedText>Edit your profile</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({})