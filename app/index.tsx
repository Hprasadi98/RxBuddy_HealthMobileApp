import {router } from "expo-router";
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Text,
  View,
} from "react-native";

export default function Start() {
  const handleStart1 = () => {
    router.push("/login");
  };

  const handleStart2 = () => {
    router.push("/register");
  };

  return (
    <ImageBackground
      source={require("./../assets/images/MediWall1.webp")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={{ marginVertical: 100, alignItems: "center" }}>
        <Text
          style={{
            color: "rgb(64, 64, 64)",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Welcome to,
        </Text>
        <Text
          style={{ color: "rgb(35, 35, 35)", fontSize: 64, fontWeight: "bold" }}
        >
          RxBuddy
        </Text>
        <View style={{ marginTop: 470 }}>
          <Text
            style={{
              color: "rgb(35, 35, 35)",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Let's start
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button1}
          onPress={handleStart1}
        >
          <Text
            style={{
              color: "rgb(255, 255, 255)",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={handleStart2}
        >
          <Text
            style={{
              color: "rgb(255, 255, 255)",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  button1: {
    width: "80%",
    height: 50,
    backgroundColor: "rgb(180, 125, 125)",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button2: {
    width: "80%",
    height: 50,
    backgroundColor: "rgb(135, 77, 77)",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
});
