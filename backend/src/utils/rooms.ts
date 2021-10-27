import { showError } from './index';
import { rooms } from '../../fake_data';

export const getRoomWithId = async (room_id: string) => {
   try {
      const room = rooms.find(currentRoom => String(currentRoom.id) === room_id);
      return room;

   } catch(error) {
      showError(error, 'Error[getRoomWithId]');
      return null;
   }
};