import { useState, useContext } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { ClickCountContext } from "./ClickCountContext";
import { LinearGradient } from "expo-linear-gradient";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const { setUserEmail, setUserPassword, setYourName } =
    useContext(ClickCountContext);
  const router = useRouter();

  const handleSignUp = () => {
    setYourName(name);
    let isValid = true;
    const newErrors: { name?: string; email?: string; password?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setUserEmail(email);
      setUserPassword(password);
      console.log("Sign-up successful");
      router.push("/login");
    }
  };

  return (
    <ImageBackground
      source={require("./../assets/images/MediWall2.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(180, 125, 125, 0.1)", "rgba(180, 125, 125, 0.1)"]}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Text
            style={{
              color: "rgb(35, 35, 35)",
              fontSize: 64,
              fontWeight: "bold",
            }}
          >
            Register
          </Text>
          <View
            style={{
              backgroundColor: "rgb(206, 185, 185)",
              height: 700,
              width: 440,
              borderTopLeftRadius: 200,
              borderBottomRightRadius: 200,
              paddingTop: 100,
              alignItems: "center",
              marginTop: 55,
              borderColor: "rgb(255, 255, 255)",
              borderWidth: 5,
            }}
          >
            <Text style={styles.headerText}>Create a New Account</Text>
            <TextInput
              placeholder="Name"
              placeholderTextColor="rgb(180, 125, 125)"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
              placeholder="Email"
              placeholderTextColor="rgb(180, 125, 125)"
              keyboardType="email-address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              placeholder="Password"
              placeholderTextColor="rgb(180, 125, 125)"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Link href="/login" style={styles.linkText}>
                Login
              </Link>
            </Text>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  innerContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    backgroundColor: "rgba(0, 0, 0)",
  },
  headerText: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: "bold",
    color: "rgb(135, 77, 77)",
    marginBottom: 30,
    textAlign: "left",
    alignSelf: "center",
  },
  input: {
    width: "80%",
    height: 55,
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 100,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "rgb(135, 77, 77)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "rgb(135, 77, 77)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  footerText: {
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
    marginTop: 20,
  },
  linkText: {
    color: "rgb(135, 77, 77)",
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF6347",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 10,
    marginLeft: 50,
  },
});
