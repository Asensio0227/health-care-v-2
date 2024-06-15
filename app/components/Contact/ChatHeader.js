import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../config/colors';
import Avatar from './Avatar';

function ChatHeader() {
  const route = useRoute();
  const fullName = `${route.params.user.displayName} ${route.params.user.surname}`;

  return (
    <View style={styles.container}>
      <View>
        <Avatar size={40} user={route.params.user} />
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>
          {route.params.user.contactName || fullName}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    right: 35,
  },
  section: {
    alignItems: 'center',
    marginRight: 25,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  text: {
    color: colors.white,
    fontSize: 18,
  },
});

export default ChatHeader;
