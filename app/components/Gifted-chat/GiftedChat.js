import { Ionicons } from '@expo/vector-icons';
import { nanoid } from 'nanoid';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-get-random-values';
import { Bubble, InputToolbar } from 'react-native-gifted-chat';
import colors from '../../config/colors';
import ChatFileTransfer from './ChatFileTransfer';

const randomId = nanoid();

export const renderBubble = (props) => (
  <Bubble
    {...props}
    textStyle={{ right: { color: colors.text } }}
    wrapperStyle={{
      left: { backgroundColor: colors.white },
      right: { backgroundColor: colors.secondary },
    }}
  />
);

export const renderSend = (props) => {
  const { text, user, onSend } = props;
  return (
    <TouchableOpacity
      style={{
        height: 40,
        width: 40,
        borderRadius: 40,
        backgroundColor: colors.tealGreen,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
      }}
      onPress={() => {
        if (text && onSend) {
          onSend(
            {
              text: text.trim(),
              user,
              _id: randomId,
            },
            true
          );
        }
      }}
    >
      <Ionicons name='send' size={20} color={colors.white} />
    </TouchableOpacity>
  );
};

export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 2,
      borderRadius: 20,
      paddingTop: 5,
    }}
  />
);

export const renderFooter = ({ selectedImageView, setSelectedImageView }) => {
  if (selectedImageView) {
    return (
      <View>
        <Image
          source={{ uri: selectedImageView }}
          style={{ height: 75, width: 75 }}
        />
        <TouchableOpacity onPress={() => setSelectedImageView('')}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (selectedImageView) {
    return (
      <View>
        <ChatFileTransfer filePath={selectedImageView} />
        <TouchableOpacity onPress={() => setFilePath('')}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return null;
};
