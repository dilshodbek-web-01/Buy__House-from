import client from "../db/config.js";

const getCompanies = async (req, res) => {
  try {
    let companies = await client.query(
      ` SELECT * FROM companies where created_by_user_id = $1`,
      [req.token]
    );

    res.status(200).json(companies.rows);
  } catch (err) {
    console.log(err);
  }
};

const createCompany = async (req, res) => {
  const { company_name, company_imgpath, created_by_user_id } = req.body;

  const foundedCompany = await client.query(
    `
    SELECT * FROM companies WHERE company_name = $1`,
    [company_name]
  );

  if (foundedCompany.rowCount === 1)
    return res.status(404).json({ msg: "Company already exists !!!." });

  let result = await client.query(
    `INSERT INTO companies(company_name, company_imgpath, created_by_user_id)
      VALUES($1, $2, $3)`,
    [company_name, company_imgpath, req.token]
  );

  res.status(201).json({
    msg: "New company created!",
  });
};

const deleteCompany = async (req, res) => {
  const { company_id } = req.params;

  const foundedCompany = await client.query(
    ` SELECT * FROM companies WHERE company_id = $1 AND created_by_user_id = $2`,
    [company_id, req.token]
  );

  if (foundedCompany.rowCount === 0)
    return res.status(404).json({ msg: "Company not found!" });

  await client.query(
    ` DELETE FROM companies WHERE company_id = $1 AND created_by_user_id = $2`,
    [company_id, req.token]
  );

  res.status(200).json({
    msg: "Company deleted !!!",
  });
};

const updateCompany = async (req, res) => {
  const { company_id } = req.params;
  let { company_name, company_imgpath, created_by_user_id } = req.body;

  let foundedCompany = await client.query(
    ` SELECT * FROM companies WHERE company_id = $1`,
    [company_id]
  );

  if (foundedCompany.rowCount === 0) {
    res.status(404).json({ msg: "Company not found!" });
  }

  const { company_name: Company_name, company_imgpath: Company_imgpath } =
    foundedCompany.rows[0];

  (company_name = company_name ? company_name : Company_name),
    (company_imgpath = company_imgpath ? company_imgpath : Company_imgpath);

  let updateCompany = await client.query(
    `
      UPDATE companies SET 
      company_name = $1,
      company_imgpath = $2,
      created_by_user_id = $3
      WHERE company_id = $4
      `,
    [company_name, company_imgpath, req.token, company_id]
  );

  res.status(200).json({
    msg: "Company Updated!",
  });
};

export { getCompanies, createCompany, deleteCompany, updateCompany };
