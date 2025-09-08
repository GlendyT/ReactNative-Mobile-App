import RenderList from "@/components/RenderList";
import TvCard from "@/components/TvCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchFavoriteTVShows } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const FavoriteTVShows = () => {
  const {
    data: series,
    loading: seriesLoading,
    error: seriesError,
  } = useFetch(() => fetchFavoriteTVShows());

  return (
    <View className="bg-primary flex-1 ">
      <Image source={images.bg} className="flex-1 absolute w-full z-0" />
      <View className="w-full flex-row justify-center mt-20">
        <Image source={icons.logo} className="w-12 h-10" />
      </View>
      <View className="my-5">
        <Text className="text-white text-2xl font-bold text-center">
          Favorite TV Shows
        </Text>
      </View>
      <RenderList
        data={series || []}
        loadingError={seriesLoading}
        dataError={seriesError}
        renderCard={(item) => <TvCard {...item} />}
      />
      <TouchableOpacity
        className="absolute bottom-10 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FavoriteTVShows;
