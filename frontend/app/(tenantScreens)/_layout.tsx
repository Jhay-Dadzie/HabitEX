import { Tabs } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons"
import { CircleUserRound, Heart, House, MessageSquare } from "lucide-react-native"

export default function Layout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerStyle: {
                backgroundColor: Colors[colorScheme ?? 'light'].background,
                borderBottomWidth: 1,
                borderBottomColor: colorScheme === 'dark' ? '#1E293B' : '#E2E8F0'
            },
            tabBarStyle: {
                backgroundColor: Colors[colorScheme ?? 'light'].background,
                borderTopWidth: 1,
                borderTopColor: colorScheme === 'dark' ? '#1E293B' : '#E2E8F0'
            }
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