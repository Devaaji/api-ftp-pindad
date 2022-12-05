import Client from "ftp";

export async function example() {
  const Ftp = new Client();

  Ftp.on("ready", () => {
    Ftp.list("/M6269-02", (err, list) => {
      if (err) {
        console.log("List Tidak Ditemukan");
      }
      const fileList = list.map((file) => {
        return file;
      });

      fileList.map((file) => {
        if (file.size >= 0) {
          const client = new Client();
          if (file.size >= 0) {
            client.on("ready", () => {
              client.get(`/M6269-02/${file.name}`, (err, stream) => {
                if (err) {
                  return console.log("Unable to scan directory: " + err);
                }

                console.log("TES", file.name);

                var content = "";
                stream.on("data", function (chunk) {
                  const data = (content += chunk.toString());
                  const date = data.substring(40 + 15, 73);
                  const time_prod = data.substring(85, 99);
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
                  const p2_dimensi_min = data.substring(671, 687).split("\n");
                  const p2_dimensi_max = data.substring(690, 705);
                  const p2_actual = data.substring(705, 720);
                  const p2_deviasi = data.substring(720, 733);

                  //p3
                  const asdsadda = data.substring(930, 1023);
                  const p3_dimensi = data.substring(934, 946);
                  const p3_toleransi = data.substring(934, 946);
                  const p3_dimensi_min = data.substring(963, 980);
                  const p3_dimensi_max = data.substring(980, 997);
                  const p3_actual = data.substring(994, 1010);
                  const p3_deviasi = data.substring(1010, 1020);

                  const status = data.substring(1129, 1140);
                  const moveFtp = new Client();

                  const formatFileNameToCSV = file.name
                    .split(".")
                    .slice(0, 1)
                    .pop();

                  moveFtp.on("ready", function () {
                    // Copy and upload files to the server:
                    moveFtp.put(
                      data,
                      `/Copy_M6269_02/${formatFileNameToCSV}.csv`,
                      function (err) {
                        if (err) throw err;
                        moveFtp.end();
                      }
                    );
                  });

                  moveFtp.connect({
                    host: "192.168.1.86",
                    user: "usr",
                    password: "12345",
                    port: "21",
                  });

                  //   console.log({
                  //     date: file.date,
                  //     cycle_time,
                  //     total_product,
                  //     p1_dimensi,
                  //     p1_toleransi,
                  //     p1_dimensi_min,
                  //     p1_dimensi_max,
                  //     p1_actual,
                  //     p1_deviasi,
                  //     p2_dimensi,
                  //     p2_toleransi,
                  //     p2_dimensi_min,
                  //     p2_dimensi_max,
                  //     p2_actual,
                  //     p2_deviasi,
                  //     p3_dimensi,
                  //     p3_toleransi,
                  //     p3_dimensi_min,
                  //     p3_dimensi_max,
                  //     p3_actual,
                  //     p3_deviasi,
                  //     status,
                  //   });
                });
              });
            });
          } else {
            console.log(`START ${file.name}`, file.date.toLocaleString());
          }

          client.connect({
            host: "192.168.1.86",
            user: "usr",
            password: "12345",
            port: "21",
          });
        }
      });

      //   fileList.map((file) => {
      //     const client = new Client();
      //     if (file.size >= 1137) {
      //       client.on("ready", () => {
      //         client.get(`/M6269-02/${file.name}`, (err, stream) => {
      //           if (err) {
      //             return console.log("Unable to scan directory: " + err);
      //           }

      //           var content = "";
      //           stream.on("data", function (chunk) {
      //             const data = (content += chunk.toString());
      //             const date = data.substring(40 + 15, 73);
      //             const time_prod = data.substring(85, 99);
      //             const cycle_time = data.substring(114, 127);
      //             const total_product = data.substring(145, 153);

      //             //p1
      //             const p1_dimensi = data.substring(355, 370);
      //             const p1_toleransi = data.substring(370, 385);
      //             const p1_dimensi_min = data.substring(380, 394);
      //             const p1_dimensi_max = data.substring(400, 415);
      //             const p1_actual = data.substring(415, 430);
      //             const p1_deviasi = data.substring(430, 443);

      //             //p2
      //             const p2_dimensi = data.substring(645, 659);
      //             const p2_toleransi = data.substring(659, 670);
      //             const p2_dimensi_min = data.substring(671, 687).split("\n");
      //             const p2_dimensi_max = data.substring(690, 705);
      //             const p2_actual = data.substring(705, 720);
      //             const p2_deviasi = data.substring(720, 733);

      //             //p3
      //             const asdsadda = data.substring(930, 1023);
      //             const p3_dimensi = data.substring(934, 946);
      //             const p3_toleransi = data.substring(934, 946);
      //             const p3_dimensi_min = data.substring(963, 980);
      //             const p3_dimensi_max = data.substring(980, 997);
      //             const p3_actual = data.substring(994, 1010);
      //             const p3_deviasi = data.substring(1010, 1020);

      //             const status = data.substring(1129, 1140);

      //             console.log({
      //               date: file.date,
      //               cycle_time,
      //               total_product,
      //               p1_dimensi,
      //               p1_toleransi,
      //               p1_dimensi_min,
      //               p1_dimensi_max,
      //               p1_actual,
      //               p1_deviasi,
      //               p2_dimensi,
      //               p2_toleransi,
      //               p2_dimensi_min,
      //               p2_dimensi_max,
      //               p2_actual,
      //               p2_deviasi,
      //               p3_dimensi,
      //               p3_toleransi,
      //               p3_dimensi_min,
      //               p3_dimensi_max,
      //               p3_actual,
      //               p3_deviasi,
      //               status,
      //             });
      //           });
      //         });
      //       });
      //     } else {
      //       console.log(`START ${file.name}`, file.date.toLocaleString());
      //     }

      //     client.connect({
      //       host: "192.168.1.86",
      //       user: "usr",
      //       password: "12345",
      //       port: "21",
      //     });
      //   });
    });
  });

  Ftp.connect({
    host: "192.168.1.86",
    user: "usr",
    password: "12345",
    port: "21",
  });

  //   Ftp.connect({
  //     host: "192.168.1.86",
  //     user: "usr",
  //     password: "12345",
  //     port: "21",
  //   });
}

// const namaFile = ["File.csv", "File2.csv", "File3.csv"];

//   namaFile.map((name) => {
//     const client = new Client();
//     client.on("ready", () => {
//       client.get(`/File/${name}`, (err, stream) => {
//         if (err) {
//           return console.log("Unable to scan directory: " + err);
//         }

//         const content = "";
//         stream.on("data", function (chunk) {
//           const data = (content += chunk.toString());
//           console.log(data);
//         });
//       });
//     });

//     client.connect({
//       host: "192.168.1.86",
//       user: "usr",
//       password: "12345",
//       port: "21",
//     });
//   });

// import jsftp from "jsftp";

// export async function example() {
//   const Ftp = new jsftp({
//     host: "192.168.1.86",
//     user: "usr",
//     pass: "12345",
//     port: "21",
//   });

//   //Rename Folder DIrectory FTP
//   //   Ftp.rename("File.csv", "File.DAT", (err, res) => {
//   //     if (!err) {
//   //       console.log("Renaming successful!");
//   //     }
//   //   });

//   //   Ftp.get("File.csv", "File.csv", (err) => {
//   //     if (err) {
//   //       return console.error("There was an error retrieving the file.");
//   //     }
//   //     console.log("File copied successfully!");
//   //   });

//   //   Ftp.get("/", "File/File2.csv", err => {
//   //     if (err) {
//   //       return console.error("There was an error retrieving the file.");
//   //     }
//   //     console.log("File copied successfully!");
//   //   });

//   //   Ftp.("/File", (err, res) => {
//   //     console.log(res)
//   //     // res.map((file) => {
//   //     //   console.log(file.name);
//   //     // //   const nameFile = file.name.split(".").slice(0, 1).shift();
//   //     // //   const formatData = file.name.split(".").slice(1, 2).shift();

//   //     // //   if (formatData === "DAT") {
//   //     // //     Ftp.rename(`File/${file.name}`, `File/${nameFile}.csv`, (err, res) => {
//   //     // //       if (!err) {
//   //     // //         console.log("Renaming successful!");
//   //     // //       }
//   //     // //     });
//   //     // //   }
//   //     // });
//   //   });

//   //   Ftp.ls("/File", async (err, res) => {
//   //     res.map((file) => {
//   //       const formatData = file.name;
//   //       console.log(formatData);
//   //     });
//   //   });

//   const file = ["File.csv", "File2.cs"]; // Will store the contents of the file

//   file.forEach((fl) => {
//     console.log("tes", fl);
//   });
//   //   Ftp.get(`File/File.csv`, (err, socket) => {
//   //     socket.on("data", (d) => {
//   //       const data = d.toString();

//   //       //   const titleText = data.substring(5, 39);
//   //       //   const date = data.substring(40 + 15, 73);
//   //       //   const time_prod = data.substring(85, 99);
//   //       //   const cycle_time = data.substring(115, 127);
//   //       console.log(data);
//   //     });

//   //     socket.resume();
//   //   });
// }

////////////////////////////////
//   Ftp.on("ready", () => {
//     Ftp.get(`/File/File4.csv`, (err, stream) => {
//       if (err) {
//         return console.log("Unable to scan directory: " + err);
//       }

//       var content = "";
//       stream.on("data", async (chunk) => {
//         const data = (content += await chunk.toString());
//         const identivication = data.substring(0, 4);
//         const date = data.substring(40 + 15, 73);
//         const time_prod = data.substring(85, 99);
//         const cycle_time = data.substring(114, 127);
//         const total_product = data.substring(145, 153);

//         //p1
//         const p1_dimensi = data.substring(355, 370);
//         const p1_toleransi = data.substring(370, 385);
//         const p1_dimensi_min = data.substring(380, 394);
//         const p1_dimensi_max = data.substring(400, 415);
//         const p1_actual = data.substring(415, 430);
//         const p1_deviasi = data.substring(430, 443);

//         //p2
//         const p2_dimensi = data.substring(645, 659);
//         const p2_toleransi = data.substring(659, 670);
//         const p2_dimensi_min = data.substring(671, 687).split("\n");
//         const p2_dimensi_max = data.substring(690, 705);
//         const p2_actual = data.substring(705, 720);
//         const p2_deviasi = data.substring(720, 733);

//         //p3
//         const asdsadda = data.substring(930, 1023);
//         const p3_dimensi = data.substring(934, 946);
//         const p3_toleransi = data.substring(934, 946);
//         const p3_dimensi_min = data.substring(963, 980);
//         const p3_dimensi_max = data.substring(980, 997);
//         const p3_actual = data.substring(994, 1010);
//         const p3_deviasi = data.substring(1010, 1020);

//         const status = data.substring(1129, 1140);

//         console.log({
//           date,
//           time_prod,
//           cycle_time,
//           total_product,
//           p1_dimensi,
//           p1_toleransi,
//           p1_dimensi_min,
//           p1_dimensi_max,
//           p1_actual,
//           p1_deviasi,
//           p2_dimensi,
//           p2_toleransi,
//           p2_dimensi_min,
//           p2_dimensi_max,
//           p2_actual,
//           p2_deviasi,
//           p3_dimensi,
//           p3_toleransi,
//           p3_dimensi_min,
//           p3_dimensi_max,
//           p3_actual,
//           p3_deviasi,
//           status,
//         });
//       });
//     });
//   });

//   Ftp.on("ready", () => {
//     Ftp.list("/M6269-01", (err, list) => {
//       const nameFile = list.map((file) => {
//         return file.name;
//       });

//       nameFile.map((name) => {
//         const client = new Client();
//         client.on("ready", () => {
//           client.get(`/M6269-01/${name}`, (err, stream) => {
//             if (err) {
//               return console.log("Unable to scan directory: " + err);
//             }

//             var content = "";
//             stream.on("data", async (chunk) => {
//               const data = (content += await chunk.toString());
//               const identivication = data.substring(0, 4);
//               const date = data.substring(40 + 15, 73);

//               console.log(identivication);
//             });
//           });
//         });

//         client.connect({
//           host: "192.168.1.86",
//           user: "usr",
//           password: "12345",
//           port: "21",
//         });
//       });
//     });
//   });