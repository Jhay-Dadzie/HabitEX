import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

export default function usePageStyles() {
    const colorScheme = useColorScheme()
    const light = colorScheme === 'light'

    return (
        {
            oppositeTextColor:  light ? Colors.light.contrastColor : Colors.dark.contrastColor,
            borderColor: light ? Colors.light.borderColor : Colors.dark.borderColor,
            
        }
    )
}