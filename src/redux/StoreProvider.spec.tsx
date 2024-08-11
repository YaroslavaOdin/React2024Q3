import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StoreProvider } from "./StoreProvider";

describe('StoreProvider Component', () => {
    it('renders children components and provides the Redux store', () => {
        const ChildComponent = () => <div data-testid="child">Child Component</div>;

        const { getByTestId } = render(
            <StoreProvider>
                <ChildComponent />
            </StoreProvider>
        );

        expect(getByTestId('child')).toBeInTheDocument();
    });
});
