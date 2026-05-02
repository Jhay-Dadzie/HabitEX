import { TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SlidersHorizontal } from 'lucide-react-native'
import { ThemedView } from '@/components/themed-view'
import { PageStyles } from '@/components/globalStyles/pageStyles'
import usePageThemeRender from '@/components/globalStyles/pageThemeRender'
import { useRouter } from 'expo-router'
import React, { useRef } from 'react'

interface SearchBarProps {
  value?: string
  onChangeText?: (text: string) => void
  onPress?: () => void
  onFilterPress?: () => void
  autoFocus?: boolean
}

const SearchBar = React.forwardRef<TextInput, SearchBarProps>(
  ({
    value = '',
    onChangeText,
    onPress,
    onFilterPress,
    autoFocus = false,
  }, ref) => {
    const colorThemeRenderer = usePageThemeRender()
    const router = useRouter()
    const internalRef = useRef<TextInput>(null)

    const handlePress = () => {
      // If onPress callback is provided, call it (for navigation from index)
      if (onPress) {
        onPress()
      } else {
        // Otherwise, focus the input (for use in search screen)
        // Use ref if it's a RefObject, otherwise use internal ref
        const inputRef = (ref && typeof ref === 'object' && 'current' in ref) ? ref : internalRef
        inputRef.current?.focus()
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
          ref={ref || internalRef}
          style={[PageStyles.searchInput, { color: colorThemeRenderer.fontColor }]}
          placeholder="Search city, area, or house type"
          placeholderTextColor={colorThemeRenderer.fontColor}
          value={value}
          onChangeText={onChangeText}
          onTouchStart={handlePress}
          autoFocus={autoFocus}
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
)

SearchBar.displayName = 'SearchBar'

export default SearchBar