import { useRoute } from '@react-navigation/native';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useRef, useState } from 'react';
import 'react-native-get-random-values';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, db } from '../../firebase';
import { pickerImage, uploadImage } from '../utils/storage';
import useGetUser from './useGetUser';
import { sendPushNotification } from './usePushNotifications';

function useChat() {
  const uuidRef = useRef(nanoid());
  const [roomHash, setRoomHash] = useState('');
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const room = route.params.room;
  const roomId = room ? room.id : uuidRef.current;
  const selectedImage = route.params.image;
  const userB = route.params.user;
  const roomRef = doc(db, 'rooms', roomId);
  const roomMessageRef = collection(db, 'rooms', roomId, 'messages');
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedImageView, setSelectedImageView] = useState('');
  const { currentUser } = auth;
  const user = useGetUser();

  const senderUser =
    currentUser.photoURL && user
      ? {
          name: currentUser.displayName,
          _id: currentUser.uid,
          expoToken: user?.expoToken,
          surname: user.surname,
        }
      : {
          name: currentUser.displayName,
          _id: currentUser.uid,
          avatar: currentUser.photoURL,
        };

  useEffect(() => {
    (async () => {
      if (!room) {
        const currUserData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
          expoToken: user.expoToken,
          surname: user.surname,
        };

        if (currentUser.photoURL) {
          currUserData.photoURL = currentUser.photoURL;
        }
        const userBData = {
          displayName: userB.contactName || userB.displayName || '',
          surname: userB.surname,
          email: userB.email,
          expoToken: userB.expoToken,
        };
        if (userB.photoURL) {
          userBData.photoURL = userB.photoURL;
        }
        const roomData = {
          participants: [currUserData, userBData],
          participantsArray: [currentUser.email, userB.email],
        };
        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          console.log(error);
        }
      }
      const numberHash = `${currentUser.email}:${userB.email}`;
      setRoomHash(numberHash);
      if (selectedImage && selectedImage.uri) {
        await sendImage(selectedImage.uri, numberHash);
      }
    })();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onSnapshot(roomMessageRef, (querySnapshot) => {
      const messageFireStore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === 'added')
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messageFireStore);
    });

    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((prevMessages) => {
        return GiftedChat.append(prevMessages, messages);
      });
    },
    [messages, selectedImageView]
  );

  const onSend = async (messages = []) => {
    const writes = messages.map((msg) => addDoc(roomMessageRef, msg));
    const msg = messages.map((msg) => {
      const { text, user } = msg;
      return { text, user };
    });

    const lastMessage = messages[messages.length - 1];
    writes.push(updateDoc(roomRef, { lastMessage }));
    await Promise.all([writes, sendPushNotification(userB.expoToken, msg)]);
  };

  async function sendImage(uri, roomPath) {
    try {
      const { url, fileName } = await uploadImage(
        uri,
        `images/rooms/${roomPath || roomHash}`
      );
      // const [messageToSend] = messages;
      const message = {
        _id: fileName,
        text: '',
        // text: messageToSend.text,
        createdAt: new Date(),
        user: senderUser,
        image: url,
      };
      const lastMessage = { ...message, text: 'Image' };

      await Promise.all([
        addDoc(roomMessageRef, message),
        updateDoc(roomRef, { lastMessage }),
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePressPicker = async () => {
    const result = await pickerImage();
    const fileUri = result.assets[0].uri;
    if (result) await sendImage(fileUri);
    setSelectedImageView(fileUri);
    setModalVisible(true);
  };

  return {
    handlePressPicker,
    onSend,
    setSelectedImageView,
    setModalVisible,
    modalVisible,
    selectedImageView,
    messages,
    senderUser,
  };
}

export default useChat;
