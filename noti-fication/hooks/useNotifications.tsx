// NotificationsProvider.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';
import Toast from 'react-native-toast-message';
import { navigate } from '../navigation/RootNavigation';
import { CustomNotification } from 'types/custom';
import { SERVER_URL } from '../constants';
import api from 'api/api';

// Socket server URL

// Define context type
type NotificationsContextType = {
  notifications: CustomNotification[];
  markAsRead: (ids: number | number[]) => void;
  fetchNotifications: () => Promise<void>;
};

// Create context
const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  markAsRead: (id: number | number[]) => {},
  fetchNotifications: async () => {},
});

// Provider component
export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<CustomNotification[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  const fetchNotifications = async () => {
    try {
      const newNotifications = await api.getAllNotifications();
      setNotifications((oldNotifications) => {
        const combined = [...newNotifications, ...oldNotifications];
        const uniqueMap = new Map();

        combined.forEach((notif) => {
          uniqueMap.set(notif.id, notif);
        });

        return Array.from(uniqueMap.values());
      });
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const newSocket: Socket = io(SERVER_URL, {
      transports: ['websocket', 'polling'],
      forceNew: true,
      reconnectionAttempts: 5,
    });

    setSocket(newSocket);

    newSocket.on('connect', () => console.log('Connected! Socket ID:', newSocket.id));
    newSocket.on('disconnect', (reason) => console.warn('Disconnected:', reason));
    newSocket.on('connect_error', (err) => console.error('Connection Error:', err.message));

    newSocket.on('newNotification', (data: CustomNotification) => {
      setNotifications((prev) => [data, ...prev]);

      Toast.show({
        type: 'success',
        text1: data.title,
        text2: data.description,
        onPress: () => navigate('Notifications'),
      });

      console.log('New Notification:', data);
    });

    newSocket.on('notificationRead', (data: { success: boolean; data: number[] }) => {
      if (data.success) {
        setNotifications((prev) =>
          prev.map((n) => (data.data.includes(n.id) ? { ...n, read: true } : n))
        );
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const markAsRead = (ids: number | number[]) => {
    if (!socket) return;

    const idsArray = Array.isArray(ids) ? ids : [ids];

    setNotifications((prev) =>
      prev.map((n) => (idsArray.includes(n.id) ? { ...n, read: true } : n))
    );

    socket.emit('markAsRead', { notification: idsArray });
  };

  return (
    <NotificationsContext.Provider value={{ notifications, markAsRead, fetchNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);
