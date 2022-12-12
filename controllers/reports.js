import Item from "../models/ItemModel.js";
import Report from "../models/reportModel.js";

export const createReportItem = async (req, res) => {
  const {
    no_operasi,
    nameFile,
    date,
    time_prod,
    cycle_time,
    total_product,
    p1_dimension,
    p1_tolerance,
    p1_dimension_min,
    p1_dimension_max,
    p1_actual,
    p1_deviasi,
    p1_desicion,
    p2_dimension,
    p2_tolerance,
    p2_dimension_min,
    p2_dimension_max,
    p2_actual,
    p2_deviasi,
    p2_desicion,
    p3_dimension,
    p3_tolerance,
    p3_dimension_min,
    p3_dimension_max,
    p3_actual,
    p3_deviasi,
    p3_desicion,
  } = req.body;

  try {
    const foundItem = await Report.findOne({ where: { nameFile: nameFile } });

    const resultItem =
      p1_desicion === "1" && p2_desicion === "1" && p3_desicion === "1"
        ? "APPROVED"
        : "REJECTED";

    await Item.update(
      {
        isAccept: true,
      },
      {
        where: {
          nameFile: nameFile,
        },
      }
    );

    if (!foundItem) {
      await Report.create({
        no_operasi,
        nameFile,
        date,
        time_prod,
        cycle_time,
        total_product: parseInt(total_product),
        p1_dimension,
        p1_tolerance,
        p1_dimension_min,
        p1_dimension_max,
        p1_actual,
        p1_deviasi,
        p1_desicion,
        p2_dimension,
        p2_tolerance,
        p2_dimension_min,
        p2_dimension_max,
        p2_actual,
        p2_deviasi,
        p2_desicion,
        p3_dimension,
        p3_tolerance,
        p3_dimension_min,
        p3_dimension_max,
        p3_actual,
        p3_deviasi,
        p3_desicion,
        result: resultItem,
      });
    }

    await Report.update(
      {
        no_operasi,
        nameFile,
        date,
        time_prod,
        cycle_time,
        total_product: parseInt(total_product),
        p1_dimension,
        p1_tolerance,
        p1_dimension_min,
        p1_dimension_max,
        p1_actual,
        p1_deviasi,
        p1_desicion,
        p2_dimension,
        p2_tolerance,
        p2_dimension_min,
        p2_dimension_max,
        p2_actual,
        p2_deviasi,
        p2_desicion,
        p3_dimension,
        p3_tolerance,
        p3_dimension_min,
        p3_dimension_max,
        p3_actual,
        p3_deviasi,
        p3_desicion,
        result: resultItem,
      },
      {
        where: { nameFile: nameFile },
      }
    );
    res
      .status(200)
      .json({ status: 200, msg: "Create Report Hasil Penelitian Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const GetAllReports = async (req, res) => {
  const page = parseInt(req.body.page) - 1;
  const limit = parseInt(req.body.limit);

  const offset = limit * page;
  const totalData = await Report.count();

  const totalPage = Math.ceil(totalData / limit);

  if (page >= totalPage) {
    return res.status(200).json({
      status: 200,
      messages: "Data Not Found!",
      data: null,
    });
  }

  try {
    const items = await Report.findAll({
      offset: offset,
      limit: limit,
      order: [["total_product", "ASC"]],
    });
    res.status(200).json({
      status: 200,
      data: items,
      page: page + 1,
      limit: limit,
      totalData: totalData,
      totalPage: totalPage,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      msg: "Internal Server Error",
      data: null,
    });
  }
};
