import React, { FunctionComponent } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import logoImg from '../../assets/logo.png';

interface Props {
   hasLogo?: boolean;
   title?: string;
};

export const StackHeader: FunctionComponent<Props> = ({
   hasLogo,
   title
}) => {
   const navigation = useNavigation();

   return(
      <View style={styles.container}>
         <TouchableOpacity
            style={styles.buttonBack}
            onPress={navigation.goBack}
         >
            <Feather 
               color="#000"
               size={26}
               name="chevron-left"
            />
         </TouchableOpacity>

         {
            hasLogo && (
               <Image 
                  source={logoImg}
                  style={styles.logo}
               />
            )
         }

         {
            title && (
               <Text style={styles.title}>{title}</Text>
            )
         }

         <View />
      </View>
   );
};