import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

export default function usePageThemeRender() {
    const colorScheme = useColorScheme()
    const light = colorScheme === 'light'

    return (
        {
            oppositeTextColor:  light ? Colors.light.contrastColor : Colors.dark.contrastColor,
            borderColor: light ? Colors.light.borderColor : Colors.dark.borderColor,
            fontColor: light ? Colors.light.text : Colors.dark.text,
            secondaryFontColor: light ? '#334155' : '#CBD5E1',
            label: light ? '#334155' : Colors.dark.text,
            link: light ? Colors.light.contrastColor : Colors.dark.tint,
            secondaryBackground: light ? "#F8FAFC" : "#1E293B",
            icon: light ? Colors.light.icon : Colors.dark.icon,
            iconContainer: light ? "#bcc5d2" : "#2c3d58",
            tipsBackground: light ? '#F0FDF4' : '#626764',
            tipsTextColor: light ? '#166534' : '#10B981',
        }
    )
}