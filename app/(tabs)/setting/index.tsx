import AuthRoute from "@/components/AuthRoute";
import ListItem from "@/components/ListItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingScreen() {
  return (
    <AuthRoute>
      <SafeAreaView>
        <View style={styles.container}>
          <ListItem
            title="언어 설정"
            icon={<Ionicons name="language" size={20} />}
          />
          <ListItem
            title="앱 설정"
            icon={<Ionicons name="settings" size={20} />}
          />
        </View>
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
