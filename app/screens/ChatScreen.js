// @refresh reset
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import { Actions, GiftedChat } from 'react-native-gifted-chat';
import ImageView from 'react-native-image-viewing';
import {
  renderBubble,
  renderFooter,
  renderInputToolbar,
  renderSend,
} from '../components/Gifted-chat/GiftedChat';
import colors from '../config/colors';
import useChat from '../hooks/useChat';

function Chat() {
  const {
    handlePressPicker,
    onSend,
    setSelectedImageView,
    setModalVisible,
    modalVisible,
    selectedImageView,
    messages,
    senderUser,
  } = useChat();

  const renderChatFooter = useCallback(
    renderFooter(selectedImageView, setSelectedImageView),
    [selectedImageView]
  );

  return (
    <ImageBackground
      resizeMethod='cover'
      source={require('../assets/project/ai.jpeg')}
      style={{ flex: 1 }}
    >
      <GiftedChat
        onSend={onSend}
        messages={messages}
        user={senderUser}
        renderAvatar={null}
        alwaysShowSend
        renderActions={(props) => (
          <Actions
            {...props}
            containerStyle={{
              position: 'absolute',
              right: 50,
              bottom: 5,
              zIndex: 9999,
            }}
            onPressActionButton={handlePressPicker}
            icon={() => (
              <Ionicons name='camera' size={30} color={colors.iconGray} />
            )}
          />
        )}
        timeTextStyle={{ right: { color: colors.iconGray } }}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderBubble={renderBubble}
        renderMessageImage={(props) => {
          return (
            <View style={{ borderRadius: 15, padding: 2 }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  setSelectedImageView(props.currentMessage.image);
                }}
              >
                <Image
                  resizeMode='contain'
                  style={{
                    width: 200,
                    height: 200,
                    padding: 6,
                    borderRadius: 15,
                    resizeMode: 'cover',
                  }}
                  source={{ uri: props.currentMessage.image }}
                />
                {selectedImageView ? (
                  <ImageView
                    imageIndex={0}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    images={[
                      {
                        uri: selectedImageView,
                      },
                    ]}
                  />
                ) : null}
              </TouchableOpacity>
            </View>
          );
        }}
        renderChatFooter={renderChatFooter}
      />

      {Platform.OS === 'android' && <KeyboardAvoidingView behavior='padding' />}
    </ImageBackground>
  );
}

export default Chat;
