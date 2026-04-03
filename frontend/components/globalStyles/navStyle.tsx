import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

export const useTabStyle = () => {
    const colorScheme = useColorScheme();

    return {
        headerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            borderBottomWidth: 1,
            borderBottomColor: colorScheme === 'dark' ? '#1E293B' : '#E2E8F0',
        },

        tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            borderTopWidth: 1,
            borderTopColor: colorScheme === 'dark' ? '#1E293B' : '#E2E8F0'
        }
    };
};
    