import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import colors from '../config/colors';
import defaultStyles from '../config/styles';
import { useGlobalContext } from '../context/context';
import EyeInput from './EyeInput';
import Trash from './Trash';

function AppTextInput({
  style,
  icon,
  search,
  password,
  width = '100%',
  onPress,
  onLongPress,
  trash,
  ...otherProps
}) {
  const { isPasswordShown, setIsPasswordShown } = useGlobalContext();
  return (
    <View style={[styles.container, { width }, style]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.secondary}
          style={styles.icon}
        />
      )}
      <TextInput
        style={[defaultStyles.input, { color: colors.darkGrey }]}
        // placeholderTextColor={defaultStyles.colors.medium}
        {...otherProps}
      />
      {search && (
        <TouchableOpacity onPress={onLongPress} style={styles.btn}>
          <MaterialCommunityIcons
            name='arrow-right-box'
            size={100 * 0.65}
            color={colors.secondary}
          />
        </TouchableOpacity>
      )}
      {password ? (
        <EyeInput
          name={isPasswordShown ? 'eye-off' : 'eye'}
          onPress={() => setIsPasswordShown(!isPasswordShown)}
          style={{
            position: 'absolute',
            right: 1,
            alignSelf: 'center',
            paddingRight: 10,
          }}
        />
      ) : null}
      {trash ? <Trash onPress={onPress} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
    flex: 1,
    flexWrap: 'wrap-reverse',
    height: 90,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    marginRight: -10,
    width: 90,
  },
  container: {
    backgroundColor: defaultStyles.colors.lightGrey,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    overflow: 'hidden',
  },
  icon: {
    margin: 5,
  },
});

export default AppTextInput;
