import { Stack } from "expo-router";
import { useTabStyle } from "@/components/globalStyles/navStyle";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function LandlordAuthLayout() {
    const colorScheme = useColorScheme()
    const tabStyle = useTabStyle()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors[colorScheme ?? 'light'].background }}>
            <Stack screenOptions={{
                headerStyle: tabStyle.headerStyle,
                headerTitleAlign: 'center'
            }}>
                <Stack.Screen name="index" options={{
                    headerTitle: "Sign Up",
                    headerBackVisible: false
                }} />
                <Stack.Screen name="cardIdentity" options={{
                    headerTitle: "Verification"
                }} />
                <Stack.Screen name="identityVerification" options={{
                    headerTitle: "Identity Verification"
                }} />
                <Stack.Screen name="ownershipProof" options={{
                    headerTitle: "Proof of Ownership"
                }} />
            </Stack>
        </SafeAreaView>
    )
}