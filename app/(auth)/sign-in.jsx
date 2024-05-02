/** @format */

import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

const SignIn = () => {
	const { setUser, setIsLoggedIn } = useGlobalContext();
	const [form, setForm] = useState({ email: "", password: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const submit = async () => {
		if (!form.email || !form.password) {
			Alert.alert("Error", "Please fill all the fields");
		}
		setIsSubmitting(true);

		try {
			await signIn(form.email, form.password);
			const result = await getCurrentUser();
			setUser(result);
			setIsLoggedIn(true);

			// Alert.alert("Success", "Logged in successfully");
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
						Log in to VisionVerse
					</Text>
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
						title='Sign In'
						handlePress={submit}
						containerStyles={"mt-7"}
						isLoading={isSubmitting}
					/>
					<View className='justify-center pt-5 flex-row'>
						<Text className='text-lg text-gray-100 font-pregular'>
							Don't have an account?{" "}
						</Text>
						<Link
							className='text-lg font-psemibold text-secondary'
							href='/sign-up'>
							Sign Up
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
