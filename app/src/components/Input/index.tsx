import React, { FunctionComponent, useState } from 'react';
import { View, TextInput, Text, TextInputProps, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '../../styles/global';

interface Props extends TextInputProps {
   label: string;
   error?: string;
};

export const CustomInput: FunctionComponent<Props> = ({
   label, error,...props
}) => {
   const { secureTextEntry: showIcon } = props;
   const [dontShowPassword, setDontShowPassword] = useState(showIcon);
   return(
      <View style={styles.inputBlock}>
         <Text style={styles.label}>{label}</Text>

         {
            error && (
               <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
               </View>
            )
         }

         <View style={styles.inputContainer}>
            <TextInput 
               style={
                  [styles.input, showIcon ? styles.inputHasIcon : {}]
               }
               {...props}
               secureTextEntry={dontShowPassword}
               keyboardAppearance="dark"
            />
            {
               showIcon && (
                  <TouchableOpacity style={styles.icon}
                     onPress={() => {
                        setDontShowPassword(!dontShowPassword);
                     }}
                  >
                     <Ionicons 
                        name={dontShowPassword ? 'eye-off' : 'eye'}
                        color={colors.gray}
                        size={20}
                     />
                  </TouchableOpacity>
               )
            }
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   inputBlock: {
      width: '100%',
      marginBottom: 20
   },
   label: {
      fontSize: 16,
      color: colors.gray,
      fontFamily: fonts.regular,
      marginBottom: 4,
   },
   inputContainer: {
      position: 'relative',
      height: 55,
   },
   input: {
      borderBottomWidth: 1,
      borderColor: colors.gray,
      padding: 10,
      height: '100%',
      fontSize: 16,
      color: colors.black,
   },
   inputHasIcon: {
      paddingRight: 50
   },
   icon: {
      position: 'absolute',
      right: 15,
      top: 20
   },
   errorContainer: {
      padding: 1,
   },
   errorText: {
      color: colors.red,
      fontSize: 12
   }
});