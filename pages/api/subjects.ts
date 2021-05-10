import { NowRequest, NowResponse } from "@vercel/node";
import { v4 as uuid } from "uuid";

interface Week {
  id: string;
  label: string;
  isDone: boolean;
}

interface Subject {
  id: string;
  title: string;
  isDone: boolean;
  isShown: boolean;
  weeks: Week[];
}

export default (request: NowRequest, response: NowResponse) => {

  const weeks: Week[] = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Atividade 1', 'Atividade 2', 'Atividade 3', 'Atividade 4', 'Avaliação 5,0 Pontos', 'Bimestral'].map(item => ({
    id: uuid(),
    label: item,
    isDone: false,
  }));


  const subjects: Subject[] = [
    'Português', 'Inglês', 'História', 'Geografia', 'Matemática', 'Fisica', 'Quimica', 'Arte', 'Filosofia', 'Educação Física',
  ].map(item => ({
    id: uuid(),
    title: item,
    isDone: false,
    isShown: false,
    weeks,
  }));

  return response.json(subjects);
};
