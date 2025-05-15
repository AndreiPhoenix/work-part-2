// src/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  // Главный компонент-обёртка
    errorElement: <ErrorPage />,  // Страница ошибок
    children: [  // Вложенные маршруты
      { index: true, element: <HomePage /> },  // Главная страница
      { path: "products/:id", element: <ProductPage /> },  // Страница продукта
      { path: "cart", element: <CartPage /> },  // Корзина
    ],
  },
]);
