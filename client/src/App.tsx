import { useEffect } from "react";
import styled from "styled-components";
import { PopUp, Slider, Loader } from "components";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataStart,
  dataReselect,
  popUpIDreselect,
  loadingReselect,
} from "store";
import { IData, IPopUp, IDirections } from "interfaces";
import { AnimatePresence } from "framer-motion";

export const App = () => {
  const dispatch = useDispatch();

  const popUpProps: IPopUp = useSelector(popUpIDreselect);
  const isLoading: boolean = useSelector(loadingReselect);
  const datas: IData[] = useSelector(dataReselect);

  useEffect(() => {
    dispatch(getDataStart());
  }, [dispatch]);

  const directions: IDirections[] = [
    { id: 768767, speed: 150, position: "left" },
    { id: 678676, speed: 170, position: "right" },
    { id: 345343, speed: 120, position: "left" },
  ];

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {directions.map((direction: IDirections) => (
            <Slider
              key={direction.id}
              speed={direction.speed}
              datas={datas}
              position={direction.position}
            />
          ))}
        </>
      )}
      <AnimatePresence>
        {popUpProps.id && (
          <PopUp id={popUpProps.id} poster={popUpProps.poster} />
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  padding: 0 5px;
  flex-direction: column;
  margin-top: 30px;
`;
