import styled from "styled-components";
import { FC } from "react";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { popUpOpen } from "store";
import { IData, ISlider } from "interfaces";

export const Slider: FC<ISlider> = ({ datas, position, speed }) => {
  const dispatch = useDispatch();

  const openModal = (poster: string, id: string) => {
    dispatch(popUpOpen({ poster, id }));
  };

  const configMarquee = {
    speed,
    gradient: false,
    direction: position,
  };

  return (
    <Marquee {...configMarquee}>
      {datas.map((data: IData) => (
        <Images key={data._id} onClick={() => openModal(data.poster, data._id)}>
          <img
            src={`${process.env.REACT_APP_API}${data.poster}`}
            alt={data.title}
          />
        </Images>
      ))}
    </Marquee>
  );
};

const Images = styled.div`
  width: 350px;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 300ms ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
  }
`;
