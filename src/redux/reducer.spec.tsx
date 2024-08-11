import "@testing-library/jest-dom/extend-expect";
import { describe, expect, it } from "vitest";
import {
  selectedItemsReducer,
  selectItem,
  unselectAllItems,
  unselectItem,
} from "./reducer";

describe("selectedCardsSlice", () => {
  const mockCharacter = {
    name: "James T. Kirk",
    uid: 1,
    gender: "Male",
    yearOfBirth: "2233",
    monthOfBirth: "3",
    dayOfBirth: "22",
    placeOfBirth: "Iowa, Earth",
    maritalStatus: "Single",
    yearOfDeath: "",
  };

  it("add character to selectedCards", () => {
    const initialState = { selectedItems: [] };
    const nextState = selectedItemsReducer(
      initialState,
      selectItem(mockCharacter),
    );
    expect(nextState.selectedItems).toEqual([mockCharacter]);
  });

  it("delete character from selectedCards", () => {
    const initialState = { selectedItems: [mockCharacter] };

    const nextState = selectedItemsReducer(
      initialState,
      unselectItem(mockCharacter),
    );

    expect(nextState.selectedItems).toEqual([]);
  });

  it("delete character from selectedCards", () => {
    const initialState = { selectedItems: [mockCharacter] };

    const nextState = selectedItemsReducer(initialState, unselectAllItems());

    expect(nextState.selectedItems).toEqual([]);
  });
});
