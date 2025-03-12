// server.ts
import express, { Request, Response } from "express";
import pool from "./Databases/file";

const app = express();

app.use(express.json());

app.post("/api/contact", (req: Request, res: Response) => {
  const { email, phone } = req.body;
  pool.query(
    `INSERT INTO contacts (email, phone) VALUES ($1, $2);`,
    [email, phone],
    (err: Error | null) => {
      if (err) {
        res.status(500).send({ message: "Error menyimpan kontak" });
      } else {
        res.send({ message: "Kontak disimpan dengan sukses" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
