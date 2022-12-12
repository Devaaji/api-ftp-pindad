import Client from "ftp";
import dotenv from "dotenv";
import Item from "../models/ItemModel.js";
import { Op } from "sequelize";
dotenv.config();

export const CreateItem = async (req, res) => {
  const Ftp = new Client();

  try {
    Ftp.on("ready", () => {
      Ftp.list("/Copy_M6269_01", (err, list) => {
        if (err) {
          console.log("List Tidak Ditemukan");
        }
        const fileList = list.map((file) => {
          return file;
        });

        fileList.map(async (file) => {
          const client = new Client();
          if (file.size >= 1000) {
            client.on("ready", () => {
              client.get(`/Copy_M6269_01/${file.name}`, (err, stream) => {
                if (err) {
                  return console.log("Unable to scan directory: " + err);
                }

                var content = "";
                stream.on("data", async function (chunk) {
                  const data = (content += chunk.toString());
                  const no_operasi = data.substring(5, 39).trim();
                  const date = data.substring(40 + 15, 73).trim();
                  const time_prod = data.substring(86, 99).trim();
                  const cycle_time = data.substring(114, 127).trim();
                  const total_product = data.substring(145, 153).trim();

                  //p1
                  const p1_dimensi = data.substring(355, 370).trim();
                  const p1_toleransi = data.substring(370, 385).trim();
                  const p1_dimensi_min = data.substring(380, 394).trim();
                  const p1_dimensi_max = data.substring(400, 415).trim();
                  const p1_actual = data.substring(415, 430).trim();
                  const p1_deviasi = data.substring(430, 443).trim();

                  //p2
                  const p2_dimensi = data.substring(645, 659).trim();
                  const p2_toleransi = data.substring(659, 670).trim();
                  const p2_dimensi_min = data.substring(671, 687).trim();
                  const p2_dimensi_max = data.substring(690, 705).trim();
                  const p2_actual = data.substring(705, 720).trim();
                  const p2_deviasi = data.substring(720, 733).trim();

                  //p3
                  const p3_dimensi = data.substring(934, 946).trim();
                  const p3_toleransi = data.substring(948, 960).trim();
                  const p3_dimensi_min = data.substring(963, 980).trim();
                  const p3_dimensi_max = data.substring(980, 997).trim();
                  const p3_actual = data.substring(994, 1010).trim();
                  const p3_deviasi = data.substring(1010, 1020).trim();

                  const status = data.substring(1129, 1140).trim();

                  const project = await Item.findOne({
                    where: { nameFile: file.name },
                  });

                  if (project === null) {
                    await Item.create({
                      no_operasi: no_operasi,
                      nameFile: file.name,
                      isFinish: true,
                      date_changed: file.date,
                      date: date,
                      time_prod: time_prod,
                      cycle_time: cycle_time,
                      total_product: parseInt(total_product),
                      p1_dimension: p1_dimensi,
                      p1_tolerance: p1_toleransi,
                      p1_dimension_min: p1_dimensi_min,
                      p1_dimension_max: p1_dimensi_max,
                      p1_actual: p1_actual,
                      p1_deviasi: p1_deviasi,
                      p2_dimension: p2_dimensi,
                      p2_tolerance: p2_toleransi,
                      p2_dimension_min: p2_dimensi_min,
                      p2_dimension_max: p2_dimensi_max,
                      p2_actual: p2_actual,
                      p2_deviasi: p2_deviasi,
                      p3_dimension: p3_dimensi,
                      p3_tolerance: p3_toleransi,
                      p3_dimension_min: p3_dimensi_min,
                      p3_dimension_max: p3_dimensi_max,
                      p3_actual: p3_actual,
                      p3_deviasi: p3_deviasi,
                      status: status,
                      isAccept: false,
                    });
                  } else {
                    await Item.update(
                      {
                        no_operasi: no_operasi,
                        nameFile: file.name,
                        isFinish: true,
                        date_changed: file.date,
                        date: date,
                        time_prod: time_prod,
                        cycle_time: cycle_time,
                        total_product: parseInt(total_product),
                        p1_dimension: p1_dimensi,
                        p1_tolerance: p1_toleransi,
                        p1_dimension_min: p1_dimensi_min,
                        p1_dimension_max: p1_dimensi_max,
                        p1_actual: p1_actual,
                        p1_deviasi: p1_deviasi,
                        p2_dimension: p2_dimensi,
                        p2_tolerance: p2_toleransi,
                        p2_dimension_min: p2_dimensi_min,
                        p2_dimension_max: p2_dimensi_max,
                        p2_actual: p2_actual,
                        p2_deviasi: p2_deviasi,
                        p3_dimension: p3_dimensi,
                        p3_tolerance: p3_toleransi,
                        p3_dimension_min: p3_dimensi_min,
                        p3_dimension_max: p3_dimensi_max,
                        p3_actual: p3_actual,
                        p3_deviasi: p3_deviasi,
                        status: status,
                        isAccept: false,
                      },
                      {
                        where: {
                          nameFile: file.name,
                        },
                      }
                    );
                  }
                });
              });
            });
          }
          if (file.size < 1000) {
            const project = await Item.findOne({
              where: { nameFile: file.name },
            });

            if (project === null) {
              await Item.create({
                nameFile: file.name,
                isFinish: false,
                date_changed: file.date,
                isAccept: false,
              });
            } else {
              await Item.update(
                { total_product: 0, cycle_time: "" },
                {
                  where: {
                    nameFile: file.name,
                  },
                }
              );
            }
          }

          client.connect({
            host: process.env.HOST_FTP,
            user: process.env.USER_FTP,
            password: process.env.PASS_FTP,
            port: process.env.PORT_FTP,
          });
        });
      });
      return res
        .status(200)
        .json({ status: 200, msg: "create item_01 berhasil" });
    });

    Ftp.connect({
      host: process.env.HOST_FTP,
      user: process.env.USER_FTP,
      password: process.env.PASS_FTP,
      port: process.env.PORT_FTP,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      msg: "Internal Server Error",
      data: null,
    });
  }
};

export const GetAllItems = async (req, res) => {
  const page = parseInt(req.body.page) - 1;
  const limit = parseInt(req.body.limit);

  const offset = limit * page;
  const totalData = await Item.count({
    where: {
      [Op.and]: [
        {
          isFinish: true,
        },
        {
          isAccept: false,
        },
      ],
    },
  });

  const totalPage = Math.ceil(totalData / limit);

  if (page >= totalPage) {
    return res.status(200).json({
      status: 200,
      messages: "Data Not Found!",
      data: null,
    });
  }

  try {
    const items = await Item.findAll({
      offset: offset,
      limit: limit,
      order: [["id", "ASC"]],
      where: {
        [Op.and]: [
          {
            isFinish: true,
          },
          {
            isAccept: false,
          },
        ],
      },
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

export const moveItem1DATtoCSV = (req, res) => {
  try {
    const Ftp = new Client();

    Ftp.on("ready", () => {
      Ftp.list("/M6269-01", (err, list) => {
        if (err) {
          console.log("List Not Found");
        }
        const fileList = list.map((file) => {
          return file;
        });

        fileList.map((file) => {
          if (file.size > 1000) {
            const client = new Client();

            client.get(`/M6269-01/${file.name}`, (err, stream) => {
              if (err) {
                return console.log("Unable to scan directory: " + err);
              }

              var content = "";
              stream.on("data", function (chunk) {
                const data = (content += chunk.toString());

                const moveFtp = new Client();

                const formatFileNameToCSV = file.name
                  .split(".")
                  .slice(0, 1)
                  .pop();

                moveFtp.on("ready", function () {
                  // Copy and upload files to the server:
                  moveFtp.put(
                    data,
                    `/Copy_M6269_01/${formatFileNameToCSV}.csv`,
                    function (err) {
                      if (err) throw err;
                      moveFtp.end();
                    }
                  );
                });

                moveFtp.connect({
                  host: process.env.HOST_FTP,
                  user: process.env.USER_FTP,
                  password: process.env.PASS_FTP,
                  port: process.env.PORT_FTP,
                });
              });
            });

            client.connect({
              host: process.env.HOST_FTP,
              user: process.env.USER_FTP,
              password: process.env.PASS_FTP,
              port: process.env.PORT_FTP,
            });
          }
        });
      });
    });

    Ftp.connect({
      host: process.env.HOST_FTP,
      user: process.env.USER_FTP,
      password: process.env.PASS_FTP,
      port: process.env.PORT_FTP,
    });
    return res
      .status(200)
      .json({ status: 200, msg: "Berhasil item_01 DAT to CSV" });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      msg: "Internal Server Error",
    });
  }
};
