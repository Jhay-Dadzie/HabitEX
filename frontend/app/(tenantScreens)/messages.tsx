import { StyleSheet} from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React from 'react'

export default function Messages() {
  return (
    <ThemedView style={{flex: 1}}>
      <ThemedText>Chat with a landlord</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({})