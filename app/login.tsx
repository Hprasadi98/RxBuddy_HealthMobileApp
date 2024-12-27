import { useState, useContext } from "react";
import { Link, useRouter } from "expo-router";
import { Linking } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ClickCountContext } from "./ClickCountContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { userEmail, userPassword, setIsAuthenticated } =
    useContext(ClickCountContext);
  const router = useRouter();

  const handleLogin = () => {
    let formValid = true;
    const newErrors: { email: string; password: string } = {
      email: "",
      password: "",
    };

    const sanitizedEmail = email.trim();
    if (!sanitizedEmail) {
      newErrors.email = "Email is required";
      formValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      newErrors.email = "Email address is invalid";
      formValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      formValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      formValid = false;
    }

    setErrors(newErrors);

    if (formValid) {
      if (email === userEmail && password === userPassword) {
        setIsAuthenticated(true);
        console.log("Login successful");
        router.push("/home");
      } else {
        setErrors({ ...newErrors, password: "Invalid credentials" });
      }
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
            Login
          </Text>
          <View
            style={{
              backgroundColor: "rgb(206, 185, 185)",
              height: 700,
              width: 440,
              borderTopLeftRadius: 200,
              borderBottomRightRadius:200,
              paddingTop: 100,
              alignItems: "center",
              marginTop:55,
              borderColor: "rgb(255, 255, 255)",
              borderWidth: 5,
            }}
          >
            <Text style={styles.headerText}>Hello, Sign in!</Text>
            <TextInput
              placeholder="Gmail"
              placeholderTextColor="rgb(180, 125, 125)"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            {/* Password Input */}
            <TextInput
              placeholder="Password"
              placeholderTextColor="rgb(180, 125, 125)"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotContainer}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>
                Don't have an account?{" "}
                <Link href="/register" style={styles.linkText}>
                  Register
                </Link>
              </Text>
            </View>
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
    marginTop:50,
    justifyContent: "center",
    alignItems: "center",
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
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotContainer: {
    marginRight:50,
    alignSelf: "flex-end",
  },
  forgotText: {
    color: "rgb(255, 255, 255)",
    fontSize: 14,
    marginBottom: 10,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    color: "rgb(255, 255, 255)",
    fontSize: 14,
  },
  signUpText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 14,
  },
  errorText: {
    color: "#FF6347",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 10,
    marginLeft: 50,
  },
  linkText: {
    color: "rgb(135, 77, 77)",
    fontWeight: "bold",
  },
});
