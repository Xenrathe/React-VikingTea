import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "../src/routes.jsx";

//Green link test
test("clicking Green link shows Matcha", async () => {
  const user = userEvent.setup();

  // Create a memory router from the actual routes
  const memoryRouter = createMemoryRouter(routes, { initialEntries: ["/"] });

  render(<RouterProvider router={memoryRouter} />);

  // Click the Green link
  await user.click(screen.getByRole("link", { name: /green/i }));

  // Check for text in the Green shelf
  expect(await screen.findByText(/matcha/i)).toBeInTheDocument();
});

//Oolong link test
test("clicking Oolong link shows Iron Goddess of Mercy", async () => {
  const user = userEvent.setup();

  // Create a memory router from the actual routes
  const memoryRouter = createMemoryRouter(routes, { initialEntries: ["/"] });

  render(<RouterProvider router={memoryRouter} />);

  // Click the Green link
  await user.click(screen.getByRole("link", { name: /oolong/i }));

  // Check for text in the Green shelf
  expect(await screen.findByText(/iron goddess/i)).toBeInTheDocument();
});