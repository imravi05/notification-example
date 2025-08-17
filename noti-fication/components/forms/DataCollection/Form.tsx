import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Alert, Modal } from 'react-native';
import { useForm } from 'react-hook-form';
import Ionicons from '@react-native-vector-icons/ionicons';

import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';
import FormReview from './FormReview';
import { navigate } from '../../../navigation/RootNavigation';
import api from 'api/api';

export type FormData = {
  name: string;
  email: string;
  password: string;
  country: string;
  gender: string;
};

const countries = ['USA', 'Canada', 'UK', 'India'];
const genders = ['Male', 'Female', 'Other'];

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [showReview, setShowReview] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      country: '',
      gender: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    await api.saveUserData(data);
    Alert.alert('Success', 'Form Submitted!');
    navigate('MainTabs');
  };

  const handlePrevious = () => {
    setStep(Math.max(step - 1, 1));
  };

  const handleNext = async () => {
    let valid = false;

    if (step === 1) {
      valid = await trigger(['name', 'email']);
    } else if (step === 2) {
      valid = await trigger('password');
    } else if (step === 3) {
      valid = await trigger(['country', 'gender']);
    }

    if (valid) {
      if (step === 3) {
        setShowReview(true);
      } else {
        setStep(step + 1);
      }
    }
  };

  const handleFinalSubmit = async () => {
    const valid = await trigger();
    if (valid) {
      await handleSubmit(onSubmit)();
      setShowReview(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <FormStep1 control={control} errors={errors} />;
      case 2:
        return <FormStep2 control={control} errors={errors} />;
      case 3:
        return (
          <FormStep3 control={control} errors={errors} countries={countries} genders={genders} />
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView className="flex-grow px-6 py-8 bg-white">
      {renderStep()}

      <View className="flex-row justify-between gap-2 mt-4">
        {step > 1 && (
          <TouchableOpacity
            onPress={handlePrevious}
            className="flex items-center w-1/2 py-3 bg-gray-200 rounded">
            <Text className="font-semibold text-center text-gray-600">
              <Ionicons name="chevron-back" size={16} color="#4B5563" /> Back
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={handleNext}
          className={`flex items-center rounded py-3 
    ${step === 1 ? 'w-full' : 'w-1/2'} 
    ${step !== 3 ? 'bg-gray-200' : 'bg-green-600'}`}>
          <View className="flex-row items-center space-x-2">
            <Text
              className={`text-center font-semibold ${step !== 3 ? 'text-gray-600' : 'text-white'}`}>
              {step < 3 ? 'Next' : 'Submit'}
            </Text>
            {step < 3 && <Ionicons name="chevron-forward" size={16} color="#4B5563" />}
          </View>
        </TouchableOpacity>
      </View>

      <Modal visible={showReview} animationType="slide" transparent={true}>
        <View className="justify-center flex-1 px-6 bg-black/50">
          <View className="p-6 bg-white shadow-lg rounded-2xl">
            <FormReview values={getValues()} />

            <View className="flex-row justify-between gap-1 mt-6 ">
              <TouchableOpacity
                onPress={() => setShowReview(false)}
                className="w-1/2 py-3 bg-gray-300 rounded-lg">
                <Text className="font-semibold text-center text-gray-700">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleFinalSubmit}
                className="w-1/2 py-3 bg-green-600 rounded-lg">
                <Text className="font-semibold text-center text-white">Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default MultiStepForm;
