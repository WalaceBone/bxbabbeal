import { readFile } from "./files";

jest.mock('fs');

test("Sanity check", () => {
    expect(true).toBe(true);
});

test('reads a file', () => {
  const mockFileContent = `First Name,Last Name,Email,ZIP Code
  1,2,3,4
  ,,,
  `;
  const data = readFile('../tests/test.csv');
  
  expect(data).toEqual(mockFileContent);
});