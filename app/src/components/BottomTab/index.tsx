import React, { FunctionComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { useApp } from '../../contexts/app';
import { colors } from '../../styles/global';
import defaultImage from '../../assets/image.png';
import styles from './styles';

export const BottomTab: FunctionComponent<BottomTabBarProps> = ({
   state,
   navigation
}) => {
   const { user } = useApp();

   const navigate = (routeName: string) => {
      navigation.navigate(routeName);
   };

   return(
      <View style={styles.container}>
         <TouchableOpacity
            onPress={
               () => navigate('Home')
            }
            style={
               [
                  styles.tab,
                  state.index === 0 ? styles.activeTab : {}
               ]
            }
         >
            <Entypo 
               name="home"
               size={22}
               color={colors.black}
            />
            <Text style={styles.tabText}>Início</Text>
         </TouchableOpacity>
         <TouchableOpacity
            onPress={
               () => navigate('MyReservations')
            }
            style={
               [
                  styles.tab,
                  state.index === 1 ? styles.activeTab : {}
               ]
            }
         >
            <Entypo 
               name="list"
               size={22}
               color={colors.black}
            />
            <Text style={styles.tabText}>Minhas Reservas</Text>
         </TouchableOpacity>

         <TouchableOpacity
            onPress={
               () => navigate('Profile')
            }
            style={
               [
                  styles.tab,
                  state.index === 2 ? styles.activeTab : {}
               ]
            }
         >
            {
               user.profile ? (
                  <Image 
                     style={styles.image}
                     source={{ uri: user.profile.image }}
                  />
               ) : (
                  <Image 
                     source={defaultImage}
                     style={styles.image}
                  />
               )
            }
            <Text style={styles.tabText}>Perfil</Text>
         </TouchableOpacity>
      </View>
   );
}