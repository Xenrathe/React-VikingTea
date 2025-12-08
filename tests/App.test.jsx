import { describe, it, expect } from "vitest";
import {
  render,
  screen,
  findByText,
  getByRole,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "../src/routes.jsx";
import { blackTeas } from "../src/data/products-black.js";
import { greenTeas } from "../src/data/products-green.js";
import { oolongTeas } from "../src/data/products-oolong.js";
import { teaware } from "../src/data/products-teaware.js";
import { slugify } from "../src/UtilityFunctions.js";

afterEach(() => {
  localStorage.clear();
  cleanup();
});

function setupRouter(initial = "/") {
  return createMemoryRouter(routes, { initialEntries: [initial] });
}

describe("Navbar + Middle component", () => {
  it("renders an item from green tea data when user clicks Green nav link", async () => {
    const user = userEvent.setup();

    // Create a memory router from the actual routes
    const memoryRouter = setupRouter();

    render(<RouterProvider router={memoryRouter} />);

    // Click the Green link
    await user.click(screen.getByRole("link", { name: /green/i }));

    // Check for text in the Green shelf
    const teaItemName = greenTeas[0].Name;
    expect(await screen.findByText(teaItemName)).toBeInTheDocument();
  });

  it("renders the first oolong item when user clicks Oolong nav link", async () => {
    const user = userEvent.setup();

    // Create a memory router from the actual routes
    const memoryRouter = setupRouter();
    render(<RouterProvider router={memoryRouter} />);

    // Click the Oolong link
    await user.click(screen.getByRole("link", { name: /oolong/i }));

    // Check for text in the Oolong shelf
    const teaItemName = oolongTeas[0].Name;
    expect(await screen.findByText(teaItemName)).toBeInTheDocument();
  });

  it("renders the first oolong tea item when user clicks Oolong nav link", async () => {
    const user = userEvent.setup();

    // Create a memory router from the actual routes
    const memoryRouter = setupRouter();
    render(<RouterProvider router={memoryRouter} />);

    // Click the Black link
    await user.click(screen.getByRole("link", { name: /black/i }));

    // Check for text in the Black shelf
    const teaItemName = blackTeas[0].Name;
    expect(await screen.findByText(teaItemName)).toBeInTheDocument();
  });

  it("renders the first teapot item when user clicks Teaware nav link", async () => {
    const user = userEvent.setup();

    // Create a memory router from the actual routes
    const memoryRouter = setupRouter();
    render(<RouterProvider router={memoryRouter} />);

    // Click the Teaware link
    await user.click(screen.getByRole("link", { name: /teaware/i }));

    // Check for text in the Teaware shelf
    const teaItemName = teaware[0].Name;
    expect(await screen.findByText(teaItemName)).toBeInTheDocument();
  });
});

describe("URL Routing", () => {
  it("loads the correct product when deep linking (/green/TEAITEM)", async () => {
    const teaItem = greenTeas[0];
    const memoryRouter = setupRouter(`/green/${slugify(teaItem.Name)}`);
    render(<RouterProvider router={memoryRouter} />);

    const itemDisplay = document.querySelector("#item-display");
    expect(
      await findByText(itemDisplay, `${teaItem.Name}`)
    ).toBeInTheDocument();
    expect(
      await findByText(itemDisplay, `${teaItem.Description}`)
    ).toBeInTheDocument();
  });

  it("renders error shelf when trying to route to non-existent shelf", async () => {
    const memoryRouter = setupRouter("/asdasfasd");
    render(<RouterProvider router={memoryRouter} />);

    expect(
      await screen.findByText(/this page does not exist/i)
    ).toBeInTheDocument();
  });
});

describe("Item Display / Shopping Item", () => {
  it(" adds correct quantity to cart", async () => {
    const user = userEvent.setup();

    const teaItem = greenTeas[0];
    const memoryRouter = setupRouter(`/green/${slugify(teaItem.Name)}`);
    render(<RouterProvider router={memoryRouter} />);

    // Increase quantity x2, then decrease quantity x1
    const itemDisplay = document.querySelector("#item-display");
    await user.click(getByRole(itemDisplay, "button", { name: "+" }));
    await user.click(getByRole(itemDisplay, "button", { name: "+" }));
    await user.click(getByRole(itemDisplay, "button", { name: "-" }));

    // Add to cart
    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    // Cart count should update (your UI shows item count in the top bar)
    const topbanner = document.querySelector("#top-banner");
    expect(await findByText(topbanner, "2")).toBeInTheDocument();
  });

  it(" adds correct quantity and item to the Dragon Cart side-cart", async () => {
    const user = userEvent.setup();

    const teaItem = greenTeas[0];
    const memoryRouter = setupRouter(`/green/${slugify(teaItem.Name)}`);
    render(<RouterProvider router={memoryRouter} />);

    // Increase quantity x2, then decrease quantity x1
    const itemDisplay = document.querySelector("#item-display");
    await user.click(getByRole(itemDisplay, "button", { name: "+" }));
    await user.click(getByRole(itemDisplay, "button", { name: "+" }));
    await user.click(getByRole(itemDisplay, "button", { name: "-" }));
    await user.click(
      getByRole(itemDisplay, "button", { name: /add to cart/i })
    );

    //Open the side-cart
    await user.click(screen.getByAltText("shopping-cart-button"));

    // Cart count should update (your UI shows item count in the top bar)
    const scitems = document.querySelector("#sc-items");
    expect(await findByText(scitems, "2")).toBeInTheDocument();
    expect(await findByText(scitems, teaItem.Name)).toBeInTheDocument();
  });

  it(" adds correct subtotal (item and cost) to the Dragon Cart side-cart for multiple items", async () => {
    const greenItems = [greenTeas[0], greenTeas[1]];
    let totalExpectedCost = 0;
    const user = userEvent.setup();

    for (const item of greenItems) {
      cleanup();

      const memoryRouter = setupRouter(`/green/${slugify(item.Name)}`);
      render(<RouterProvider router={memoryRouter} />);

      const itemDisplay = document.querySelector("#item-display");
      await user.click(getByRole(itemDisplay, "button", { name: "+" }));

      const itemCost = item.Pkgs[0].Cost;
      totalExpectedCost += itemCost * 2;

      // Add to cart
      await user.click(
        getByRole(itemDisplay, "button", { name: /add to cart/i })
      );
    }

    //Open the side-cart
    await user.click(screen.getByAltText("shopping-cart-button"));

    // subtotals should show total money and 4 items
    const subtotals = document.querySelector("#sc-subtotal");
    expect(
      await findByText(subtotals, `$${totalExpectedCost}`)
    ).toBeInTheDocument();
    expect(
      await findByText(subtotals, "Subtotal (4 items)")
    ).toBeInTheDocument();
  });
});

describe("Bottom Component / Animation", () => {
  it(" creates a floating box when item added to cart", async () => {
    const user = userEvent.setup();

    const teaItem = greenTeas[0];
    const memoryRouter = setupRouter(`/green/${slugify(teaItem.Name)}`);
    render(<RouterProvider router={memoryRouter} />);

    // Add to cart
    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    // Cart count should update (your UI shows item count in the top bar)
    expect(await screen.findByAltText("floating tea box")).toBeInTheDocument();
  });
});
