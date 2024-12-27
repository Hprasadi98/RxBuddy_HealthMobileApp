import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { ClickCountContext } from "./ClickCountContext";

type Product = {
  country: string;
  flag: string;
  deaths: string | string;
  population: number | string;
  recovered: string | string;
  status: string;
};

export default function Home() {
  const { clickCount, setClickCount, yourName } = useContext(ClickCountContext);
  console.log(yourName);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const fetchFlag = async (countryName: string) => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      const data = await response.json();
      return data[0]?.flags?.png || "https://via.placeholder.com/150";
    } catch (error) {
      console.error("Error fetching flag:", error);
      return "https://via.placeholder.com/150";
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://covid-193.p.rapidapi.com/statistics",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "64551304bcmsh0e738bf6225baa6p1cfc70jsn8573234b08fd", // Replace with your RapidAPI key
              "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
            },
          }
        );
        const data = await response.json();
        console.log(data);

        const transformedProducts = await Promise.all(
          data.response.map(async (item: any) => {
            const population = item.population || 1; // Avoid division by zero
            const deaths = item.deaths?.total || 0;
            const recovered = item.cases?.recovered || 0;

            let status = "Safe";
            const deathRate = deaths / population;
            const recoveryRate = recovered / population;

            if (deathRate > 0.01) {
              status = "Dangerous"; // More than 1% death rate
            } else if (deathRate > 0.005 || recoveryRate < 0.7) {
              status = "Average"; // Moderate risk
            }
            return {
              country: item.country,
              flag: await fetchFlag(item.country),
              deaths: item.deaths?.total || "N/A",
              population: item.population || "N/A",
              recovered: item.cases?.recovered || "N/A",
              status,
            };
          })
        );

        setProducts(transformedProducts);
        setFilteredProducts(transformedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filteredData = products.filter((product) =>
        product.country.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filteredData);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleItemClick = () => {
    setClickCount(clickCount + 1);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Hi, {yourName} 👋</Text>
      </View>

      <View style={styles.headingview}>
        <Text style={styles.headingtext}>Global Spread of COVID-19</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search country..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.country}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={handleItemClick}>
            <Image source={{ uri: item.flag }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.country}</Text>
            <Text style={styles.cardDescription}>
              Population: {item.population}
            </Text>
            <Text style={styles.cardDescription}>
              Recovered: {item.recovered}
            </Text>
            <Text style={styles.cardDescription}>Deaths: {item.deaths}</Text>
            <Text style={styles.cardDescription}>
              Current status:{" "}
              <Text
                style={[
                  styles.statusTag,
                  item.status === "Dangerous"
                    ? { color: "red" }
                    : item.status === "Average"
                    ? { color: "orange" }
                    : { color: "green" },
                ]}
              >
                {item.status}
              </Text>
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>{clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    height: 80,
    backgroundColor: "rgb(135, 77, 77)",
    justifyContent: "center",
    alignItems: "center",
  },
  headingview: {
    marginTop: 20,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  topBarText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  headingtext: {
    color: "rgb(135, 77, 77)",
    fontSize: 18,
    fontWeight: "bold",
  },
  searchBar: {
    marginTop: 10,
    marginHorizontal: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgb(135, 77, 77)",
    borderRadius: 5,
    fontSize: 16,
  },
  card: {
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    marginEnd: 35,
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  cardImage: {
    height: 200,
    width: "100%",
    alignSelf: "center",
  },
  cardContent: {
    padding: 0,
  },
  cardTitle: {
    fontSize: 18,
    alignSelf: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
    marginLeft: 10,
  },
  statusTag: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginTop: 5,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "rgb(135, 77, 77)",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "rgb(135, 77, 77)",
  },
});
