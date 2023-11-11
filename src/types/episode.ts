type Nullable<T> = T | null;

export type Episode = {
  mal_id: number;
  url: string;
  title: string;
  title_japanese: Nullable<string>;
  title_romanji: Nullable<string>;
  aired: Nullable<string>;
  score: number;
  filler: boolean;
  recap: boolean;
  forum_url: string;
};

type Pagination = {
  last_visible_page: number;
  has_next_page: boolean;
};

export type EpisodeListResponse = {
  pagination: Pagination;
  data: Episode[];
};
