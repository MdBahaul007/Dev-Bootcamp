import Bootcamp from "../model/bootcamp.js";
import ErrorResponse from "../utils/errorResponse.js";

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
    // adding the error handler middleware so that error goes to it instead of handling it here so we need to call next()
    next(new ErrorResponse(`Failed to get bootcamps`), 500);
    // res.status(400).json({
    //   success: false,
    //   data: [],
    //   message: "Error fetching bootcamp data",
    // });
  }
};

export const getBootcampById = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(new ErrorResponse(`No bootcamp exist with id ${req.params.id}`), 404);
  }
};

export const createBootcamp = async (req, res, next) => {
  try {
    const data = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: req.body,
    });
  } catch (error) {
    // next(error);
    next(new ErrorResponse(`Failed to create bootcamp`), 500);
  }
};

export const updateBootcamp = async (req, res, next) => {
  try {
    const updateData = await Bootcamp.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // it will allow us to give latest updated response
        runValidators: true,
      }
    );
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
  } catch (error) {
    next(new ErrorResponse(`No bootcamp exist with id ${req.params.id}`), 404);
  }
};

export const deleteBootcamp = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(new ErrorResponse(`No bootcamp exist with id ${req.params.id}`), 404);
  }
};
