import { ReactNode } from "react";

export interface Character {
  uid: number;
  name: string;
  gender: string;
  yearOfBirth: string;
  yearOfDeath: string;
  monthOfBirth: string;
  dayOfBirth: string;
  placeOfBirth: string;
  maritalStatus: string;
}

export interface Result {
  characters: Character[];
  page: {
    totalPages: number;
  };
}

export interface ThemeContextType {
  theme: string;
  changeTheme: () => void;
}

export interface ThemeProps {
  children: ReactNode;
}

export interface StoreReducer {
  selectedItems: {
    selectedItems: Character[];
  };
}

export interface IResponse {
  dataFromServer: {
    characters: Character[];
    page: {
      pageNumber: number;
      pageSize: number;
      numberOfElements: number;
      totalElements: number;
      totalPages: number;
      firstPage: boolean;
      lastPage: boolean;
    };
    sort: {
      clauses: string[];
    };
  };
  dataByIdFromServer: {
    characters: Character[];
    page: {
      pageNumber: number;
      pageSize: number;
      numberOfElements: number;
      totalElements: number;
      totalPages: number;
      firstPage: boolean;
      lastPage: boolean;
    };
    sort: {
      clauses: string[];
    };
  };
}
