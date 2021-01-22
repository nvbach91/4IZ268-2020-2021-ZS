export const statusCodesMap = Object.freeze<Record<number, string>>({
  200: "Cool links you've got there",
  201: 'Your generated link!',
  401: 'Invalid credentials',
  409: 'This link already exists',
  500: 'Invalid inputs',
})