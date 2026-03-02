import pool from '../bd.js';

export const getRevenueReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let whereClause = '';
    let params = [];

    if (startDate && endDate) {
      whereClause = 'WHERE appointment_date BETWEEN ? AND ?';
      params = [startDate, endDate];
    }

    // 🔵 Total general (filtrado si hay fechas)
    const [totalResult] = await pool.query(`
      SELECT SUM(amount_paid) AS totalRevenue
      FROM appointments
      ${whereClause}
    `, params);

    // 🔵 Total por aseguradora (filtrado si hay fechas)
    const [insuranceResult] = await pool.query(`
      SELECT 
        COALESCE(i.name, 'Particular') AS insurance,
        SUM(a.amount_paid) AS total
      FROM appointments a
      LEFT JOIN insurances i ON a.insurance_id = i.id
      ${whereClause}
      GROUP BY insurance
    `, params);

    res.json({
      totalRevenue: totalResult[0].totalRevenue || 0,
      revenueByInsurance: insuranceResult
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error generando reporte",
      error: error.message
    });
  }
};