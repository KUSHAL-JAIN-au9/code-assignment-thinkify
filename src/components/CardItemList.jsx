import { CardItem } from "./CardItem";
import GameData from "../app.mock";
import { useState, useEffect } from "react";

export const CardItemList = () => {
  const [cardList, setCardList] = useState([...GameData]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (firstCard && secondCard) {
      setIsChecking(true);

      if (firstCard.name === secondCard.name) {
        // Cards match, keep them open
        setCardList((prevCards) =>
          prevCards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isOpen: true }
              : card
          )
        );
        resetSelection();
      } else {
        //cards do not match close with  delay
        setTimeout(() => {
          setCardList((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isOpen: false }
                : card
            )
          );
          resetSelection();
        }, 500);
      }
    }
  }, [secondCard]);

  const resetSelection = () => {
    setFirstCard(null);
    setSecondCard(null);
    setIsChecking(false);
  };

  const onClickHandler = (currentId) => {
    const clickedCard = cardList.find((card) => card.id === currentId);

    if (clickedCard.isOpen || isChecking) return;

    setCardList((prevCards) =>
      prevCards.map((card) =>
        card.id === currentId ? { ...card, isOpen: true } : card
      )
    );

    if (!firstCard) {
      setFirstCard(clickedCard);
    } else if (!secondCard) {
      setSecondCard(clickedCard);
    }
  };

  return (
    <div className="card-item-list">
      {cardList.map((item) => (
        <CardItem
          key={item.id}
          id={item.id}
          image={item.pic}
          onClick={onClickHandler}
          isOpen={item.isOpen}
        />
      ))}
    </div>
  );
};
