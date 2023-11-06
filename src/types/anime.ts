export type Anime = {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  trailer: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
    images: {
      image_url: string | null;
      small_image_url: string | null;
      medium_image_url: string | null;
      large_image_url: string | null;
      maximum_image_url: string | null;
    };
  };
  approved: boolean;
  titles: {
    type: string;
    title: string;
  }[];
  title: string;
  title_english: string | null;
  title_japanese: string;
  title_synonyms: string[] | never[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: {
    from: string;
    to: string | null;
    prop: {
      from: {
        day: number;
        month: number;
        year: number;
      };
      to: {
        day: number | null;
        month: number | null;
        year: number | null;
      };
    };
    string: string;
  };
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number | null;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string | null;
  season: string | null;
  year: number | null;
  broadcast: {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
  };
  producers:
    | {
        mal_id: number;
        type: string;
        name: string;
        url: string;
      }[]
    | never[];
  licensors:
    | {
        mal_id: number;
        type: string;
        name: string;
        url: string;
      }[]
    | never[];
  studios:
    | {
        mal_id: number;
        type: string;
        name: string;
        url: string;
      }[]
    | never[];
  genres:
    | {
        mal_id: number;
        type: string;
        name: string;
        url: string;
      }[]
    | never[];
  explicit_genres:
    | {
        mal_id: number;
        type: string;
        name: string;
        url: string;
      }[]
    | never[];
  themes:
    | {
        mal_id: number;
        type: string;
        name: string;
        url: string;
      }[]
    | never[];
  demographics:
    | {
        mal_id: number;
        type: string;
        name: string;
        url: string;
      }[]
    | never[];
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

export type AnimeResponse = {
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
  data: Anime[] | never[];
};

export type AnimeFullResponse = {
  data: AnimeFull;
};

export type RandomAnimeResponse = {
  data: Anime;
};
