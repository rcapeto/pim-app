const userRoutes = {
   create: '/user',
   get: '/login',
   update: function(user_id: string) {
      return `/users/${user_id}`;
   }
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

const roomRoutes = {
   get: '/rooms'
}

const routes = {
   user: userRoutes,
   reservation: reservationsRoutes,
   room: roomRoutes
};

const baseURL = 'http://localhost:3333';

export { routes, baseURL };