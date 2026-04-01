import { Tabs } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { useTabStyle } from "@/components/globalStyles/navStyle";
import { Ionicons } from "@expo/vector-icons"
import { CircleUserRound, Heart, House, MessageSquare } from "lucide-react-native"

export default function Layout() {
    const colorScheme = useColorScheme();
    const navStyle = useTabStyle();

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerStyle: navStyle.headerStyle,
            tabBarStyle: navStyle.tabBarStyle,
            
        }}>
            <Tabs.Screen name="index" options={{
                title: "Home",
                tabBarIcon: ({color}) => <House size={24} color={color}/>
            }}/>
            <Tabs.Screen name="search" options={{
                title: "Search",
                tabBarIcon: ({color}) => <Ionicons name="search" size={24} color={color}/>
            }}/>
            <Tabs.Screen name="wishlist" options={{
                title: "Wishlist",
                tabBarIcon: ({color}) => <Heart size={24} color={color}/>
            }}/>
            <Tabs.Screen name="messages" options={{
                title: "Messages",
                tabBarIcon: ({color}) => <MessageSquare size={24} color={color}/>
            }}/>
            <Tabs.Screen name="profile" options={{
                title: "Profile",
                tabBarIcon: ({color}) => <CircleUserRound size={24} color={color}/>
            }}/>
        </Tabs>
    )
}