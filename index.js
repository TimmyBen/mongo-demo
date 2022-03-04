const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "backend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  // eq ne gt gte lt lte in nin

  const courses = await Course
    // .find({ author: "Mosh", isPublished: true })
    .find({ price: { $gte: 10 } }) // Find courses that are greater than or equal to 10 dollars
    .find({ price: { $gte: 10, $lte: 20 } }) // Find courses that are greater than or equal to 10 dollars
    .find({ price: { $in: [10, 15, 20] } }) // Find courses that are 10 or 20 or 15 dollars
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

getCourses();
