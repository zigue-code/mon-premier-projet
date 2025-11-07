import express , { Response,Request, NextFunction} from 'express';
import mongoose from 'mongoose';
import Book from './book.model';
import bodyParser from 'body-parser';

const app = express();

// CORS Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
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

app.use(bodyParser.json());
const uri='mongodb://localhost:27017/BIBLIOTHEQUE';
mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});
app.get('/', (req:Request, res:Response) => {
    res.send('Hello Express');  
});
app.get('/books', async (req:Request, res:Response) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/books/:id', async (req:Request, res:Response) => {
    try {
        const books = await Book.findById(req.params.id);
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});
// Create a new book
app.post('/books', async (req:Request, res:Response) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a book by ID
app.put('/books/:id', async (req: Request, res: Response) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send("updated successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/books/:id', async (req:Request, res:Response) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.send("deleted successfully");
    } catch (error) {
        res.status(500).send(error);
    }   
});
 
// Paginated books endpoint
// get http://localhost:3000/pbooks?page=1&limit=5
app.get('/pbooks', async (req:Request, res:Response) => {
    try {
        const options = {
            page: parseInt(req.query.page as string) || 1, 
            limit: parseInt(req.query.limit as string) || 5,
        };
        const result = await (Book as any).paginate({}, options);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

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
app.get('/books-search', async (req:Request, res:Response) => {
    try {
        const keyword = req.query.kw as string || '';
        const books = await Book.find({
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
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
