export interface Card {
  boardId: string;
  cardId: string;
  cardTitle: string;
  description: string;
  priority: string;
  tags: [];
  createdOn: string;
}

export interface Board {
  id: string;
  name: string;

  cards: Card[];
}
