export interface Card {
  cardId: string;
  cardTitle: string;
  description: string;
  status: string;
  priority: "low" | "medium" | "high" | "zen";
  tags: string[];
  createdOn: string;
}

export interface Board {
  id: string;
  name: string;

  cards: Card[];
}

export type CardFormValues = {
  cardId: string;
  cardTitle: string;
  description?: string;
  status: string;
  priority: "low" | "medium" | "high" | "zen";
  tags: string[];
  createdOn: string;
};
