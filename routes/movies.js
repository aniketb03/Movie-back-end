import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getAllMovies,
  getMoviesById,
  createMovies,
  deleteMoviesById,
  updateMovieById,
} from "./helper.js";
const router = express.Router();
// Movies
router.get("/", async function (request, response) {
  // db.movies.find({})
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  // console.log(request.query);
  // Cursor - Pagination
  const Movies = await getAllMovies(request);
  response.status(200).send(Movies);
});
// Get Movies by ID
router.get("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  // db.movies.findOne({id:"101"});
  const movie = await getMoviesById(id);
  // const movie = movies.find((mv) => mv.id == id);
  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send("Error: Movie not found ");
});
/* [Inbuilt] Middleware -->(express.json()) converts body to JSON
 Create Movies by ID */
router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data);
  //db.movies.insertMany(data);
  const result = await createMovies(data);
  response.send(result);
});
// Delete movies by ID
router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  // db.movies.deleteOne({id:"101"});
  const result = await deleteMoviesById(id);
  // const movie = movies.find((mv) => mv.id == id);
  console.log(result);
  result.deletedCount > 0
    ? response.send("Movie Deleted Succesfully☠️")
    : response.status(404).send("Error: Movie not found ");
});
/*  Update Rating by ID  */
router.put("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  const data = request.body;
  // db.movies.updateOne({id:"101"},{$set:data});
  const result = await updateMovieById(id, data);
  response.send(result);
});

export const moviesRouter = router;
