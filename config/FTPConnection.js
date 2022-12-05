import jsftp from "jsftp";

const FTPConnection = () => {
  const Ftp = new jsftp({
    host: "192.168.1.86",
    user: "usr",
    pass: "12345",
    port: "21",
  });

//   Ftp.ls("/File", async (err, res) => {
//     res.map((file) => {
//       const formatData = file.name;
//       console.log(formatData);
//     });
//   });

  return { Ftp };
};

export default FTPConnection;
