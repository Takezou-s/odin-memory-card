import { useEffect, useReducer, useState } from "react";

import Card, { LoadingCard } from "./Card";
import StatusPrompt from "./StatusPrompt";

import styles from "../styles/CardContainer.module.css";
import pikaSad from "../assets/pika-sad.png";
import pikachu from "../assets/pikachu.png";

import { kebabToLiteral } from "../helpers/stringHelpers";
import { shuffle } from "../helpers/arrayHelpers";

const idArr = [];

const url = "https://pokeapi.co/api/v2/pokemon/";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH":
      return { ...state, cards: "", loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, cards: action.payload, loading: false, error: "" };
    case "FETCH_ERROR":
      return { ...state, cards: "", loading: false, error: action.payload };
    case "SHUFFLE":
      return { ...state, cards: shuffle(state.cards) };
    case "CARD_PICKED":
      return { ...state, cardPicked: true, pickedCards: [...state.pickedCards, action.payload] };
    case "HIDE_CARDS":
      return { ...state, hideCards: true };
    case "SHOW_CARDS":
      return { ...state, hideCards: false, cardPicked: false };
    case "GAME_OVER":
      return { ...state, gameOver: true };
    case "SUCCESS":
      return { ...state, success: true };
    case "INIT":
      return initialState;
    default:
      return state;
  }
};

const initialState = {
  cards: "",
  loading: false,
  error: "",
  pickedCards: [],
  gameOver: false,
  success: false,
  hideCards: false,
  cardPicked: false,
};

function CardContainer({ count, className, onCardPicked, onRetry }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [retry, setRetry] = useState(false);
  const [continu3, setContinu3] = useState(false);

  const init = () => {
    dispatch({ type: "FETCH" });
    idArr.splice(0);
    while (count > 0) {
      const id = Math.floor(Math.random() * 1000) + 1;
      if (idArr.findIndex((x) => x === id) >= 0) continue;
      idArr.push(id);
      --count;
    }

    const fetchData = async () => {
      let error = false;
      const pokeArr = await Promise.all([
        ...idArr.map(async (x) => {
          try {
            const response = await fetch(url + x);
            const data = await response.json();
            const name = kebabToLiteral(data.name, true);
            let img = data.sprites.front_default;
            if (!img || !img.includes("http")) {
              for (const key in data.sprites) {
                img = data.sprites[key];
                if (img && img.includes("http")) break;
              }
            }
            return { id: x, name, img };
          } catch {
            error = true;
          }
        }),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);
      if (error) {
        dispatch({ type: "FETCH_ERROR", payload: "Data could not be fetched!" });
        return;
      }
      dispatch({ type: "FETCH_SUCCESS", payload: pokeArr.filter((x) => x) });
    };
    fetchData();
  };

  const cardClickHandler = (id) => {
    if (state.gameOver) return;
    if (state.pickedCards.findIndex((x) => x === id) >= 0) {
      dispatch({ type: "GAME_OVER" });
      return;
    }
    dispatch({ type: "CARD_PICKED", payload: id });
  };

  const retryClickHandler = () => {
    dispatch({ type: "INIT" });
    setRetry(true);
  };

  const continueClickHandler = () => {
    dispatch({ type: "INIT" });
    setContinu3(true);
  };

  useEffect(() => {
    if (retry) {
      if (onRetry) onRetry();
      setRetry(false);
    }
    if (continu3) {
      setContinu3(false);
    }
    if (retry || continu3) {
      init();
    }
  }, [retry, continu3]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (state.cardPicked) {
      if (onCardPicked) onCardPicked();
      if (state.cards.length <= state.pickedCards.length) {
        dispatch({ type: "SUCCESS" });
      } else {
        dispatch({ type: "HIDE_CARDS" });
      }
    }
  }, [state.cardPicked]);

  useEffect(() => {
    let timeoutId = null;
    let timeoutId2 = null;
    if (state.hideCards) {
      timeoutId = setTimeout(() => dispatch({ type: "SHUFFLE" }), 500);
      timeoutId2 = setTimeout(() => dispatch({ type: "SHOW_CARDS" }), 1000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (timeoutId2) clearTimeout(timeoutId2);
    };
  }, [state.hideCards]);

  let children;

  if (state.gameOver) {
    children = <StatusPrompt buttonText={"Retry"} img={pikaSad} title={"Game Over"} onClick={retryClickHandler} />;
  } else if (state.success) {
    children = (
      <StatusPrompt
        success={true}
        imgClass={styles["success-img"]}
        buttonText={"Continue"}
        img={pikachu}
        title={"You Won!"}
        onClick={continueClickHandler}
      />
    );
  } else if (state.loading) {
    children = <LoadingCard />;
  } else if (state.error) {
    children = <p>{state.error}</p>;
  } else if (state.cards) {
    children = state.cards.map((x) => (
      <Card
        key={x.id}
        tilt={!state.hideCards}
        back={state.hideCards}
        name={x.name}
        img={x.img}
        onClick={cardClickHandler.bind(this, x.id)}
      />
    ));
  }
  return <div className={styles["card-container"] + " " + (className || "")}>{children}</div>;
}

export default CardContainer;
