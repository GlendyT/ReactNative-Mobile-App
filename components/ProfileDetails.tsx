import { Text, View } from "react-native";

interface ProfileDetailsProps {
  title: string;
  subtitle: string | number | undefined;
}

const Profiledetails = ({ title, subtitle }: ProfileDetailsProps) => {
  return (
    <View className="flex flex-col items-start w-full py-4 border-b border-gray-600  ">
      <Text className="text-white text-2xl"> {title} </Text>
      <Text className="text-gray-400 text-xl px-1 ">{subtitle} </Text>
    </View>
  );
};

export default Profiledetails;
