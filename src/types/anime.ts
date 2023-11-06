type Nullable<T> = T | null;

type AnimeImage = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
};

type AnimePropDate = {
  day: Nullable<number>;
  month: Nullable<number>;
  year: Nullable<number>;
};

type AnimeGeneralData = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

export type Anime = {
  mal_id: number;
  url: string;
  images: {
    jpg: AnimeImage;
    webp: AnimeImage;
  };
  trailer: {
    youtube_id: Nullable<string>;
    url: Nullable<string>;
    embed_url: Nullable<string>;
    images: {
      image_url: Nullable<string>;
      small_image_url: Nullable<string>;
      medium_image_url: Nullable<string>;
      large_image_url: Nullable<string>;
      maximum_image_url: Nullable<string>;
    };
  };
  approved: boolean;
  titles: {
    type: string;
    title: string;
  }[];
  title: string;
  title_english: Nullable<string>;
  title_japanese: string;
  title_synonyms: string[];
  type: Nullable<string>;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: {
    from: Nullable<string>;
    to: Nullable<string>;
    prop: {
      from: AnimePropDate;
      to: AnimePropDate;
    };
    string: string;
  };
  duration: string;
  rating: Nullable<string>;
  score: Nullable<number>;
  scored_by: Nullable<number>;
  rank: Nullable<number>;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: Nullable<string>;
  season: Nullable<string>;
  year: Nullable<number>;
  broadcast: {
    day: Nullable<string>;
    time: Nullable<string>;
    timezone: Nullable<string>;
    string: Nullable<string>;
  };
  producers: AnimeGeneralData[];
  licensors: AnimeGeneralData[];
  studios: AnimeGeneralData[];
  genres: AnimeGeneralData[];
  explicit_genres: AnimeGeneralData[];
  themes: AnimeGeneralData[];
  demographics: AnimeGeneralData[];
};

export type AnimeFull = Anime & {
  relations: {
    relation: string;
    entry: {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }[];
  }[];
  theme: {
    openings: string[];
    endings: string[];
  };
  external: {
    name: string;
    url: string;
  }[];
  streaming: {
    name: string;
    url: string;
  }[];
};

export type AnimeSearchResponse = {
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
  data: Anime[];
};

export type AnimeFullResponse = {
  data: AnimeFull;
};

export type RandomAnimeResponse = {
  data: Anime;
};
