import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders hero headline", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", {
        name: /Películas, series y más ilimitadas/i,
      })
    ).toBeInTheDocument();
  });
});
