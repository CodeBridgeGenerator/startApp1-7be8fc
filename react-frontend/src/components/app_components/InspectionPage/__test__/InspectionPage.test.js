import React from "react";
import { render, screen } from "@testing-library/react";

import InspectionPage from "../InspectionPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders inspection page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InspectionPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("inspection-datatable")).toBeInTheDocument();
    expect(screen.getByRole("inspection-add-button")).toBeInTheDocument();
});
