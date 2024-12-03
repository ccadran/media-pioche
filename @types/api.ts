export interface Article {
  id: number;
  title: string;
  cover: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  author: string;
  lecture_time: number;
  week: number;
  theme: string;
}

export interface suggestedArticles {
  id: number;
  title: string;
  cover: string;
  media: string;
  date: string;
  article_id: number;
}

export interface Week {
  id: number;
  cover: string;
  date: string;
}
