import * as dotenv from "dotenv";
dotenv.config();
import express from 'express';
import oauthRoutes from './Routes/oauthRoute';

const app = express();
const PORT =process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes
app.use('/api/oauth', oauthRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});