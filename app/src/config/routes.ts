const userRoutes = {
   create: '/user',
   get: '/login'
};

const reservationsRoutes = {
   create: '/reservation',
   get: function(user_id: string) {
      return `/reservations/user/${user_id}`;
   },
   delete: function(id: string) {
      return `/reservations/${id}`;
   }
};

const routes = {
   user: userRoutes,
   reservation: reservationsRoutes
};

export { routes };