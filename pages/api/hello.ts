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
  var fs = require("fs");
  try {
    //books.map(async (book, k) => {
    const index = 2;
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

    chapters.map(async (ch, j) => {
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

      fs.appendFile(
        (j + 1).toString() + ".json",
        JSON.stringify(ch["Verse"]),
        function (err: any) {
          if (err) throw err;
          //console.log("Saved!");
        }
      );
    });
    process.chdir("../../");
    console.log("wr " + dir);
    //});
  } catch (error) {
    console.log("err directory: " + process.cwd());
  }

  res.status(200).json({ books: "done" });
}
