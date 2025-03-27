import express from "express";
import applySecurity from "./security.js";
import routes from "./routes.js";

const app = express();
app.use(express.json());

applySecurity(app);
app.use("/social_credit/api", routes);

const PORT = 5700;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/social_credit/api`));
