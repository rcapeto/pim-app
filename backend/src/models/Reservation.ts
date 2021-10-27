import { 
   Entity, 
   Column, 
   PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('reservations')
export default class Reservation {
   @PrimaryGeneratedColumn('increment')
   id: string;

   @Column()
   room_id: string;

   @Column()
   enter_date: string;

   @Column()
   exit_date: string;

   @Column()
   user_id: string;
};