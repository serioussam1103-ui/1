
export type AppStage = 'question' | 'gift-selection' | 'view-gift';

export interface Gift {
  id: number;
  title: string;
  description: string;
}

export enum GiftType {
  ART = 1,
  PLAYER = 2,
  DREAMS = 3
}
