
export interface IData {
  _id: string,
  title: string,
  description: string,
  video: string,
  poster: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}

export interface IPopUp {
  id: string;
  poster: string;
}

export type directionType = "left" | "right"

export interface IDirections {
  id: number;
  speed: number;
  position: directionType;
}

export interface ISlider {
  datas: IData[];
  position: directionType;
  speed: number;
  
}

export interface IGlobalState {
  popUpID: IPopUp,
  loading: boolean,
  expiredLink: string,
  data: IData[],
  error: boolean
}