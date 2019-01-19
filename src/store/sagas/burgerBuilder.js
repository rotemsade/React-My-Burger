import { put } from "redux-saga/effects";
import axios from "../../axios-orders";

import * as burgerBuilderActions from "../actions/index";

export function* initIngredientsSaga() {
  try {
    const res = yield axios.get(
      "https://my-burger-334dd.firebaseio.com/ingredients.json"
    );
    yield put(burgerBuilderActions.setIngredients(res.data));
  } catch (err) {
    yield put(burgerBuilderActions.fetchIngredientsFailed());
  }
}
