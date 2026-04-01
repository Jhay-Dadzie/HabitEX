import { StyleSheet } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function role() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ThemedView style={{flex: 1}}>
        <ThemedText>This is the role page</ThemedText>
      </ThemedView>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({})