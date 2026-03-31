import { StyleSheet } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React from 'react'
import { Link } from 'expo-router'

export default function Dashboard() {
  return (
    <ThemedView style={{flex: 1}}>
      <ThemedText>This is landlord's dashboard</ThemedText>
      <Link href={'/(tenantScreens)'} asChild>
        <ThemedText>Press to go to tenant screen</ThemedText>
      </Link>
    </ThemedView>
  )
}

const styles = StyleSheet.create({})