import { 
   Entity, 
   Column, 
   PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('users')
export default class User {
   @PrimaryGeneratedColumn('increment')
   id: string;

   @Column()
   password: string;

   @Column()
   cellphone: string;

   @Column()
   image: string;

   @Column()
   email: string;

   @Column()
   name: string;

   @Column()
   birth_date: string;

   @Column()
   cpf: string;

   @Column()
   credit_card: string;
};