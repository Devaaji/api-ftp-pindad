import Item from "../models/ItemModel.js";

export const DashboardPoint01 = async (req, res) => {
  const totalData = await Item.count({
    where: {
      isFinish: true,
    },
  });

  try {
    const items = await Item.findAll({
      limit: 20,
      attributes: [
        "total_product",
        "nameFile",
        "p1_dimension",
        "p1_dimension_min",
        "p1_dimension_max",
        "p1_actual",
        "p1_deviasi",
      ],
      order: [["total_product", "ASC"]],
      where: {
        isFinish: true,
      },
    });
    res.status(200).json({
      status: 200,
      data: items,
      totalData: totalData,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      msg: "Internal Server Error",
      data: null,
    });
  }
};

export const DashboardPoint02 = async (req, res) => {
  const totalData = await Item.count({
    where: {
      isFinish: true,
    },
  });

  try {
    const items = await Item.findAll({
      limit: 20,
      attributes: [
        "total_product",
        "nameFile",
        "p2_dimension",
        "p2_dimension_min",
        "p2_dimension_max",
        "p2_actual",
        "p2_deviasi",
      ],
      order: [["total_product", "ASC"]],
      where: {
        isFinish: true,
      },
    });
    res.status(200).json({
      status: 200,
      data: items,
      totalData: totalData,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      msg: "Internal Server Error",
      data: null,
    });
  }
};

export const DashboardPoint03 = async (req, res) => {
    const totalData = await Item.count({
      where: {
        isFinish: true,
      },
    });
  
    try {
      const items = await Item.findAll({
        limit: 20,
        attributes: [
          "total_product",
          "nameFile",
          "p3_dimension",
          "p3_dimension_min",
          "p3_dimension_max",
          "p3_actual",
          "p3_deviasi",
        ],
        order: [["total_product", "ASC"]],
        where: {
          isFinish: true,
        },
      });
      res.status(200).json({
        status: 200,
        data: items,
        totalData: totalData,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        msg: "Internal Server Error",
        data: null,
      });
    }
  };
  
