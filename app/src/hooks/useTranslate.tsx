import { Field } from '../@types/manipulation';

const translateField = (field: Field) => {
   switch(field) {
      case 'address':
         return 'Endereço';
      case 'name':
         return 'Nome';
      case 'email':
         return 'E-mail';
      case 'password':
         return 'Senha'
      case 'cellphone':
         return 'Celular';
      case 'birth_date':
         return 'Data de Nascimento';
      case 'credit_card':
         return 'Número cartão';
      case 'credit_card_date':
         return 'Data cartão';
      case 'cpf':
         return 'CPF';
      case 'enter_date':
         return 'Check-in';
      case 'exit_date':
         return 'Check-out';
      default:
         return field;
   }
};

export const useTranslate = () => ({
   translateField
});