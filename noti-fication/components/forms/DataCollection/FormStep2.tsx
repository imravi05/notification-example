import { TextInput, Text } from 'react-native';
import { Controller } from 'react-hook-form';

type Props = {
  control: any;
  errors: any;
};

const FormStep2 = ({ control, errors }: Props) => (
  <>
    <Text className="mb-1 text-lg font-semibold">Password</Text>
    <Controller
      control={control}
      name="password"
      rules={{ required: 'Password is required' }}
      render={({ field: { onChange, value } }) => (
        <TextInput
          className="p-3 mb-1 border border-gray-300 rounded"
          secureTextEntry
          onChangeText={onChange}
          value={value}
          placeholder="Enter your password"
        />
      )}
    />
    {errors.password && <Text className="mb-2 text-red-500">{errors.password.message}</Text>}
  </>
);

export default FormStep2;
