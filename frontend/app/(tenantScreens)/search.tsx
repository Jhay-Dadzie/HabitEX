import { StyleSheet, TextInput } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import SearchBar from '@/components/searchBar'
import React, { useRef, useEffect, useState } from 'react'

export default function Search() {
  const searchInputRef = useRef<TextInput>(null)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      searchInputRef.current?.focus()
    }, 100) // Small delay to ensure the component is fully mounted

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedText>This is the search page</ThemedText>
      <SearchBar
        ref={searchInputRef}
        value={searchValue}
        onChangeText={setSearchValue}
        autoFocus={true}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({})