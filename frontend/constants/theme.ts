
import { Platform } from 'react-native';

const tintColorLight = '#241A7F';
const tintColorDark = '#6366F1';

export const Colors = {
  light: {
    text: '#64748B',
    background: '#F6F6F8',
    tint: tintColorLight,
    icon: '#94A3B8',
    tabIconDefault: '#94A3B8',
    tabIconSelected: tintColorLight,
    complementaryColor: tintColorLight,
    contrastColor: '#0F172A',
    borderColor: '#E2E8F0'
  },
  dark: {
    text: '#94A3B8',
    background: '#0F172A',
    tint: tintColorDark,
    icon: '#64748B',
    tabIconDefault: '#64748B',
    tabIconSelected: tintColorDark,
    complementaryColor: tintColorDark,
    contrastColor: '#fff',
    borderColor: '#1E293B'
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
