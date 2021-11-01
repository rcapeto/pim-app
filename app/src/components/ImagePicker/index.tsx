import React, { FunctionComponent } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { colors } from '../../styles/global';
import { system_name } from '../../config/system';

interface Props {
   image: string;
   updateImageValue: React.Dispatch<React.SetStateAction<string>>;
}

export const ImagePickerComponent: FunctionComponent<Props> = ({
   image,
   updateImageValue
}) => {
   const pickImage = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if(status === 'granted') {
         const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
         });

         if(!result.cancelled) {
            updateImageValue(result.uri);
         }

      } else {
         Alert.alert(system_name, 'Precisamos da sua permissão 😭')
      }
   };

   return(
      <View style={styles.selectImageContainer}>
         <View style={styles.selectImage}>
            <TouchableOpacity style={styles.buttonSelectImage} onPress={pickImage}>
               {
                  image ? (
                     <Image 
                        source={{ uri: image }}
                        style={styles.image}
                     />
                  ) : (
                        <Feather 
                           color={colors.gray}
                           name="user"
                           size={24}
                        />
                  )
               }
            </TouchableOpacity>
            <View style={styles.plus}> 
               <Feather 
                  size={22}
                  name="plus"
                  color={colors.white}
               />
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   selectImageContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
   },
   selectImage: {
      width: '60%',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center'
   },
   buttonSelectImage: {
      width: 140,
      borderRadius: 70,
      height: 140,
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: colors.gray,
      alignItems: 'center',
      justifyContent: 'center'
   },
   image: {
      width: '100%',
      height: '100%',
      borderRadius: 70
   },
   plus: {
      width: 30,
      borderWidth: 2,
      borderColor: colors.white,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.black,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 10,
      right: 30 
   },
});