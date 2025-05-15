// tests/ProductCard.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../src/components/ProductCard";
import { useCartStore } from "../src/store/useCartStore";

// Мокаем хранилище корзины
jest.mock("../src/store/useCartStore");

const mockProduct = {
  id: "1",
  name: "Test Product",
  description: "Test Description",
  price: 9.99,
  image: "test.jpg",
};

describe("ProductCard", () => {
  const mockAddItem = jest.fn();  // Мок-функция для addItem

  beforeEach(() => {
    // Настраиваем мок хранилища перед каждым тестом
    (useCartStore as unknown as jest.Mock).mockImplementation(() => ({
      addItem: mockAddItem,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();  // Очищаем моки после каждого теста
  });

  it("правильно отображает информацию о продукте", () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
  });

  it("вызывает addItem при нажатии кнопки 'Add to Cart'", () => {
    render(<ProductCard product={mockProduct} />);
    
    fireEvent.click(screen.getByText("Add to Cart"));
    
    // Проверяем, что addItem был вызван с правильными аргументами
    expect(mockAddItem).toHaveBeenCalledWith({
      id: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
    });
  });
});
