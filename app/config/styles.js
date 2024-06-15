import { Platform } from 'react-native';
import colors from './colors';

export default {
  btn: {
    textAlign: 'center',
    textTransform: 'uppercase',
    ...Platform.select({
      ios: {
        fontSize: 20,
        fontFamily: 'Avenir',
      },
      android: {
        fontSize: 18,
        fontFamily: 'Roboto',
      },
    }),
    color: colors.white,
    fontWeight: 'bold',
  },
  colors,
  desc: {
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    color: colors.white,
  },
  input: {
    fontSize: 14,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    color: colors.white,
    // textTransform: 'capitalize',
  },
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    color: colors.darkGrey,
    fontWeight: 'regular',
    marginBottom: 20,
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.black,
    lineHeight: 36,
    marginTop: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 22,
    paddingVertical: 15,
  },
  span: {
    fontSize: 18,
    lineHeight: 22,
    color: colors.primary,
    fontWeight: '900',
    paddingLeft: 30,
  },
};
