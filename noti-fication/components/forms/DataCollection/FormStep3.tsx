import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Controller } from 'react-hook-form';

type Props = {
  control: any;
  errors: any;
  countries: string[];
  genders: string[];
};

const FormStep3 = ({ control, errors, countries, genders }: Props) => (
  <>
    <Text className="mb-1 text-lg font-semibold">Country</Text>
    <Controller
      control={control}
      name="country"
      rules={{ required: 'Country is required' }}
      render={({ field: { onChange, value } }) => (
        <View className="mb-2 border border-gray-300 rounded">
          <Picker selectedValue={value} onValueChange={onChange} className="h-12">
            <Picker.Item label="Select a country" value="" />
            {countries.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
        </View>
      )}
    />
    {errors.country && <Text className="mb-2 text-red-500">{errors.country.message}</Text>}

    <Text className="mb-1 text-lg font-semibold">Gender</Text>
    <Controller
      control={control}
      name="gender"
      rules={{ required: 'Gender is required' }}
      render={({ field: { onChange, value } }) => (
        <View className="mb-2 border border-gray-300 rounded">
          <Picker selectedValue={value} onValueChange={onChange} className="h-12">
            <Picker.Item label="Select gender" value="" />
            {genders.map((g) => (
              <Picker.Item key={g} label={g} value={g} />
            ))}
          </Picker>
        </View>
      )}
    />
    {errors.gender && <Text className="text-red-500">{errors.gender.message}</Text>}
  </>
);

export default FormStep3;
