export interface Card {
  boardId: string;
  cardId: string;
  cardTitle: string;
  description: string;
  status: string | null;
  priority: string;
  tags: string;
  createdOn: string;
}

export interface Board {
  id: string;
  name: string;

  cards: Card[];
}
