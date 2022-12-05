import Client from "ftp";
import dotenv from "dotenv";
import Item from "../models/ItemModel.js";
dotenv.config();

export const CreateItem = async (req, res) => {
  const Ftp = new Client();

  try {
    Ftp.on("ready", () => {
      Ftp.list("/M6269-02", (err, list) => {
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
              client.get(`/M6269-02/${file.name}`, (err, stream) => {
                if (err) {
                  return console.log("Unable to scan directory: " + err);
                }

                var content = "";
                stream.on("data", async function (chunk) {
                  const data = (content += chunk.toString());
                  const cycle_time = data.substring(114, 127);
                  const total_product = data.substring(145, 153);

                  //p1
                  const p1_dimensi = data.substring(355, 370);
                  const p1_toleransi = data.substring(370, 385);
                  const p1_dimensi_min = data.substring(380, 394);
                  const p1_dimensi_max = data.substring(400, 415);
                  const p1_actual = data.substring(415, 430);
                  const p1_deviasi = data.substring(430, 443);

                  //p2
                  const p2_dimensi = data.substring(645, 659);
                  const p2_toleransi = data.substring(659, 670);
                  const p2_dimensi_min = data.substring(671, 687);
                  const p2_dimensi_max = data.substring(690, 705);
                  const p2_actual = data.substring(705, 720);
                  const p2_deviasi = data.substring(720, 733);

                  //p3å
                  const p3_dimensi = data.substring(934, 946);
                  const p3_toleransi = data.substring(934, 946);
                  const p3_dimensi_min = data.substring(963, 980);
                  const p3_dimensi_max = data.substring(980, 997);
                  const p3_actual = data.substring(994, 1010);
                  const p3_deviasi = data.substring(1010, 1020);

                  const status = data.substring(1129, 1140);

                  const project = await Item.findOne({
                    where: { nameFile: file.name },
                  });

                  if (project === null) {
                    await Item.create({
                      nameFile: file.name,
                      date: file.date,
                      cycle_time: cycle_time,
                      total_product: total_product,
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
                    });
                  } else {
                    await Item.update(
                      {
                        nameFile: file.name,
                        date: file.date,
                        cycle_time: cycle_time,
                        total_product: total_product,
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
          if (file.size > 0) {
            const project = await Item.findOne({
              where: { nameFile: file.name },
            });

            if (project === null) {
              await Item.create({
                nameFile: file.name,
                date: file.date,
              });
            } else {
              await Item.update(
                { total_product: "", cycle_time: "" },
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
    });

    Ftp.connect({
      host: process.env.HOST_FTP,
      user: process.env.USER_FTP,
      password: process.env.PASS_FTP,
      port: process.env.PORT_FTP,
    });
    res.status(200).json({ status: 200, msg: "Create item berhasil" });
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
  const totalData = await Item.count();

  const totalPage = Math.ceil(totalData / limit);

  if (page >= totalPage) {
    return res.status(404).json({
      status: 404,
      messages: "Data Not Found!",
      data: null,
    });
  }

  try {
    const items = await Item.findAll({
      offset: offset,
      limit: limit,
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
