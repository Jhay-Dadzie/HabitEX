import { TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SlidersHorizontal } from 'lucide-react-native'
import { ThemedView } from '@/components/themed-view'
import { PageStyles } from '@/components/globalStyles/pageStyles'
import usePageThemeRender from '@/components/globalStyles/pageThemeRender'
import { useRouter } from 'expo-router'
import React from 'react'

interface SearchBarProps {
  value?: string
  onChangeText?: (text: string) => void
  autoFocus?: boolean
  editable?: boolean
  onFilterPress?: () => void
}

export default function SearchBar({
  value = '',
  onChangeText,
  autoFocus = false,
  editable = false,
  onFilterPress,
}: SearchBarProps) {
  const colorThemeRenderer = usePageThemeRender()
  const router = useRouter()

  const handleSearchPress = () => {
    if (!autoFocus) {
      router.push('/(tenantScreens)/search')
    }
  }

  return (
    <ThemedView
      style={[
        PageStyles.searchContainer,
        {
          backgroundColor: colorThemeRenderer.secondaryBackground,
          borderColor: colorThemeRenderer.borderColor,
        },
      ]}
    >
      <Ionicons name="search" size={20} color={colorThemeRenderer.icon} />
      <TextInput
        style={[PageStyles.searchInput, { color: colorThemeRenderer.fontColor }]}
        placeholder="Search city, area, or house type"
        placeholderTextColor={colorThemeRenderer.fontColor}
        value={value}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        editable={editable || autoFocus}
        onFocus={handleSearchPress}
      />
      <TouchableOpacity
        style={{ justifyContent: 'center', alignItems: 'center' }}
        onPress={onFilterPress}
      >
        <SlidersHorizontal size={20} color={colorThemeRenderer.icon} />
      </TouchableOpacity>
    </ThemedView>
  )
}
