import React from 'react';
import { Image } from 'react-native';

function Avatar({ size, user }) {
  return (
    <Image
      source={
        user?.photoURL
          ? { uri: user.photoURL }
          : require('../../assets/project/user-icon.png')
      }
      resizeMethod='cover'
      style={{ borderRadius: size, height: size, width: size }}
    />
  );
}

export default Avatar;
