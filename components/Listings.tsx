import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ListingType } from "@/types/listingType";
import Colors from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";

type Props = {
  listings: ListingType[];
  category: string;
  username: string;
};

const Listings = ({ listings, category, username }: Props) => {
  const [filteredListings, setFilteredListings] = useState<ListingType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const filtered = listings.filter((listing) => {
      if (category === "All") {
        return true;
      }
      return listing.category === category;
    });

    const filteredAndLoggedIn = filtered.filter((listing) => {
      if (!username) {
        return !listing.logged;
      } else {
        return true;
      }
    });

    setFilteredListings(filteredAndLoggedIn);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category, listings, username]);

  const renderItems: ListRenderItem<ListingType> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <Text style={styles.itemTxt} numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5
                  name="map-marker-alt"
                  size={18}
                  color={Colors.primaryColor}
                />
                <Text style={styles.itemLocationTxt}>{item.location}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View>
      <FlatList
        data={loading ? [] : filteredListings}
        renderItem={renderItems}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.white,
    padding: 5,
    borderRadius: 10,
    marginRight: 0,
    marginBottom: 20,
    width: 180,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 30,
  },
  itemTxt: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
  },
  itemLocationTxt: {
    fontSize: 12,
    marginLeft: 5,
  },
});
