export interface Pokemon {
    name: string;
    url: string;
  }
  
  export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
  }
  
  export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
      front_default: string;
      other?: {
        'official-artwork'?: {
          front_default: string;
        };
      };
    };
    types: Array<{
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }>;
    abilities: Array<{
      ability: {
        name: string;
        url: string;
      };
      is_hidden: boolean;
      slot: number;
    }>;
  }
  