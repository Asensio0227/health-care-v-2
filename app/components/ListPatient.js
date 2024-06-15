import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  GestureHandlerRootView,
  Swipeable,
} from 'react-native-gesture-handler';
import colors from '../config/colors';
import AppText from './AppText';

function ListPatient({
  renderLeftActions,
  title: title,
  onPress,
  subTitle,
  IconComponent,
  image,
  patient,
  number,
  color = 'mode',
  style,
  hospital,
}) {
  return (
    <GestureHandlerRootView>
      <Swipeable renderLeftActions={renderLeftActions}>
        <TouchableHighlight underlayColor={colors.lightGrey} onPress={onPress}>
          <View
            style={[
              styles.container,
              { backgroundColor: colors[color] },
              style,
            ]}
          >
            {IconComponent}
            {image && <Image style={styles.image} source={{ uri: image }} />}
            {patient && <Text style={styles.imageText}>{patient}</Text>}
            <View style={styles.detailsContainer}>
              <AppText style={styles.title} numberOfLines={1}>
                {title} {subTitle}
              </AppText>
              {number && <Text style={styles.number}>{number}</Text>}
              {hospital && <Text style={styles.hospital}>{hospital}</Text>}
            </View>
            <MaterialCommunityIcons
              name='chevron-right'
              size={25}
              color={colors.secondary}
            />
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  image: {
    borderRadius: 35,
    height: 70,
    width: 70,
    marginRight: 10,
  },
  imageText: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 35,
    color: colors.white,
    fontSize: 30,
    justifyContent: 'center',
    height: 70,
    textAlign: 'center',
    padding: 10,
    width: 70,
  },
  number: {
    marginTop: 5,
    textAlign: 'center',
    color: colors.gold,
  },
  hospital: {
    marginTop: 5,
    textAlign: 'center',
    color: colors.gold,
  },
  title: {
    textTransform: 'capitalize',
    fontWeight: '700',
    color: colors.secondarylight,
  },
});

export default ListPatient;
