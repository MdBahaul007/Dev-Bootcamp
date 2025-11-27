import { json } from "express";
import Bootcamp from "../model/bootcamp.js";

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
    res.status(400).json({
      success: false,
      data: [],
      message: "Error fetching bootcamp data",
    });
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
    res.status(400).json({
      success: false,
      data: [],
      message: "Error fetching bootcamp data",
    });
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
    res.status(400).json({
      success: false,
      error: "Something went wrong",
    });
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
    res.status(400).json({
      success: false,
      error: "Something went wrong",
    });
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
    res.status(400).json({
      success: false,
      error: "Something went wrong",
    });
  }
};
