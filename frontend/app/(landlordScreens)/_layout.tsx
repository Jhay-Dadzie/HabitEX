import { Tabs } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { useTabStyle } from "@/components/globalStyles/navStyle";
import { CircleUserRound, Landmark, LayoutDashboard, MessageSquare } from "lucide-react-native"

export default function Layout() {
    const colorScheme = useColorScheme();
    const tabStyle = useTabStyle();

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerStyle: tabStyle.headerStyle,
            tabBarStyle: tabStyle.tabBarStyle
        }}>
            <Tabs.Screen name="index" options={{
                title: "Dashboard",
                tabBarIcon: ({color}) => <LayoutDashboard size={24} color={color}/>
            }}/>
            <Tabs.Screen name="messages" options={{
                title: "Messages",
                tabBarIcon: ({color}) => <MessageSquare size={24} color={color}/>
            }}/>
            <Tabs.Screen name="listings" options={{
                title: "Listings",
                tabBarIcon: ({color}) => <Landmark size={24} color={color}/>
            }}/>
            <Tabs.Screen name="profile" options={{
                title: "Profile",
                tabBarIcon: ({color}) => <CircleUserRound size={24} color={color}/>
            }}/>
        </Tabs>
    )
}