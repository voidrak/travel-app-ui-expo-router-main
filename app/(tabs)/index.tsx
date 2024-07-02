import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

import CategoryButtons from "@/components/CategoryButtons";
import Listings from "@/components/Listings";
import listingData from "@/data/destinations.json";

const Page = () => {
  const [category, setCategory] = useState("All");
  const [currentUser, setCurrentUser] = useState("");
  const router = useRouter();
  const { username } = useLocalSearchParams();

  const onCatChanged = (category: string) => {
    setCategory(category);
  };
  useEffect(() => {
    if (typeof username === "string") {
      setCurrentUser(username);
    } else if (Array.isArray(username) && username.length > 0) {
      setCurrentUser(username[0]);
    } else {
      setCurrentUser(" ");
    }
  }, [username]);

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/login/login",
                  params: { currentUser },
                });
              }}
              style={{}}
            >
              <Ionicons
                name="person"
                size={24}
                color={Colors.white}
                style={{
                  marginRight: 20,
                  marginTop: 70,
                  padding: 10,
                  borderRadius: 50,
                  backgroundColor: "#1E2330",
                }}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: Colors.primaryColor,
                }}
              >
                {username ? username : "Login"}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={[styles.container, { paddingTop: 20 }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.headingTxt}>Embark</Text>
          <Text style={styles.subHeader}>on an Adventure</Text>

          <View style={styles.searchSectionWrapper}>
            <View style={styles.searchBar}>
              <Ionicons
                name="search"
                size={18}
                style={{ marginRight: 5 }}
                color={Colors.black}
              />
              <TextInput placeholder="Search..." />
            </View>
          </View>

          <CategoryButtons onCagtegoryChanged={onCatChanged} />

          <Listings
            listings={listingData}
            category={category}
            username={currentUser}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.bgColor,
  },
  headingTxt: {
    fontSize: 32,
    fontWeight: "800",
    color: Colors.black,
    marginTop: 10,
  },

  subHeader: {
    fontSize: 30,
    fontWeight: "500",
    color: Colors.black,
  },
  searchSectionWrapper: {
    flexDirection: "row",
    marginVertical: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
  },
  filterBtn: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    borderRadius: 10,
    marginLeft: 20,
  },
});
