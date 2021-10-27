import { Room, Comment } from '../@types';

const images = [
   {
      url: 'https://images.unsplash.com/photo-1576675784432-994941412b3d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2944&q=80'
   },
   {
      url: 'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2920&q=80'
   },
   {
      url: 'https://images.unsplash.com/photo-1605346576608-92f1346b67d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2940&q=80'
   }
];


const comments: Comment[] = [
   {
      "user": "Sr e Sr(a) Capeto",
      "text": "Um belo lugar para tirar a cabeça do trabalho!!",
      "id": 1
   },
   {
      "user": "Sr e Sr(a) Rosa",
      "text": "Perfeito para relaxar! Indico muito, serviço maravilhoso",
      "id": 2
   },
   {
      "user": "Sr e Sr(a) Herbert",
      "text": "Passamos o Natal, achamos maravilhoso! Recomendamos!",
      "id": 3
   }
];

export const rooms: Room[] = [
   {
      price: 800,
      infos: [
         'Quarto com vista à piscina;',
         'Permitido a entrada de pets;',
         'Cama de casal;',
         '130m².'
      ],
      comments,
      name: 'Suíte de Casal',
      id: 1,
      images,
      description: 'Uma bela suíte com uma aconchegante cama de casal, aonde tem uma linda vista e um maravilhoso espaço.',
      image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80'
   },
   {
      price: 250,
      name: 'Suíte Amigável',
      description: 'Para você viajar com um amigo e poder relaxar da melhor maneira se acomodando em camas de solteiro separadas.',
      id: 2,
      infos: [
         '63m²;',
         'Cama de solteiro;',
         'Serviço de quarto.'
      ],
      images,
      comments,
      image: 'https://images.unsplash.com/photo-1576675784201-0e142b423952?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80'
   }
];