import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
import { useNotifications } from 'hooks/useNotifications';
import { navigate } from '../../navigation/RootNavigation';
import { CustomNotification } from 'types/custom';

const NotificationListener = () => {
  const { notifications, markAsRead, fetchNotifications } = useNotifications();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<CustomNotification | null>(null);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await fetchNotifications();
    } finally {
      setRefreshing(false);
    }
  }, [fetchNotifications]);

  const handlePress = async (item: CustomNotification) => {
    await markAsRead(item.id);

    if (item.type === 'normal') {
      setSelectedNotification(item);
    }
  };

  const fillForm = (id: number) => {
    navigate('DataCollectionForm');
  };

  return (
    <>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <View className="items-center justify-center flex-1 py-10">
            <Text className="text-2xl text-gray-500">No notifications yet 🚀</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            className={`m-2 rounded-xl border-l-8 p-4 shadow-sm ${
              item.read ? 'border-gray-600 bg-gray-200' : 'border-green-600 bg-white'
            }`}>
            <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
            <Text className="text-sm text-gray-600">{item.description}</Text>

            {item.type === 'form' && (
              <TouchableOpacity
                className="mt-4 max-w-[100px] rounded-full border border-gray-300 bg-gray-100 px-4 py-2"
                onPress={() => fillForm(item.id)}>
                <Text className="text-sm text-center text-black">Fill Form</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
      />

      {/* Modal for normal notifications */}
      <Modal
        visible={!!selectedNotification}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedNotification(null)}>
        <View className="items-center justify-center flex-1 px-6 bg-black/50">
          <View className="w-full p-6 bg-white shadow-lg rounded-2xl">
            <Text className="mb-2 text-lg font-bold text-gray-900">Title:</Text>
            <Text className="mb-4 text-base text-gray-800">{selectedNotification?.title}</Text>

            <Text className="mb-2 text-lg font-bold text-gray-900">Data:</Text>
            <Text className="text-base text-gray-700">{selectedNotification?.description}</Text>

            <TouchableOpacity
              onPress={() => setSelectedNotification(null)}
              className="px-4 py-2 mt-6 bg-green-600 rounded-xl">
              <Text className="font-semibold text-center text-white">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default NotificationListener;
