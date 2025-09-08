import Profiledetails from "@/components/ProfileDetails";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  fetchFavoriteMovies,
  fetchFavoriteTVShows,
  fetchLists,
  fetchProfile
} from "@/services/api";
import useFetch from "@/services/useFetch";
import { Link } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface FavoriteProps {
  id: number;
  name: string;
  fetch: any;
  route: string;
  image: string;
}

const Profile = () => {
  const { data: profile } = useFetch(() => fetchProfile());
  const { data: favorites } = useFetch(() => fetchFavoriteMovies());
  const { data: series } = useFetch(() => fetchFavoriteTVShows());
  const { data: list } = useFetch(() => fetchLists());

  const favorite: FavoriteProps[] = [
    {
      id: 1,
      name: "Movies",
      fetch: favorites?.results || [],
      route: "/favoritemovies",
      image: icons.film,
    },
    {
      id: 2,
      name: "Series",
      fetch: series || [],
      route: "/favoritetvshows",
      image: icons.serie,
    },
    {
      id: 3,
      name: " Lists",
      fetch: list?.results || [],
      route: "/lists",
      image: icons.list,
    },
  ];

  return (
    <View className="bg-primary flex-1  ">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className=" px-5 fixed backdrop-blur-lg bg-black/80 border-b border-gray-600 pb-6">
        <View className="flex flex-row items-center mt-20 sticky">
          <Text className="text-white text-6xl flex-1 items-center justify-center">
            {profile?.username}
          </Text>
          <Image
            source={{
              uri: `https://media.themoviedb.org/t/p/w300_and_h300_face${profile?.avatar?.tmdb?.avatar_path}`,
            }}
            className="w-12 h-12  rounded-full"
          />
        </View>
      </View>

      <View className="px-5 mt-6 flex-row items-center justify-between">
        {favorite.map((item) => (
          <Link
            href={item.route as any}
            asChild
            key={item.id}
            className="w-auto"
          >
            <TouchableOpacity className="bg-gray-300 px-6 py-3 rounded-lg  items-center">
              <Image source={item.image as any} className="w-16 h-16  " />
              <Text className="text-black text-lg">{item.name}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
      <ScrollView className="px-5 mt-10 flex-1 ">
        <Text className="text-white text-2xl font-extrabold text-center">
          Account Info
        </Text>
        <Profiledetails title="User" subtitle={profile?.username} />
        <Profiledetails title="Name" subtitle={profile?.name} />
        <Profiledetails title="Language" subtitle={profile?.iso_639_1} />
        <Profiledetails title="Country" subtitle={profile?.iso_3166_1} />
        
      </ScrollView>

    </View>
  );
};

export default Profile;
