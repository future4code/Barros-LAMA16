import dotenv from "dotenv";
import {AddressInfo} from "net";
import express from "express";
import { userRouter } from "./routes/userRouter";
import { bandsRouter } from "./routes/bandsRouter";
import { showRouter } from "./routes/showRouter";
import { ticketRouter } from "./routes/ticketRouter";
import { purchaseRouter } from "./routes/purchaseRouter";
dotenv.config();
const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/Bands", bandsRouter)
app.use('/shows', showRouter)
app.use('/tickets', ticketRouter)
app.use('/tickets', purchaseRouter)

const server = app.listen(3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
  });