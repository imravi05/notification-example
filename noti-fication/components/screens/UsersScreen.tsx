import { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import api from 'api/api';
import { User } from 'types/custom';

export function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const getData = useCallback(async (replace: boolean = false) => {
    try {
      const data = await api.getAllUsers();

      if (replace) {
        setUsers(data);
      } else {
        setUsers((oldUsers) => {
          const combined = [...data, ...oldUsers];
          const uniqueMap = new Map();
          combined.forEach((u) => uniqueMap.set(u.id, u));
          return Array.from(uniqueMap.values());
        });
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }, []);

  useEffect(() => {
    getData(true); 
  }, [getData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getData(true); 
    setRefreshing(false);
  }, [getData]);

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={{ padding: 16, backgroundColor: 'white', flexGrow: 1 }}
      ListEmptyComponent={
        <Text className="text-center text-gray-500">No users found.</Text>
      }
      renderItem={({ item: user }) => (
        <View
          className="p-4 mb-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
          <Text className="text-lg font-semibold text-gray-800">{user.name}</Text>
          <Text className="text-sm text-gray-600">Email: {user.email}</Text>
          <Text className="text-sm text-gray-600">Country: {user.country}</Text>
          <Text className="text-sm text-gray-600">Gender: {user.gender}</Text>
        </View>
      )}
    />
  );
}
