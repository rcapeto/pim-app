import React, { useState, useEffect } from 'react';
import { 
   View, 
   Text, 
   ScrollView, 
   TouchableOpacity, 
   Alert, 
   ActivityIndicator,
   TouchableWithoutFeedback,
   Keyboard 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';

import styles from './styles';
import { colors } from '../../styles/global';
import { useAPI } from '../../contexts/api';
import { useApp } from '../../contexts/app';
import { inputMask } from '../../utils';
import { useForm } from '../../hooks/useForm';
import { useDevice } from '../../hooks/useDevice';
import { ImagePickerComponent } from '../../components/ImagePicker';
import { Loading } from '../../components/Loading';
import { CustomInput } from '../../components/Input';
import { system_name } from '../../config/system';

const initialFormData = {
   password: '',
   cellphone: '',
   email: '',
   name: '',
   birth_date: '',
   cpf: '',
   credit_card: {
      cvv: '',
      date: '',
      number: ''
   },
};


export function Profile() {
   const { loadingAPI, updateUser } = useAPI();
   const { user, logout, handleSetUser } = useApp();
   const { iOS } = useDevice();
   const { checkFields } = useForm();
   const navigation = useNavigation();

   const [loading, setLoading] = useState(false);
   const [formData, setFormData] = useState(initialFormData);
   const [imageProfile, setImageProfile] = useState('');

   const handleUpdateUser = async () => {
      const { cvv, date, number } = formData.credit_card;
      const newFormData = {
         ...formData,
         credit_card: ''
      };
      const { message, hasEmptyFields } = checkFields(newFormData);

      if(hasEmptyFields) {
         Alert.alert(system_name, message);
      }

      const credit_card = JSON.stringify({
         cvv,
         date,
         number
      });

      const data = {
         ...formData,
         image: imageProfile,
         credit_card
      };

      if(user.profile) {
         const { id: user_id } = user.profile;

         const response = await updateUser(user_id, data);

         if(response.data) {
            const newUser = response.data.user;
            const user_credit_card = JSON.parse(newUser.credit_card);

            const attUser = {
               ...newUser,
               credit_card: user_credit_card,
            };

            handleSetUser(attUser);

            Alert.alert(system_name, 'Atualizado com sucesso!');

            navigation.dispatch(
               CommonActions.navigate({
                  name: 'Home',
               })
            );
         }

         if(response.errors.length) {
            Alert.alert(system_name, 'Ops... alguem foi mais rápido com esses dados! 😉');
         }
      }
   };

   const handleLogout = async () => {
      Alert.alert(system_name, 'Deseja sair?', [
         { text: 'Cancelar', style: 'cancel' },
         { text: 'Sair', style: 'default', onPress: logout },
      ]);
   };

   const updateState = () => {
      setLoading(true);

      if(user.profile) {
         const {
            birth_date,
            email,
            name,
            cellphone,
            cpf,
            credit_card,
            image,
            password
         } = user.profile;

         setFormData({
            birth_date,
            email,
            name,
            cellphone: inputMask('cellphone', cellphone),
            cpf: inputMask('cpf', cpf),
            password,
            credit_card: {
               cvv: inputMask('cvv', credit_card.cvv),
               date: inputMask('credit_card_date', credit_card.date),
               number: inputMask('credit_card', credit_card.number),
            },
         });

         setImageProfile(image);
      }

      setLoading(false);
   };

   useEffect(() => {
      updateState();
   }, []);

   if(loading) 
      return(
         <Loading 
            text="Carregando..."
         />
      );

   return(
      <TouchableWithoutFeedback 
         onPress={Keyboard.dismiss}
         style={styles.container}
      >
         <ScrollView 
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 10 }}
            contentInset={{
               bottom: iOS ? 200 : 0
            }}
         >
            <View style={styles.header}>
               <Text style={styles.title}>Meu perfil</Text>
               <TouchableOpacity
                  style={styles.buttonLogout}
                  onPress={handleLogout}
               >
                  <Feather 
                     name="power"
                     size={20}
                     color={colors.red}
                  />
               </TouchableOpacity>
            </View>
            <ImagePickerComponent 
               image={imageProfile}
               updateImageValue={setImageProfile}
            />

            <View style={styles.inputs}>
               <CustomInput 
                  value={formData.name}
                  label="Nome completo"
                  autoCapitalize="words"
                  autoCorrect={false}
                  keyboardType="name-phone-pad"
                  textContentType="name"
                  onChangeText={
                     text => setFormData({
                        ...formData,
                        name: text
                     })
                  }
               />
               <CustomInput 
                  value={formData.email}
                  label="E-mail"
                  keyboardType="email-address"
                  returnKeyType="done"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={
                     text => setFormData({
                        ...formData,
                        email: text
                     })
                  }
               />
               <CustomInput 
                  value={formData.password}
                  label="Senha"
                  textContentType="password"
                  keyboardType="visible-password"
                  secureTextEntry
                  onChangeText={
                     text => setFormData({
                        ...formData,
                        password: text
                     })
                  }
                  
               />
               <CustomInput 
                  value={formData.birth_date}
                  label="Data de Nascimento"
                  keyboardType="number-pad"
                  returnKeyType="done"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={
                     text => setFormData({
                        ...formData,
                        birth_date: inputMask('birth_date', text)
                     })
                  }
               />
               <CustomInput 
                  value={formData.cellphone}
                  label="Celular"
                  keyboardType="number-pad"
                  returnKeyType="done"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={
                     text => setFormData({
                        ...formData,
                        cellphone: inputMask('cellphone', text)
                     })
                  }
               />
               <CustomInput 
                  value={formData.cpf}
                  label="CPF"
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={
                     text => setFormData({
                        ...formData,
                        cpf: inputMask('cpf', text)
                     })
                  }
               />

               <Text 
                  style={[
                     styles.title,
                     { marginBottom: 30 }
                  ]}
               >
                  Dados do cartão
               </Text>
               
               <CustomInput 
                  value={formData.credit_card.number}
                  label="Número do cartão"
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={
                     text => setFormData({
                        ...formData,
                        credit_card: {
                           ...formData.credit_card,
                           number: inputMask('credit_card', text)
                        },
                     })
                  }
               />

               <CustomInput 
                  value={formData.credit_card.cvv}
                  label="CVV"
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={
                     text => setFormData({
                        ...formData,
                        credit_card: {
                           ...formData.credit_card,
                           cvv: inputMask('cvv', text)
                        },
                     })
                  }
               />
               <CustomInput 
                  value={formData.credit_card.date}
                  label="Data"
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={
                     text => setFormData({
                        ...formData,
                        credit_card: {
                           ...formData.credit_card,
                           date: inputMask('credit_card_date', text)
                        },
                     })
                  }
               />
            </View>

            <TouchableOpacity 
               style={styles.button}
               onPress={handleUpdateUser}
            >
               {
                  loadingAPI ? (
                     <ActivityIndicator />
                  ) : (
                     <Text style={styles.buttonText}>Atualizar Dados</Text>
                  )
               }
            </TouchableOpacity>
         </ScrollView>
      </TouchableWithoutFeedback>
   );
}