import { Platform, StatusBar, NativeModules } from 'react-native';

const { StatusBarManager } = NativeModules;

export const useDevice = () => {
   const iOS = Platform.OS === 'ios';
   const Android = !iOS;
   let statusBarHeight: number = 0;

   StatusBarManager.getHeight((height: number) => {
      statusBarHeight = height;
   });

   return {
      iOS,
      statusBarHeight,
      Android
   };
};