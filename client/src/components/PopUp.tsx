import { useEffect, FC, SyntheticEvent } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getDataByIdStart, expiredLinkReselect, popUpClose } from "store";
import { IPopUp } from "interfaces";
import { motion } from "framer-motion";
import { ModalAnimation, OverlayAnimation } from "animations";

export const PopUp: FC<IPopUp> = ({ id, poster }) => {
  const expiredLink: string = useSelector(expiredLinkReselect);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataByIdStart(id));
  }, [dispatch, id]);

  const modalClose = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch(popUpClose());
  };

  return (
    <Wrapper>
      <Overlay
        onClick={modalClose}
        variants={OverlayAnimation}
        initial="hidden"
        animate="visible"
        exit="hidden"
      />
      <Modal
        variants={ModalAnimation}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <video
          autoPlay
          poster={`${process.env.REACT_APP_API}${poster}`}
          src={expiredLink}
          controls
        ></video>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 112;
  user-select: none;
  display: grid;
  place-items: center;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  background: #0000003d;
  backdrop-filter: blur(10px);
  width: 100%;
  height: 100vh;
  z-index: -3;
`;

const Modal = styled(motion.div)`
  width: 800px;
  height: 447px;
  border-radius: 15px;
  overflow: hidden;
  z-index: 10;
  video {
    width: 100%;
    height: 100%;
    background: black;
    object-fit: contain;
  }
`;
