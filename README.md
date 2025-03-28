<h1 align="center">Note-Keeping API Updated</h1>

<p align="center">Note-Keeping API Updated (Node,express,Typescript,mongoDB) {console.log(body)}</p>

---

### **Breakdown of the Note-Keeping API**

#### **1. Project Structure**
The API is structured into the following components:

```
src/
├── index.ts                # Entry point for the application
├── controllers/            # Handles request logic
├── services/               # Defines data services and methods (e.g., getNotes)
├── models/                 # Defines data models (e.g., Note, Category)
├── routes/                 # Defines API endpoints
├── middlewares/            # Custom middleware (e.g., validation, logging)
└── utils/                  # Utility functions (e.g., error handling, API responses)

#### The files 

src/
├── models/
│   ├── Category.ts
│   └── Note.ts
│   └── User.ts
├── services/
│   └── noteServices.ts
│   ├── AuthServices.ts
├── controllers/
│   └── noteControllers.ts
│   └── authControllers.ts
├── middlewares/
│   └── validateNotes.ts
│   ├── logger.ts
│   └── authMiddlewares.ts
├── routes/
│   └── noteRoutes.ts
│   └── authRoutes.ts
├── utils/
│   ├── errorHandler.ts
│   ├── validationUtils.ts
│   └── apiResponse.ts
├── index.ts
├── env/
└── README.md
```

---

#### **2. Key Files and Their Roles**

| **File/Folder**       | **Purpose**                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| **`index.ts`**        | Entry point for the app. Sets up Express, connects to MongoDB, and starts the server. |
| **`controllers/`**    | Contains logic for handling requests (e.g., CRUD operations for notes).     |
| **`models/`**         | Defines Mongoose schemas and interfaces for `Note` and `Category`.          |
| **`services/`**       | Defines the methods for the app, it uses the models that has been defined           |
| **`routes/`**         | Defines API endpoints and links them to controllers.                        |
| **`middlewares/`**    | Custom middleware for validation (`validateNote`) and logging (`logger`).   |
| **`utils/`**          | Utility functions for error handling, API responses, and logging.           |

---

#### **3. Key Features**
- **CRUD Operations**: Create, read, update, and delete notes.
- **Validation**: Middleware to validate note data (e.g., `title` and `content` are required).
- **Logging**: Middleware to log API requests.
- **Error Handling**: Centralized error handling for consistent API responses.
- **TypeScript**: Strongly typed code for better maintainability and fewer runtime errors.

---

## **Setup**

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Set Environment Variables**:
   Create a `.env` file in the root directory and add:
   ```env
   MONGODB_URI=mongodb://localhost:27017/notesdb
   PORT=5000
   ```

3. **Run the Application**:
   ```bash
   npm run dev
   ```

4. **Build the Project** (Optional):
   ```bash
   npm run build
   ```

---

## **API Endpoints**

| **Method** | **Endpoint**                  | **Description**                        |
|------------|-------------------------------|----------------------------------------|
| `GET`      | `/login`                      | login user                             |
| `GET`      | `/register`                   | register User                          |
---

## **Deployment**

Deployed on **Render**:
1. Push your code to GitHub.
2. Connect your repository to Render: "https://task13-gzn2.onrender.com"
3. Set the build command to `npm run dev`.

---

## **Contributing**

Feel free to contribute to this project by opening issues or submitting pull requests.

Link to the deployed work: https://task13-gzn2.onrender.com
---# Task13
