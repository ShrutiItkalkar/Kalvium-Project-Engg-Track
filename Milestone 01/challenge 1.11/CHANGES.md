# Changes Documentation

## Section 1 - Variable Renames

| Old Name | New Name | Why |
|---|---|---|
| d | confessionData | Represents request body clearly |
| r | requestParams | Represents route parameters |
| arr | sortedConfessions | Describes sorted list of confessions |
| x | confessionIdCounter | Used to generate unique IDs |
| res2 | deletedItem | Represents deleted confession |

---

## Section 2 - Function Splits

### handleAll() split into:

- createConfession() - handles validation and creation of confession
- getAllConfessions() - retrieves all confessions
- getConfessionById() - retrieves a single confession by ID
- getConfessionsByCategory() - filters confessions by category
- deleteConfession() - deletes a confession with authorization

### Why:
The original function handled multiple responsibilities (CRUD operations, validation, filtering).  
Splitting improves readability, maintainability, and testability.