import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getChats } from "../../store/chat/chatThunks";
import { roomCard } from "../types";

const RoomCard = ({ image, title }: roomCard) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getChats());
  });

  return (
    <div className="rooms__card">
      <img src={image} alt="reddit" />
      <div className="card__info">
        <h4>{title}</h4>
        <span>Join us</span>
      </div>
    </div>
  );
};

export default RoomCard;
