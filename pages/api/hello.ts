// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { full } from "../../text/main";
import books from "../../text/books.json";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log(parseInt(`${req.query.book}`));

  const index: number = parseInt(`${req.query.book}`);
  var fs = require("fs");
  try {
    //books.map(async (book, k) => {
    const dir = "./text/" + books[index];
    try {
      // first check if the directory already exists
      if (!fs.existsSync(dir)) {
        await fs.mkdirSync(dir);
        console.log("Directory is created.");
      }
    } catch (err) {
      console.log(err);
    }

    process.chdir(dir);
    const chapters = full[index]["Chapter"];
    console.log(chapters.length, "length");

    chapters.map(async (ch: any, j: number) => {
      /* await fs.writeFile(
          (j + 1).toString() + ".json",
          JSON.stringify(ch["Verse"]),
          (err: any) => {
            if (err) console.log(err);
            else {
              console.log("File written successfully\n");
            }
          }
        ); */

      await fs.appendFile(
        (j + 1).toString() + ".json",
        JSON.stringify(ch["Verse"]),
        function (err: any) {
          if (err) throw err;
          //console.log("Saved!");
        }
      );
    });
    console.log("wr " + dir);
    process.chdir("../../");
    //});
  } catch (error) {
    console.log("err directory: " + process.cwd());
  }

  res.status(200).json({ books: index + "done" });
}
