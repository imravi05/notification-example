import { TextInput, Text } from 'react-native';
import { Controller } from 'react-hook-form';

type Props = {
  control: any;
  errors: any;
};

const FormStep1 = ({ control, errors }: Props) => (
  <>
    <Text className="mb-1 text-lg font-semibold">Full Name</Text>
    <Controller
      control={control}
      name="name"
      rules={{ required: 'Name is required' }}
      render={({ field: { onChange, value } }) => (
        <TextInput
          className="p-3 mb-1 border border-gray-300 rounded-lg"
          onChangeText={onChange}
          value={value}
          placeholder="Enter your name"
        />
      )}
    />
    {errors.name && <Text className="mb-2 text-red-500">{errors.name.message}</Text>}

    <Text className="mt-4 mb-1 text-lg font-semibold">Email</Text>
    <Controller
      control={control}
      name="email"
      rules={{
        required: 'Email is required',
        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
      }}
      render={({ field: { onChange, value } }) => (
        <TextInput
          className="p-3 mb-1 border border-gray-300 rounded-lg"
          onChangeText={onChange}
          value={value}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      )}
    />
    {errors.email && <Text className="mb-2 text-red-500">{errors.email.message}</Text>}
  </>
);

export default FormStep1;
