import React from 'react'
import { BaseToast } from 'react-native-toast-message'
import { useColorScheme } from '@/hooks/use-color-scheme'
import usePageThemeRender from './globalStyles/pageThemeRender'

const SuccessToast = (props: any) => {
  const colorScheme = useColorScheme()
  const colorThemeRenderer = usePageThemeRender()

  return (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 1,
        backgroundColor: colorThemeRenderer.tipsBackground,
        borderRadius: 50,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#b0f7c9',
        width: 300,
        height: 50,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        color: colorScheme === 'light' ? '#166534' : '#b0f7c9',
        fontWeight: '600',
        fontSize: 14,
      }}
      text2Style={{
        color: colorScheme === 'light' ? '#166534' : '#b0f7c9',
      }}
    />
  )
}

const ErrorToast = (props: any) => {
  const colorScheme = useColorScheme()

  return (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 1,
        backgroundColor: colorScheme === 'light' ? '#FEF2F2' : '#3b1a1a', // soft red bg
        borderRadius: 50,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#FCA5A5', // red border
        width: '70%',
        minHeight: 40,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        color: colorScheme === 'light' ? '#991B1B' : '#FCA5A5',
        fontWeight: '600',
        fontSize: 14,
      }}
      text2Style={{
        color: colorScheme === 'light' ? '#991B1B' : '#FCA5A5',
      }}
    />
  )
}

export const toastConfig = {
  success: (props: any) => <SuccessToast {...props} />,
  error: (props: any) => <ErrorToast {...props} />,
}