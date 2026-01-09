export interface Card {
  id: string;
  name: string;
  priority: string;
  tags: [];
}

export interface Board {
  id: string;
  name: string;

  cards: Card[];
}
