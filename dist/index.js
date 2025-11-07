"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const book_model_1 = __importDefault(require("./book.model"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
// CORS Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    next();
});
app.use(body_parser_1.default.json());
const uri = 'mongodb://localhost:27017/BIBLIOTHEQUE';
mongoose_1.default.connect(uri).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});
app.get('/', (req, res) => {
    res.send('Hello Express');
});
app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_model_1.default.find();
        res.send(books);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.get('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_model_1.default.findById(req.params.id);
        res.send(books);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// Create a new book
app.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = new book_model_1.default(req.body);
        yield book.save();
        res.status(201).send(book);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// Update a book by ID
app.put('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send("updated successfully");
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.delete('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield book_model_1.default.findByIdAndDelete(req.params.id);
        res.send("deleted successfully");
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// Paginated books endpoint
// get http://localhost:3000/pbooks?page=1&limit=5
app.get('/pbooks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 5,
        };
        const result = yield book_model_1.default.paginate({}, options);
        res.send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// get http://localhost:3000/books-search?kw=page=1&limit=5
/* explication de la blogue
This code defines an Express.js route handler for
searching books in a MongoDB database based on a
 keyword provided as a query parameter (kw). When
 a GET request is made to the /books-search endpoint
  with a kw parameter, the handler performs the following steps:
1. It retrieves the keyword from the query parameters. If no keyword is provided, it defaults to an empty string.
2. It uses the Mongoose Book model to search for books where the title matches the provided keyword.
The search is case-insensitive due to the use of the $options: 'i' flag in the regular expression.
3. If matching books are found, they are sent back in the response.
4. If an error occurs during the process, a 500 status code along with the error message is returned.
*/
app.get('/books-search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keyword = req.query.kw || '';
        const books = yield book_model_1.default.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
            ]
        });
        res.send(books);
    }
    catch (error) {
        res.status(500).
            send(error);
    }
}));
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
