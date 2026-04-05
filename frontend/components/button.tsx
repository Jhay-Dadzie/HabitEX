import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { useState } from "react";

type buttonProps = {
    children: React.ReactNode,
    action?: () => void
}
export default function Button({ children, action }: buttonProps) {
    const colorScheme = useColorScheme()
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={action} style={[styles.button, {backgroundColor: Colors[colorScheme ?? 'light'].tint}]}>
            <View style={styles.childrenStyle}>{children}</View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        borderRadius: 28,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 2},
        elevation: 5

    },

    childrenStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
        
        
    }
    
})