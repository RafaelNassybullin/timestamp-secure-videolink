import { Document } from 'mongoose';

export interface IData extends Document {
  title: string,
  description: string,
  video: string,
  poster: string,
}

export interface ITime extends Document {
  key: string,
  date: number,
}