import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'description' | 'defaultSemiBold' | 'price' | 'subtitle' | 'link' | 'placeholderText';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'description' ? styles.description : undefined,
        type === 'price' ? styles.price : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'placeholderText' ? styles.placeholderText : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  description: {
    fontSize: 18,
    lineHeight: 24,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 17,
    fontWeight: 600
  },
  placeholderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 600
  },
});
