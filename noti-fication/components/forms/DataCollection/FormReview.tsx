import React from 'react';
import { View, Text } from 'react-native';
import { FormData } from './Form';

type Props = {
  values: FormData;
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <View className="mb-3">
    <Text className="font-semibold text-gray-800">{label}</Text>
    <Text className="text-gray-600">{value || '-'}</Text>
  </View>
);

const FormReview: React.FC<Props> = ({ values }) => {
  return (
    <View className="p-4">
      <Text className="mb-4 text-lg font-bold text-gray-900">Review Your Details</Text>

      <Row label="Name" value={values.name} />
      <Row label="Email" value={values.email} />
      <Row label="Password" value={values.password ? '••••••••' : ''} />
      <Row label="Country" value={values.country} />
      <Row label="Gender" value={values.gender} />
    </View>
  );
};

export default FormReview;
