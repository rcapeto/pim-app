import React, { useState } from 'react';
import { 
   View, 
   Text, 
   SafeAreaView,
   TouchableOpacity,
   TouchableWithoutFeedback,
   Keyboard,
   KeyboardAvoidingView,
   Platform,
   ActivityIndicator,
   Alert
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';

import { useAPI } from '../../contexts/api';
import { useApp } from '../../contexts/app';
import { CustomInput } from '../../components/Input';
import { useForm } from '../../hooks/useForm';
import { system_name } from '../../config/system';
import { colors } from '../../styles/global';

import styles from './styles';

export function Login() {
   const [errorMessage, setErrorMessage] = useState('');
   const [data, setData] = useState({ email: 'admin@admin.com.br', password: 'admin' });

   const { login, loadingAPI } = useAPI();
   const { handleSetUser } = useApp();
   const { checkFields } = useForm();
   const navigation = useNavigation();

   const handleNavigateToRegister = () => {
      navigation.dispatch(
         CommonActions.navigate({
            name: 'Register',
         })
      );
   };

   const handleLogin = async () => {
      const { message, hasEmptyFields } = checkFields(data);

      if(hasEmptyFields) {
         return Alert.alert(system_name, message);
      }
      const { email, password } = data;
      const { user, message: messageAPI } = await login(email, password);

      if(!user) {
         return setErrorMessage(messageAPI);
      }
      user && handleSetUser({
         ...user,
         credit_card: JSON.parse(user.credit_card)
      });
   }

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
                        value={data.email}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={text => setData({...data, email: text })}
                     />
                      <CustomInput 
                        label="Senha"
                        secureTextEntry={true}
                        returnKeyType="done"
                        textContentType="password"
                        value={data.password}
                        onChangeText={text => setData({...data, password: text })}
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
                           {
                              loadingAPI ? (
                                 <ActivityIndicator 
                                    color={colors.white}
                                    size={20}
                                 />
                              ) : (
                                 <Text style={styles.buttonText}>Entrar</Text>
                              )
                           }
                           
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