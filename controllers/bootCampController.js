import Bootcamp from "../model/bootcamp.js";

//added the async handler in routes so that we don't have to write the try-catch here in controller
export const getBootcamp = async (req, res, next) => {
  try {
    const bootcampData = await Bootcamp.find();
    res.status(200).json({
      success: true,
      count: bootcampData?.length,
      data: bootcampData,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};

export const getBootcampById = async (req, res, next) => {
  const bootCampData = await Bootcamp.findById(req.params.id);
  if (!bootCampData) {
    return res.status(400).json({
      success: false,
      data: [],
      message: "No Data found",
    });
  }
  res.status(200).json({
    success: true,
    data: bootCampData,
    message: "Success",
  });
  // next(new ErrorResponse(`No bootcamp exist with1 id ${req.params.id}`), 404);
  next(error);
};

export const createBootcamp = async (req, res, next) => {
  const data = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: req.body,
  });

  next(error);
};

export const updateBootcamp = async (req, res, next) => {
  const updateData = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // it will allow us to give latest updated response
    runValidators: true,
  });
  if (!updateData) {
    return res.status(400).json({
      success: false,
      error: "No record found",
    });
  }
  res.status(200).json({
    success: true,
    data: updateData,
  });
};

export const deleteBootcamp = async (req, res, next) => {
  const deleteRecord = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!deleteRecord) {
    return res.status(400).json({
      success: false,
      error: "No record found",
    });
  }
  res.status(200).json({
    success: true,
    data: {},
  });
};
