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
  totalPages: number;
}
