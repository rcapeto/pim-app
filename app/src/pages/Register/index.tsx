import React from 'react';
import { 
   View, 
   Text,
   SafeAreaView,
   KeyboardAvoidingView,
   TouchableWithoutFeedback,
   Keyboard,
   Platform,
   ScrollView,
   TouchableOpacity 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import { colors } from '../../styles/global';
import { CustomInput } from '../../components/Input';

export function Register() {
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
               <ScrollView style={styles.content}
                  contentInset={{ bottom: Platform.OS === 'ios'? 130 : 0 }}
                  showsVerticalScrollIndicator={false}
               >
                  <Text style={styles.title}>Registro</Text>

                  <View style={styles.selectImageContainer}>
                     <View style={styles.selectImage}>
                        <TouchableOpacity style={styles.buttonSelectImage}>
                           <Feather 
                              color={colors.gray}
                              name="user"
                              size={24}
                           />
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

                  <View style={styles.form}>
                     <View style={styles.singleInput}>
                        <CustomInput 
                           label="Nome completo"
                           textContentType="name"
                        />
                     </View>

                     <View style={styles.singleInput}>
                        <CustomInput 
                           label="Data de Nascimento"
                           placeholder="DD/MM/AAAA"
                        />
                     </View>

                     <View style={styles.singleInput}>
                        <CustomInput 
                           label="Celular"
                           textContentType="telephoneNumber"
                        />
                     </View>

                     <View style={styles.singleInput}>
                        <CustomInput 
                           label="CPF"
                        />
                     </View>
                     <View style={styles.singleInput}>
                        <CustomInput 
                           label="E-mail"
                           textContentType="emailAddress"
                        />
                     </View>

                     <View style={styles.singleInput}>
                        <CustomInput 
                           label="Senha"
                           textContentType="newPassword"
                           secureTextEntry={true}
                        />
                     </View>

                     <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                           <Text style={styles.buttonText}>Enviar</Text>
                        </TouchableOpacity>
                     </View>
                  </View>
               </ScrollView>
            </TouchableWithoutFeedback>
         </KeyboardAvoidingView>
      </SafeAreaView>
   );
}