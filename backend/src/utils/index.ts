export const showError = (err: any, message: string) => {
   console.error('Error[showError]', {
      err,
      message,
   });
};

export const removeMask = (value: string): string => {
   return value.replace(/\D/g, '');
};