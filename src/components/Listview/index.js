import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import {
  kApiPostFav,
  kApiGetFav,
  kApiDelFav,
  kApiGetVotes,
  kApiPostVote,
  kApiDelVote,
} from "../../config/WebService";
import { ApiHelper } from "../../helpers";

const Listview = ({ data }) => {
  const [favorite, setFavorite] = useState([]);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    ApiHelper.get(kApiGetFav)
      .then((response) => {
        setFavorite(response.data);
      })
      .catch((err) => {});

    ApiHelper.get(kApiGetVotes)
      .then((response) => {
        const voteCounts = response.data.reduce((acc, vote) => {
          acc[vote.image_id] = (acc[vote.image_id] || 0) + vote.value;
          return acc;
        }, {});
        setVotes(voteCounts); // Set initial vote counts based on the vote list
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleVote = (imageId, voteValue) => {
    const currentVoteValue = votes[imageId] || 0; // Current vote count

    // Calculate the new vote value
    const newVoteValue = currentVoteValue + voteValue;

    ApiHelper.post(kApiPostVote, { image_id: imageId, value: newVoteValue })
      .then((response) => {
        if (response.data.message === "SUCCESS") {
          setVotes((prevVotes) => ({
            ...prevVotes,
            [imageId]: newVoteValue, // Update the vote count
          }));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const renderItem = ({ item }) => {
    const favItem = favorite.find((fav) => fav.image_id === item.id);
    const isFav = !!favItem;
    const voteCount = votes[item.id] || 0;

    const handleFavoriteToggle = () => {
      if (isFav) {
        ApiHelper.delete(kApiDelFav(favItem.id))
          .then((response) => {
            if (response.data.message === "SUCCESS") {
              setFavorite((prevFavs) =>
                prevFavs.filter((fav) => fav.id !== favItem.id)
              );
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        ApiHelper.post(kApiPostFav, { image_id: item.id })
          .then((response) => {
            if (response.data.message === "SUCCESS") {
              setFavorite((prevFavs) => [
                ...prevFavs,
                {
                  image_id: item.id,
                  image: { id: item.id, url: item.url },
                },
                { id: response.data.id },
              ]);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };

    return (
      <View style={styles.imageContainer}>
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: item.url }}
            style={styles.image}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={{ position: "absolute", right: 10, top: 10 }}
            onPress={handleFavoriteToggle}
          >
            <Ionicons
              name={isFav ? "heart" : "heart-outline"}
              size={32}
              color={isFav ? "red" : "gray"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.voteContainer}>
          <TouchableOpacity onPress={() => handleVote(item.id, 1)}>
            <Ionicons name="arrow-up" size={24} color="green" />
          </TouchableOpacity>
          <Text style={styles.voteCount}>{voteCount}</Text>
          <TouchableOpacity onPress={() => handleVote(item.id, -1)}>
            <Ionicons name="arrow-down" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (data && data.length > 0) {
    return (
      <View style={styles.list}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={4}
        />
      </View>
    );
  }

  return null;
};

export default Listview;
