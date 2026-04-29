# Pre-Refactor Audit

## 1. Poor Variable Naming
- Variable `d` is used for request body and is not descriptive
- Variable `r` is used for request parameters and is unclear
- Variable `arr` is used for storing sorted confessions but does not describe content
- Variable `x` is used as an ID counter but is not meaningful
- Variable `res2` is used for deleted item but is unclear

## 2. Monolithic Function
- Function `handleAll()` performs multiple responsibilities:
  - Creating a confession
  - Fetching all confessions
  - Fetching a single confession
  - Filtering by category
  - Deleting a confession
- This violates the Single Responsibility Principle

## 3. No Separation of Concerns
- All logic is inside a single file (`app.js`)
- Routes, business logic, and data handling are tightly coupled

## 4. Hardcoded Values
- Port `3000` is hardcoded
- Delete token `supersecret123` is hardcoded
- Categories array is repeated in multiple places

## 5. Deep Nested Conditionals
- The create confession logic contains multiple nested `if` statements
- This reduces readability and maintainability

## 6. No Comments
- There are no comments explaining why logic is implemented

## 7. Duplicate Logic
- Category validation logic is repeated
- Similar validation patterns are used multiple times

## 8. No Folder Structure
- The application does not follow MVC or modular structure
- Everything is written in a single file