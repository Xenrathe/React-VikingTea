import { describe, it, expect } from "vitest";
import { render, screen, findByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "../src/routes.jsx";

describe("Navbar + Middle component", () => {
  it("renders a Matcha tea when user clicks Green nav link"),
    async () => {
      const user = userEvent.setup();

      // Create a memory router from the actual routes
      const memoryRouter = createMemoryRouter(routes, {
        initialEntries: ["/"],
      });

      render(<RouterProvider router={memoryRouter} />);

      // Click the Green link
      await user.click(screen.getByRole("link", { name: /green/i }));

      // Check for text in the Green shelf
      expect(await screen.findByText(/matcha/i)).toBeInTheDocument();
    };

  it("renders Iron Goddess when user clicks Oolong nav link"),
    async () => {
      const user = userEvent.setup();

      // Create a memory router from the actual routes
      const memoryRouter = createMemoryRouter(routes, {
        initialEntries: ["/"],
      });

      render(<RouterProvider router={memoryRouter} />);

      // Click the Oolong link
      await user.click(screen.getByRole("link", { name: /oolong/i }));

      // Check for text in the Oolong shelf
      expect(await screen.findByText(/iron goddess/i)).toBeInTheDocument();
    };

  it("renders Earl Grey tea item when user clicks Oolong nav link"),
    async () => {
      const user = userEvent.setup();

      // Create a memory router from the actual routes
      const memoryRouter = createMemoryRouter(routes, {
        initialEntries: ["/"],
      });

      render(<RouterProvider router={memoryRouter} />);

      // Click the Black link
      await user.click(screen.getByRole("link", { name: /black/i }));

      // Check for text in the Black shelf
      expect(await screen.findByText(/earl grey/i)).toBeInTheDocument();
    };

  it("renders a teapot item when user clicks Teaware nav link"),
    async () => {
      const user = userEvent.setup();

      // Create a memory router from the actual routes
      const memoryRouter = createMemoryRouter(routes, {
        initialEntries: ["/"],
      });

      render(<RouterProvider router={memoryRouter} />);

      // Click the Teaware link
      await user.click(screen.getByRole("link", { name: /teaware/i }));

      // Check for text in the Teaware shelf
      expect(await screen.findByText(/teapot/i)).toBeInTheDocument();
    };
});

describe("URL Routing", () => {
  it("loads the correct product (Matcha) when deep linking (/green/matcha)"),
    async () => {
      const memoryRouter = createMemoryRouter(routes, {
        initialEntries: ["/green/matcha"],
      });
      render(<RouterProvider router={memoryRouter} />);

      const itemDisplay = document.querySelector("#item-display");
      expect(await findByText(itemDisplay, /matcha/i)).toBeInTheDocument();
    };

  it("renders error shelf when trying to route to non-existent shelf"),
    async () => {
      const memoryRouter = createMemoryRouter(routes, {
        initialEntries: ["/apple"],
      });
      render(<RouterProvider router={memoryRouter} />);

      expect(
        await screen.findByText(/this page does not exist/i)
      ).toBeInTheDocument();
    };
});

describe("Item Display / Shopping Item", () => {
  it(" adds correct quantity to cart"),
    async () => {
      const user = userEvent.setup();

      const memoryRouter = createMemoryRouter(routes, {
        initialEntries: ["/green/matcha"],
      });

      render(<RouterProvider router={memoryRouter} />);

      // Increase quantity x2, then decrease quantity x1
      await user.click(screen.getByRole("button", { name: "+" }));
      await user.click(screen.getByRole("button", { name: "+" }));
      await user.click(screen.getByRole("button", { name: "-" }));

      // Add to cart
      await user.click(screen.getByRole("button", { name: /add to cart/i }));

      // Cart count should update (your UI shows item count in the top bar)
      const topbanner = document.querySelector("#top-banner");
      expect(topbanner.getByText("2")).toBeInTheDocument();
    };

  it(" adds correct quantity and item to the Dragon Cart side-cart"),
    async () => {
      const user = userEvent.setup();

      const memoryRouter = createMemoryRouter(routes, {
        initialEntries: ["/green/matcha"],
      });

      render(<RouterProvider router={memoryRouter} />);

      // Increase quantity x2, then decrease quantity x1
      await user.click(screen.getByRole("button", { name: "+" }));
      await user.click(screen.getByRole("button", { name: "+" }));
      await user.click(screen.getByRole("button", { name: "-" }));

      // Add to cart
      await user.click(screen.getByRole("button", { name: /add to cart/i }));

      //Open the side-cart
      await user.click(screen.getByAltText("shopping-cart-button"));

      // Cart count should update (your UI shows item count in the top bar)
      const topbanner = document.querySelector("#top-banner");
      expect(topbanner.getByText("2")).toBeInTheDocument();
      expect(topbanner.getByText(/matcha/i)).toBeInTheDocument();
    };

  it(
    " adds correct subtotal (item and cost) to the Dragon Cart side-cart for multiple items"
  ),
    () => {
      const greenItems = ["matcha", "sencha"];
      let totalExpectedCost = 0;

      greenItems.forEach((item) => {
        async () => {
          const user = userEvent.setup();

          const memoryRouter = createMemoryRouter(routes, {
            initialEntries: [`/green/${item}`],
          });

          render(<RouterProvider router={memoryRouter} />);
          await user.click(screen.getByRole("button", { name: "+" }));

          const itemCost = parseFloat(
            document
              .querySelector("#rc-cost")
              .textContent.replace(/[^0-9.]/g, "")
          );
          totalExpectedCost += itemCost * 2;

          // Add to cart
          await user.click(
            screen.getByRole("button", { name: /add to cart/i })
          );

          //Open the side-cart
          await user.click(screen.getByAltText("shopping-cart-button"));
        };
      });

      // subtotals should show total money and 4 items
      const subtotals = document.querySelector("#sc-subtotal");
      expect(subtotals.getByText(`$${totalExpectedCost}`)).toBeInTheDocument();
      expect(subtotals.getByText("4 items")).toBeInTheDocument();
    };
});
