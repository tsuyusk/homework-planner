import { NowRequest, NowResponse } from '@vercel/node';
import { v4 as uuid } from 'uuid';

interface Subject {
  id: string;
  title: string;
  isDone: boolean;
  isShown: boolean;
  weeks: Array<{
    id: string;
    number: number;
    isDone: boolean;
  }>;
}

export default (request: NowRequest, response: NowResponse) => {
  const weeks = [
    {
      id: uuid(),
      number: 1,
      isDone: false,
    },
    {
      id: uuid(),
      number: 2,
      isDone: false,
    },
    {
      id: uuid(),
      number: 3,
      isDone: false,
    },
    {
      id: uuid(),
      number: 4,
      isDone: false,
    },
  ];

  const subjects: Subject[] = [
    {
      id: uuid(),
      title: 'Português',
      isDone: false,
      isShown: true,
      weeks,
    },
    {
      id: uuid(),
      title: 'Matemática',
      isDone: false,
      isShown: true,
      weeks,
    },
    {
      id: uuid(),
      title: 'Fisica',
      isDone: false,
      isShown: true,
      weeks,
    },
    {
      id: uuid(),
      title: 'Geografia',
      isDone: false,
      isShown: true,
      weeks,
    },
    {
      id: uuid(),
      title: 'Química',
      isDone: false,
      isShown: true,
      weeks,
    },
    {
      id: uuid(),
      title: 'História',
      isDone: false,
      isShown: true,
      weeks,
    },
    {
      id: uuid(),
      title: 'Sociologia',
      isDone: false,
      isShown: true,
      weeks,
    },
    {
      id: uuid(),
      title: 'Artes',
      isDone: false,
      isShown: true,
      weeks,
    },
  ];

  return response.json(subjects);
};
