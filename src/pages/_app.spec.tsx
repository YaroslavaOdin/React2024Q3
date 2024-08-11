import "@testing-library/jest-dom/extend-expect";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import App from "./_app";

describe("App Component", () => {
    it('should wrap components with ThemeProvider', () => {
        const mockComponent = () => <div>Component</div>;
        const pageProps = {}; // Замените на ваши props для страницы

        const { getByText } = render(
            <App Component={mockComponent} pageProps={pageProps} />
        );


        expect(getByText('Component')).toBeInTheDocument(); // Проверка, что компонент рендерится
    });
});
