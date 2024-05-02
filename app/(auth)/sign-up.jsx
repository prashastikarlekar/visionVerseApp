/** @format */

import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
	const { setUser, setIsLoggedIn } = useGlobalContext();
	const [form, setForm] = useState({ username: "", email: "", password: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const submit = async () => {
		if (!form.username || !form.email || !form.password) {
			Alert.alert("Error", "Please fill all the fields");
		}
		setIsSubmitting(true);

		try {
			const result = await createUser(form.email, form.password, form.username);
			setUser(result);
			setIsLoggedIn(true);
			router.replace("/home");
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<SafeAreaView className='bg-primary h-full'>
			<ScrollView>
				<View className='w-full min-h-[85vh] justify-center px-4 my-6'>
					{/* <Image
						source={images.logo}
						resizeMode='contain'
						className='w-[115px] h-[35px]'
					/> */}
					<View className='flex-row items-center'>
						<Image
							source={images.logo_2}
							resizeMode='contain'
							className='w-[40px] h-[35px]'
						/>
						<Text className='text-white font-pbold text-3xl justify-center items-center'>
							VisionVerse
						</Text>
					</View>
					<Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
						Sign Up to VisionVerse
					</Text>
					<FormField
						title='Username'
						value={form.username}
						handleChangeText={(e) => setForm({ ...form, username: e })}
						otherStyles='mt-10'
					/>
					<FormField
						title='Email'
						value={form.email}
						handleChangeText={(e) => setForm({ ...form, email: e })}
						otherStyles='mt-7'
						keyboardType='email-address'
					/>
					<FormField
						title='Password'
						value={form.password}
						handleChangeText={(e) => setForm({ ...form, password: e })}
						otherStyles='mt-7'
					/>
					<CustomButton
						title='Sign Up'
						handlePress={submit}
						containerStyles={"mt-7"}
						isLoading={isSubmitting}
					/>
					<View className='justify-center pt-5 flex-row'>
						<Text className='text-lg text-gray-100 font-pregular'>
							Have an account already?{" "}
						</Text>
						<Link
							className='text-lg font-psemibold text-secondary'
							href='/sign-in'>
							Sign In
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUp;
