import { Field } from '../@types/manipulation';
import { currency, lang, formatStyle } from '../config/system';

export const formatPrice = (price: number): string => {
   return price.toLocaleString(lang, { 
      style: formatStyle,
      currency
   });
};

export const inputMask = (field: Field, value: string): string => {
   const regexRemoveChar = /\D/g;

   switch(field) {
      case 'birth_date':
         value = value.replace(regexRemoveChar, '');
         
         const birthRegex = /(\d{2})(\d)/;

         value = value.replace(birthRegex, '$1/$2');
         value = value.replace(birthRegex, '$1/$2');

         if(value.length > 10) value = value.slice(0, -1);

         return value;
      case 'cellphone':
         value = value.replace(regexRemoveChar, '');
         value = value.replace(/(\d{2})(\d)/, '($1)$2');
         value = value.replace(/(\d{5})(\d)/, '$1-$2');
         if(value.length > 14) value = value.slice(0, -1);

         return value;
      case 'cpf':
         value = value.replace(regexRemoveChar, '');

         const cpfRegex = /(\d{3})(\d)/;
         const regexString = '$1.$2';
   
         value = value.replace(cpfRegex, regexString);
         value = value.replace(cpfRegex, regexString);
         value = value.replace(cpfRegex, '$1-$2');
   
         if(value.length > 14) value = value.slice(0, -1);
   
         return value;
      case 'credit_card_date': 
         const regexCreditCardDate = /(\d{2})(\d)/;
         const regexCreditCardDateString = '$1/$2';

         value = value.replace(regexCreditCardDate, regexCreditCardDateString);

         if(value.length > 4) value = value.slice(0, -1);

         return value;
      case 'credit_card':
         const regexCreditCard = /(\d{4})(\d)/;
         const regexCreditCardString = '$1.$2';

         value = value.replace(regexCreditCard, regexCreditCardString);
         
         if(value.length > 18) value = value.slice(0, -1);
         return value;
      default:
         return value;
   }
};

export const cryptoCreditCard = (cardNumber: string) => {
   const length = cardNumber.length;
   const lastNumbers = cardNumber.slice(-4);
   return lastNumbers.padStart(length, '*');
};