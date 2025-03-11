import app from "./app.js";
import { PORT } from "./src/config/config.js";
import connectDB from "./src/config/connectDB.js";
import chalk from 'chalk';

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(chalk.green(`server run success on http://localhost:${chalk.blueBright(PORT)}`));
    });
});