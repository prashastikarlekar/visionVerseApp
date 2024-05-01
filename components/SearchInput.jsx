/** @format */

import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";
import { router, usePathname } from "expo-router";
const SearchInput = ({ initalQuery }) => {
	const pathname = usePathname();
	const [query, setQuery] = useState(initalQuery || "");

	return (
		<View className='w-full h-16 bg-black-200 px-4 border-2  rounded-2xl focus:border-secondary items-center flex-row space-x-4'>
			<TextInput
				className='mt-0.5 text-white flex-1 font-pregular text-base'
				value={query}
				placeholder='Search for a video topic'
				placeholderTextColor='#CDCDE0'
				onChangeText={(e) => setQuery(e)}
			/>
			<TouchableOpacity
				onPress={() => {
					if (!query) {
						return Alert.alert("Missing Query", "Please enter a search query");
					}
					if (pathname.startsWith("/search")) {
						router.setParams({ query });
					} else router.push(`/search/${query}`);
				}}>
				<Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
			</TouchableOpacity>
		</View>
	);
};

export default SearchInput;
