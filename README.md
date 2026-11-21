# Library App

A mini project built with React Native (Expo) and Firebase. Members can search for books, borrow them for 14 days, and return them.

## Features

- Registration and Login (Firebase Authentication)
- Borrowed books saved per user (Firebase Firestore)
- Book search using the Open Library API (no API key needed)
- Navigation between screens (React Navigation: stack and bottom tabs)
- UI library: React Native Paper

## Screens (7)

1. Splash screen (app icon)
2. Login
3. Register
4. Home (search books from the API)
5. Book Details (Borrow button)
6. Borrowed Books (list with due date and Return button)
7. Profile (user info and Logout)

## Tech Stack

- React Native with Expo
- Firebase Authentication and Firestore
- Open Library API
- React Navigation
- React Native Paper

## How to Run

1. Install Node.js and the **Expo Go** app on your phone.
2. Clone this repository:

   ```
   git clone https://github.com/diascarol25/LibraryApp.git
   cd LibraryApp
   ```

3. Install the packages:

   ```
   npm install
   ```

4. Start the app:

   ```
   npx expo start
   ```

5. Scan the QR code with Expo Go (phone and laptop on the same Wi-Fi).

## How to Use

1. Register a new account, then log in.
2. Search for a book on the Home tab and tap it.
3. Tap **Borrow this book**. The due date is 14 days from today.
4. Open the **Borrowed** tab to see your books and tap **Return** to give one back.
5. Use the **Profile** tab to log out.

## Author

Carol