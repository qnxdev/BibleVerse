export default async (req, res) => {
  const options = {
    method: "POST",
    url: "https://devgateway.federalbank.co.in/fedbnkdev/dev/paylite/accountStatement",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      account_statement_req: {
        header: { user_id: "Lucy", password: "toajhuper" },
        body: {
          sender_cd: "sebj",
          account_num: "6334947119473441",
          date: "3/26/2089",
          seq_num: "deasoviudow",
        },      
      },
    }),
    json: true,
  };

  const promise = await fetch(options.url, options);
  const result = await promise.json();
  console.log(result);

  res.send(result);
};
