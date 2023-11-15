const School = require("../Models/schoolModel");


const addDetails = async (req, res) => {
  try {
    const dataexist = await School.find({
      $and: [
        { name: { $regex: new RegExp(req.body.name, "i") } },
        { place: { $regex: new RegExp(req.body.place, "i") } },
        { state: { $regex: new RegExp(req.body.state, "i") } },
        { district: { $regex: new RegExp(req.body.district, "i") } },
      ],
    });

    if (dataexist.length != 0) {
      return res
        .status(200)
        .send({ message: "school already exist", success: false });
    }

    const newSchool = new School({
      name: req.body.name,
      place: req.body.place,
      state: req.body.state,
      district: req.body.district,
      description: req.body.description,
      image: req.file.filename,
    });
    const add = await newSchool.save();

    if (add) {
      return res
        .status(200)
        .send({ message: "New school added", success: true });
    } else {
      return res
        .status(200)
        .send({ message: "check the details again", success: false });
    }
  } catch (error) {
    res.status(500).send({});
  }
};

const getList = async (req, res) => {
  let sort = req.query.sort;
  let lists;

  try {
    const count=await School.countDocuments()
    let pages=Math.ceil(count/3)
    if (req.query.search.length === 0) {
      const page = parseInt(req.query.page);
      const perPage = 3;

      lists = await School.find()
        .sort({ name: sort })
        .skip(perPage * (page - 1))
        .limit(perPage);
    } else {
      const searchQuery = new RegExp(req.query.search, "i");

      lists = await School.find({ name: { $regex: searchQuery } })
        .sort({ name: sort })
        .limit(3);
    }

    if (lists) {
      res.status(200).send({ success: true, lists: lists,pages:pages });
    } else {
      res
        .status(400)
        .send({ message: "No schools where added", success: false });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

const deleteSchool = async (req, res) => {
  try {
    const deleted = await School.deleteOne({ _id: req.params.id });
    if (deleted) {
      res.status(200).send({ success: true, message: "Success fully deleted" });
    } else {
      res.status(200).send({ success: false, message: "Please try again" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

const viewDetails = async (req, res) => {
  try {
    const details = await School.find({ _id: req.body.id });

    if (details) {
      return res.status(200).send({ success: true, data: details });
    }
  } catch (error) {
    res.send({ error });
  }
};
const getEdit = async (req, res) => {
  id = req.body.id;
  try {
    const editdata = await School.find({ _id: req.body.id });

    if (editdata) {
      return res.status(200).send({ success: true, datas: editdata[0] });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

const postEdit = async (req, res) => {
  console.log("ethiyallo");
  let image;
  if (req.file) {
    image = req.file.filename;
    console.log(image);
  } else {
    image = req.body.image;
    console.log(image);
  }
  let name = req.body.name;
  let place = req.body.place;
  let state = req.body.state;
  let district = req.body.district;
  let description = req.body.description;
  let id = req.body._id;

  let update = await School.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name: name,
        place: place,
        state: state,
        district: district,
        description: description,
        image: image,
      },
    }
  );
  if (update) {
    res
      .status(200)
      .send({ success: true, message: "Datas updated" });
  }
};

module.exports = {
  addDetails,
  getList,
  deleteSchool,
  viewDetails,
  getEdit,
  postEdit,
};
