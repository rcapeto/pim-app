import { useTranslate } from './useTranslate';

interface Fields {
   [key: string]: string;
}

interface EmptyFields {
   field: string;
};

const generateMessageError = (fields: EmptyFields[]) => {
   const message: string[] = [];
   const { translateField } = useTranslate();

   for(const emptyField of fields) {
      const fieldName = translateField(emptyField.field);
      message.push(`Por favor preencha o campo ${fieldName}`);
   }

   return {
      message: message.join('\n'),
   };
};

const checkFields = (fields: Fields) => {
   let hasEmptyFields = false;
   const emptyFields: EmptyFields[] = [];

   Object.keys(fields).forEach(field => {
      if(!fields[field] || !fields[field].trim()) {
         hasEmptyFields = true;
         emptyFields.push({ field });
      }
   });

   const { message } = generateMessageError(emptyFields);

   return {
      hasEmptyFields,
      emptyFields,
      message
   };
};

export const useForm = () => ({
   checkFields,
});