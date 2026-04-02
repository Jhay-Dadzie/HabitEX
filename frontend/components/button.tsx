import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./themed-text";

type buttonProps = {
    buttonPlaceholder: string,
    action?: () => void
}
export default function Button({ buttonPlaceholder, action }: buttonProps) {
    const colorScheme = useColorScheme()
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={action} style={[styles.button, {backgroundColor: Colors[colorScheme ?? 'light'].tint}]}>
            <ThemedText style={styles.placeholderText}>{buttonPlaceholder}</ThemedText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        marginHorizontal: 20,
        borderRadius: 26,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 2},
        elevation: 5

    },

    placeholderText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 600
    }
    
})