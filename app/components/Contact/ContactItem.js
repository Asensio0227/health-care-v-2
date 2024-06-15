import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import colors from '../../config/colors';
import Avatar from './Avatar';

function ContactItem({ type, description, user, style, time, room, image }) {
  const navigation = useNavigation();
  const username = user.contactName || `${user.displayName} ${user.surname}`;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => navigation.navigate('Chat', { user, room, image })}
    >
      <Grid>
        <Col
          style={{ alignItems: 'center', justifyContent: 'center', width: 80 }}
        >
          <Avatar user={user} size={type === 'contacts' ? 70 : 65} />
        </Col>
        <Col style={{ marginRight: 10 }}>
          <Row style={{ alignItems: 'center' }}>
            <Col>
              <Text style={styles.text}>{username}</Text>
            </Col>
            {time && (
              <Col style={{ alignItems: 'flex-end' }}>
                <Text style={styles.time}>
                  {new Date(time.seconds * 1000).toLocaleDateString()}
                </Text>
              </Col>
            )}
          </Row>
          {description && (
            <Row style={{ marginTop: -5 }}>
              <Text style={styles.desc}>{description}</Text>
            </Row>
          )}
        </Col>
      </Grid>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    height: 80,
  },
  desc: {
    color: colors.lightGrey,
    fontSize: 13,
  },
  text: {
    color: colors.iconGray,
    fontWeight: '900',
    fontSize: 16,
    marginRight: 10,
  },
  time: {
    color: colors.lightGrey,
    fontSize: 11,
  },
});

export default ContactItem;
