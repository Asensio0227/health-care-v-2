import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import colors from '../config/colors';

function HeaderView({ image, title, onPress, onLongPress, subTitle }) {
  return (
    <View style={styles.navbar}>
      <View style={styles.navbarCenter}>
        <TouchableHighlight
          onPress={onPress}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            overflow: 'hidden',
          }}
        >
          <Image
            style={styles.img}
            source={
              image
                ? { uri: image }
                : require('../assets/project/user-icon.png')
            }
          />
        </TouchableHighlight>
        <View style={styles.navbarContainer}>
          <Text style={styles.navbarTitle}>{subTitle}</Text>
          <TouchableHighlight
            underlayColor={colors.medium}
            onPress={onLongPress}
            style={styles.btn}
          >
            <Text style={styles.navbarTitle}>{title}</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          underlayColor={colors.lightGrey}
          onPress={onLongPress}
        >
          <MaterialCommunityIcons
            name='chevron-right'
            size={25}
            color={colors.secondary}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 10,
  },
  img: { height: '100%', width: '100%' },
  length: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: colors.mode,
    flexDirection: 'row',
  },
  navbarCenter: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  navbarContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15,
  },
  navbarTitle: {
    color: colors.secondary,
    marginBottom: 0,
    textTransform: 'capitalize',
  },
  text: {
    color: colors.primary,
  },
  subTitle: {
    color: colors.secondary,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});

export default HeaderView;
