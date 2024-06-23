import { createRef } from 'react';

export const navigationRef = createRef();

const navigate = (name, params) =>
  navigationRef.current?.navigate(name, params);

function getFullPath(route) {
  console.log(route);
  switch (route) {
    case 'Home':
      return navigationRef.current?.navigate('Chat');
    case 'Message':
      return navigationRef.current?.navigate('Chat', {
        screen: 'Chat',
      });
    default:
      return;
  }
}

export default {
  navigate,
  getFullPath,
};
