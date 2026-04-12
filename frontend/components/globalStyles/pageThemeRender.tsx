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
            label: light ? '#334155' : Colors.dark.text,
            link: light ? Colors.light.contrastColor : Colors.dark.tint,
            secondaryBackground: light ? "#F8FAFC" : "#1E293B",
            iconContainer: light ? "#bcc5d2" : "#2c3d58"
        }
    )
}