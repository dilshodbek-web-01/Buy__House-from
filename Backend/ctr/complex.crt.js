import client from "../db/config.js";

const getComplex = async (req, res) => {
  try {
    let complex = await client.query(
      ` SELECT cx.*, cs.company_name, cs.company_id FROM complex cx JOIN companies cs ON cs.company_id = cx.connect_to_company where cx.created_by_user_id = $1`,
      [req.token]
    );

    res.status(200).json(complex.rows);
  } catch (err) {
    console.log(err);
  }
};

const getOneComplex = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.token);
  try {
    let complex = await client.query(
      ` SELECT * FROM complex c where c.connect_to_company = $1 AND created_by_user_id = $2`,
      [id, req.token]
    );

    res.status(200).json(complex.rows);
  } catch (err) {
    console.log(err);
  }
};

const createComplex = async (req, res) => {
  const {
    complex_name,
    complex_address,
    connect_to_company,
    created_by_user_id,
  } = req.body;

  const foundedComplex = await client.query(
    `
    SELECT * FROM complex WHERE complex_name = $1`,
    [complex_name]
  );

  if (foundedComplex.rowCount === 1)
    return res.status(404).json({ msg: "Complex already exists !!!." });

  // let companyInfo = await client.query(
  //   ` SELECT c.company_id, c.company_name FROM companies c JOIN complex cpx ON cpx.connect_to_company = c.company_id `
  // );

  // console.log(companyInfo);

  let result = await client.query(
    `INSERT INTO complex(complex_name, complex_address, connect_to_company, created_by_user_id)
      VALUES($1, $2, $3, $4)`,
    [complex_name, complex_address, connect_to_company, req.token]
  );

  res.status(201).json({
    msg: "New complex created!",
  });
};

const deleteComplex = async (req, res) => {
  const { complex_id } = req.params;

  const foundedComplex = await client.query(
    ` SELECT * FROM complex WHERE complex_id = $1 AND created_by_user_id = $2`,
    [complex_id, req.token]
  );

  if (foundedComplex.rowCount === 0)
    return res.status(404).json({ msg: "Complex not found!" });

  await client.query(
    ` DELETE FROM complex WHERE complex_id = $1 AND created_by_user_id = $2`,
    [complex_id, req.token]
  );

  res.status(200).json({
    msg: "Complex deleted !!!",
  });
};

const updateComplex = async (req, res) => {
  const { complex_id } = req.params;
  let {
    complex_name,
    complex_address,
    connect_to_company,
    created_by_user_id,
  } = req.body;

  let foundedComplex = await client.query(
    ` SELECT * FROM complex WHERE complex_id = $1 AND created_by_user_id = $2`,
    [complex_id, req.token]
  );

  console.log(foundedComplex);

  if (foundedComplex.rowCount === 0) {
    res.status(404).json({ msg: "Complex not found!" });
  }

  const {
    complex_name: Complex_name,
    complex_address: Complex_address,
    connect_to_company: Connect_to_company,
  } = foundedComplex.rows[0];

  (complex_name = complex_name ? complex_name : Complex_name),
    (complex_address = complex_address ? complex_address : Complex_address),
    (connect_to_company = connect_to_company
      ? connect_to_company
      : Connect_to_company);

  let updateComplex = await client.query(
    `
      UPDATE complex SET 
      complex_name = $1,
      complex_address = $2,
      connect_to_company = $3,
      created_by_user_id = $4
      WHERE complex_id = $5
      `,
    [complex_name, complex_address, connect_to_company, req.token, complex_id]
  );

  res.status(200).json({
    msg: "Complex Updated!",
  });
};

export {
  getComplex,
  getOneComplex,
  createComplex,
  deleteComplex,
  updateComplex,
};
