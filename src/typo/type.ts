export interface Card {
  boardId: string;
  cardId: string;
  cardTitle: string;
  description: string;
  priority: string;
  tags: string[];
  createdOn: string;
}

export interface Board {
  id: string;
  name: string;

  cards: Card[];
}
