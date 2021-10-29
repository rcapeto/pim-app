import React, { useState } from 'react';
import { 
   View, 
   Text,
   SafeAreaView,
   KeyboardAvoidingView,
   TouchableWithoutFeedback,
   Keyboard,
   Platform,
   ScrollView,
   TouchableOpacity,
   ActivityIndicator,
   Alert,
   Image
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import styles from './styles';
import { colors } from '../../styles/global';
import { CustomInput } from '../../components/Input';
import { useForm } from '../../hooks/useForm';
import { useAPI } from '../../contexts/api';
import { useApp } from '../../contexts/app';
import { system_name } from '../../config/system';
import { inputMask } from '../../utils';

const initialFormData = {
   password: '123456',
   cellphone: '(11)998979-8773',
   email: 'kelly@email.com',
   name: 'Kelly',
   birth_date: '13/11/1975',
   cpf: '157.428.918-10',
};

export function Register() {
   const [formData, setFormData] = useState(initialFormData);
   const [image, setImage] = useState('');
   const { register, loadingAPI } = useAPI();
   const { handleSetUser } = useApp();
   const { checkFields } = useForm();

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
            setImage(result.uri);
         }

      } else {
         Alert.alert(system_name, 'Precisamos da sua permissão 😭')
      }
   };

   const handleRegister = async () => {
      const { hasEmptyFields, message } = checkFields(formData);

      if(hasEmptyFields) {
         return Alert.alert(system_name, message);
      }

      const credit_card = JSON.stringify({
         cvv: '',
         date: '',
         number: ''
      });

      const data = {
         ...formData,
         credit_card,
         image,
      };

      const response = await register(data);

      if(response.data) {
         const { user } = response.data;
         const { credit_card } = user;
         handleSetUser({
            ...user,
            credit_card: JSON.parse(credit_card)
         })
      }

      if(response.errors.length) {
         Alert.alert(system_name, 'Ops... alguem foi mais rápido com esses dados! 😉');
      }
   };

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

                  <View style={styles.form}>
                     <View style={styles.singleInput}>
                        <CustomInput 
                           label="Nome completo"
                           textContentType="name"
                           value={formData.name}
                           onChangeText={text => setFormData({...formData, name: text })}
                        />
                     </View>

                     <View style={styles.singleInput}>
                        <CustomInput 
                           label="Data de Nascimento"
                           placeholder="DD/MM/AAAA"
                           value={formData.birth_date}
                           onChangeText={text => setFormData({
                              ...formData,
                              birth_date: inputMask('birth_date', text)
                           })}
                        />
                     </View>

                     <View style={styles.singleInput}>
                        <CustomInput 
                           label="Celular"
                           textContentType="telephoneNumber"
                           value={formData.cellphone}
                           onChangeText={text => setFormData({
                              ...formData,
                              cellphone: inputMask('cellphone', text)
                           })}
                        />
                     </View>

                     <View style={styles.singleInput}>
                        <CustomInput 
                           label="CPF"
                           value={formData.cpf}
                           onChangeText={text => setFormData({
                              ...formData,
                              cpf: inputMask('cpf', text)
                           })}
                        />
                     </View>
                     <View style={styles.singleInput}>
                        <CustomInput 
                           label="E-mail"
                           textContentType="emailAddress"
                           autoCapitalize="none"
                           autoCorrect={false}
                           value={formData.email}
                           onChangeText={
                              text => setFormData({
                                 ...formData,
                                 email: text
                              })
                           }
                        />
                     </View>

                     <View style={styles.singleInput}>
                        <CustomInput 
                           label="Senha"
                           textContentType="newPassword"
                           secureTextEntry={true}
                           value={formData.password}
                           onChangeText={
                              text => setFormData({
                                 ...formData,
                                 password: text
                              })
                           }
                        />
                     </View>

                     <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleRegister}>
                           {
                              loadingAPI ? (
                                 <ActivityIndicator color={colors.white}/>
                              ) : (
                                 <Text style={styles.buttonText}>Enviar</Text>
                              )
                           }
                        </TouchableOpacity>
                     </View>
                  </View>
               </ScrollView>
            </TouchableWithoutFeedback>
         </KeyboardAvoidingView>
      </SafeAreaView>
   );
}