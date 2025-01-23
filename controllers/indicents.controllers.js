const pool = require("../cnn");

const getIncidenc = async (req, res) => {
  try {
    const response = await pool.query(`SELECT

    indd.incid_id,

    cli.name,

    cli.address,

    cli.phone_mobile,

    cli.city,

    con.linkgoogle,

    inpri.py_inci_name,

    TO_CHAR(indd.incid_hourstart, 'YYYY-MM-DD HH24:MI:SS') AS incid_hourstart,

    inty.ty_inci_name,

    indd.incid_details,

    indd.incid_active

  FROM

    public.incidents AS indd

   INNER JOIN public.contracts AS con ON con.cont_id = indd.cont_id

   INNER JOIN public.clients AS cli ON cli.id = con.client_id

    INNER JOIN public.incident_priority AS inpri ON inpri.py_inci_id = indd.py_inci_id

    INNER JOIN public.type_incident AS inty ON inty.ty_inci_id = indd.ty_inci_id

  WHERE

    indd.incid_active = true;

  `);

    res.json(response.rows);
  } catch (error) {
    res.sendStatus(400);
  }
};

const getIncidencById = async (req, res) => {
  try {
    const incid_id = req.params.id;

    const response = await pool.query(
      `SELECT

    indd.incid_id,

    con.cont_id,

    cli.name,

    cli.address,

    cli.phone_mobile,

    cli.city,

    con.linkgoogle,

    inpri.py_inci_name,

    inpri.py_inci_id,

    TO_CHAR(indd.incid_hourstart, 'YYYY-MM-DD HH24:MI:SS') AS incid_hourstart,

    inty.ty_inci_name,

    inty.ty_inci_id,

    indd.incid_details,

    indd.incid_active

  FROM

    public.incidents AS indd

   INNER JOIN public.contracts AS con ON con.cont_id = indd.cont_id

   INNER JOIN public.clients AS cli ON cli.id = con.client_id

    INNER JOIN public.incident_priority AS inpri ON inpri.py_inci_id = indd.py_inci_id

    INNER JOIN public.type_incident AS inty ON inty.ty_inci_id = indd.ty_inci_id

  WHERE  incid_id=$1`,

      [incid_id]
    );

    res.json(response.rows);
  } catch (error) {
    res.sendStatus(400);
  }
};

const createIncidenc = async (req, res) => {
  try {
    const { py_inci_id, ty_inci_id, incid_details, incid_hourstart, cont_id } =
      req.body;

    const response = await pool.query(
      `INSERT INTO public.incidents(

        py_inci_id, ty_inci_id, incid_details, incid_hourstart, cont_id)

       VALUES ($1,$2,$3,$4,$5)`,

      [py_inci_id, ty_inci_id, incid_details, incid_hourstart, cont_id]
    );

    res.json({
      message: "incidencia creado correctamente",

      body: {
        Incidents: {
          py_inci_id,

          ty_inci_id,

          incid_details,

          incid_hourstart,

          cont_id,
        },
      },
    });

    console.log(response.rows[0]);
  } catch (error) {
    res.sendStatus(400);
  }
};

const editIncidenc = async (req, res) => {
  try {
    const id = req.params.id;

    const { py_inci_id, ty_inci_id, incid_details } = req.body;

    const response = await pool.query(
      `UPDATE  public.incidents  SET

      py_inci_id=$1,
      ty_inci_id=$2,
      incid_details=$3
         WHERE incid_id=$4 RETURNING * `,

      [py_inci_id, ty_inci_id, incid_details, id]
    );

    //console.log(response)

    res.json({
      message: "incidents actualizado correctamente",

      body: {
        Incidents: {
          py_inci_id,

          ty_inci_id,

          incid_details,

          id,
        },
      },
    });
  } catch (error) {
    res.sendStatus(400);
  }
};

const deleteIncidenc = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await pool.query(
      `UPDATE  public.incidents SET incid_active='false' WHERE incid_id=$1 RETURNING * `,

      [id]
    );

    //console.log(response)

    res.json({
      message: "incidents eliminado correctamente",

      body: {
        incidents: { id },
      },
    });
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports = {
  getIncidenc,

  getIncidencById,

  createIncidenc,

  editIncidenc,

  deleteIncidenc,
};
