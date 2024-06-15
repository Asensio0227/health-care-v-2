import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ChatHeader from '../components/Contact/ChatHeader';
import Icons from '../components/Icons';
import colors from '../config/colors';
import ChatScreen from '../screens/ChatScreen';
import ChatsScreen from '../screens/ChatsScreen';
import ContactsScreen from '../screens/ContactsScreen';
import ConversationNavigation from './ConversationNavigation';

const Stack = createNativeStackNavigator();

function ChatNavigation() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        title: 'HealthCare',
        headerTintColor: colors.white,
        headerStyle: { backgroundColor: colors.secondary },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name='Conversation'
        component={ConversationNavigation}
      />
      <Stack.Screen
        name='Chat'
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icons
                name='keyboard-backspace'
                backgroundColor={colors.secondary}
                size={50}
                color='white'
                style={styles.container}
              />
            </TouchableOpacity>
          ),
          headerTitle: (props) => <ChatHeader {...props} />,
        }}
        component={ChatScreen}
      />
      <Stack.Screen name='Contact' component={ContactsScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    right: 70,
  },
});

export default ChatNavigation;
