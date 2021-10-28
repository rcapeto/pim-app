import React, { useState } from 'react';
import { 
   View, 
   Text, 
   SafeAreaView,
   TouchableOpacity,
   TouchableWithoutFeedback,
   Keyboard,
   KeyboardAvoidingView,
   Platform
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';

import { useAPI } from '../../contexts/api';
import { CustomInput } from '../../components/Input';

import styles from './styles';

export function Login(props: any) {
   const [errorMessage, setErrorMessage] = useState('');

   const {} = useAPI();
   const navigation = useNavigation();

   const handleNavigateToRegister = () => {
      navigation.dispatch(
         CommonActions.navigate({
            name: 'Register',
         })
      )
   };

   const handleLogin = async () => {};

   return(
      <SafeAreaView style={styles.container}>
         <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         >
            <TouchableWithoutFeedback
               style={styles.container}
               onPress={Keyboard.dismiss}
            >
               <View style={styles.content}>
                  <View style={styles.header}>
                     <Text style={styles.title}>Entrar</Text>
                     <Text style={styles.description}>
                        Entre com uma conta existente ou registre-se.
                     </Text>
                  </View>

                  <View style={styles.form}>
                     <CustomInput 
                        label="E-mail"
                        keyboardType="email-address"
                        returnKeyType="done"
                        textContentType="emailAddress"
                     />
                      <CustomInput 
                        label="Senha"
                        secureTextEntry={true}
                        returnKeyType="done"
                        textContentType="password"
                     />

                     {
                        errorMessage.length > 0 && (
                           <View style={styles.errorContainer}>
                              <Text style={styles.errorMessage}>{errorMessage}</Text>
                           </View>
                        )
                     }

                     <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}
                           onPress={handleLogin}
                           activeOpacity={.8}
                        >
                           <Text style={styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>
                     </View>

                     <View style={styles.registerContainer}>
                        <TouchableOpacity style={styles.registerButton}
                           onPress={handleNavigateToRegister}
                           activeOpacity={.8}
                        >
                           <Text style={styles.registerButtonText}>REGISTRE-SE</Text>
                        </TouchableOpacity>
                     </View>
                  </View>
               </View>
            </TouchableWithoutFeedback>
         </KeyboardAvoidingView>
      </SafeAreaView>
   );
}