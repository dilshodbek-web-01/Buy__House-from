import client from "../db/config.js";

const getRoom = async (req, res) => {
  try {
    let Room = await client.query(
      ` SELECT * FROM room where created_by_user_id = $1`,
      [req.token]
    );

    res.status(200).json(Room.rows);
  } catch (err) {
    console.log(err);
  }
};

const getOneRoom = async (req, res) => {
  const { id } = req.params;
  try {
    let Room = await client.query(
      ` SELECT * FROM room r where r.connect_to_complex = $1 AND created_by_user_id = $2`,
      [id, req.token]
    );

    res.status(200).json(Room.rows);
  } catch (err) {
    console.log(err);
  }
};

const createRoom = async (req, res) => {
  const {
    room_count,
    room_price,
    room_kvadrat,
    connect_to_complex,
    created_by_user_id,
  } = req.body;

  let result = await client.query(
    `INSERT INTO room(room_count, room_price, room_kvadrat, connect_to_complex, created_by_user_id)
      VALUES($1, $2, $3, $4, $5)`,
    [room_count, room_price, room_kvadrat, connect_to_complex, req.token]
  );

  res.status(201).json({
    msg: "New room created!",
  });
};

const deleteRoom = async (req, res) => {
  const { room_id } = req.params;

  const foundedRoom = await client.query(
    ` SELECT * FROM room WHERE room_id = $1 AND created_by_user_id = $2`,
    [room_id, req.token]
  );

  if (foundedRoom.rowCount === 0)
    return res.status(404).json({ msg: "Room not found!" });

  await client.query(
    ` DELETE FROM room WHERE room_id = $1 AND created_by_user_id = $2`,
    [room_id, req.token]
  );

  res.status(200).json({
    msg: "Room deleted !!!",
  });
};

const updateRoom = async (req, res) => {
  const { room_id } = req.params;
  let {
    room_count,
    room_price,
    room_kvadrat,
    connect_to_complex,
    created_by_user_id,
  } = req.body;

  let foundedRoom = await client.query(
    ` SELECT * FROM room WHERE room_id = $1 AND created_by_user_id = $2`,
    [room_id, req.token]
  );

  console.log(foundedRoom);

  if (foundedRoom.rowCount === 0) {
    res.status(404).json({ msg: "Room not found!" });
  }

  const {
    room_count: Room_count,
    room_price: Room_price,
    room_kvadrat: Room_kvadrat,
    connect_to_company: Connect_to_company,
    connect_to_complex: Connect_to_complex,
  } = foundedRoom.rows[0];

  (room_count = room_count ? room_count : Room_count),
    (room_price = room_price ? room_price : Room_price),
    (room_kvadrat = room_kvadrat ? room_kvadrat : Room_kvadrat),
    (connect_to_complex = connect_to_complex
      ? connect_to_complex
      : Connect_to_complex);

  let updateRoom = await client.query(
    `
      UPDATE room SET 
      room_count = $1,
      room_price = $2,
      room_kvadrat = $3,
      connect_to_complex = $4,
      created_by_user_id = $5
      WHERE room_id = $6
      `,
    [
      room_count,
      room_price,
      room_kvadrat,
      connect_to_complex,
      req.token,
      room_id,
    ]
  );

  res.status(200).json({
    msg: "Room Updated!",
  });
};

export { getRoom, getOneRoom, createRoom, deleteRoom, updateRoom };
