
import { Platform } from 'react-native';

const tintColorLight = '#241A7F';
const tintColorDark = '#1A247F';

export const Colors = {
  light: {
    text: '#64748B',
    background: '#fff',
    tint: tintColorLight,
    icon: '#94A3B8',
    tabIconDefault: '#94A3B8',
    tabIconSelected: tintColorLight,
    complementaryColor: '#0F172A'
  },
  dark: {
    text: '#94A3B8',
    background: '#0F172A',
    tint: tintColorDark,
    icon: '#64748B',
    tabIconDefault: '#64748B',
    tabIconSelected: tintColorDark,
    complementaryColor: '#F1F5F9'
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'inter',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
