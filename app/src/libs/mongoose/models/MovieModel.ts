import mongoose, { Document, Schema } from 'mongoose';

enum Genre {
  Action = 'Action',
  Drama = 'Drama',
  Comedy = 'Comedy',
}

enum Rating {
  OneStar = '1',
  TwoStars = '2',
  ThreeStars = '3',
  FourStars = '4',
  FiveStars = '5',
}

interface IMovie extends Document {
  title: string;
  genre: Genre;
  rating: Rating;
  streamingLink: string;
}

const movieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  genre: { type: String, enum: Object.values(Genre), required: true },
  rating: { type: String, enum: Object.values(Rating), required: true },
  streamingLink: { type: String, required: true },
});

const MovieModel = mongoose.model<IMovie>('Movie', movieSchema);

export { MovieModel, IMovie, Genre, Rating };
