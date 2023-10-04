const postBank = async (req, res) => {
  const { room_price, room_kvadrat } = req.body;

  let getInfo = await client.query(` SELECT totalcalculator($1, $2) `, [
    room_price,
    room_kvadrat,
  ]);

  res.status(200).json({
    getInfo,
    msg: "Take Bank!",
  });
};

export { postBank };
