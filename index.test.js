// Simple test example
const suma = (a, b) => a + b;

describe("Prueba", () => {
  describe("Suma", () => {
    test("suma 2 numeros", () => {
      expect(suma(1, 2)).toEqual(3);
    });
  });
});
