const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;

const url = process.env.MONGO_URI;

const mongoClient = new MongoClient(url);

const getImage = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db();

    const imageBucket = new GridFSBucket(database, {
      bucketName: "photos",
    });

    let downloadStream = imageBucket.openDownloadStreamByName(
      req.params.filename
    );

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (data) {
      return res.status(404).send({ error: "Image not found" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error Something went wrong",
      error,
    });
  }
};

module.exports = {
  getImage,
};
