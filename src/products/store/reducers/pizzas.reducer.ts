import * as fromPizzas from "../actions/pizzas.action";
import { Pizza } from "../../models/pizza.model";

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromPizzas.PizzasAction
): PizzaState {
  //console.log("action.type = ", action.type);
  //console.log("action.payload = ", action.payload);
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      console.log("2 - loading - pizza reducer is setting loading = true");
      return {
        ...state,
        loading: true
      };
    }

    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload;
      console.log("? - loading - pizza reducer is setting loaded = true");
      const entities = pizzas.reduce(
        (entities: { [id: number]: Pizza }, pizza: Pizza) => {
          return {
            ...entities,
            [pizza.id]: pizza
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities: entities
      };
    }

    case fromPizzas.LOAD_PIZZAS_FAIL: {
      console.log("case = ", action.type);
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    // same processing for UPDATE_PIZZA_SUCCESS and CREATE_PIZZAS_SUCCESS
    case fromPizzas.UPDATE_PIZZA_SUCCESS:
    case fromPizzas.CREATE_PIZZAS_SUCCESS: {
      const pizza = action.payload;

      console.log(
        `Create or update Pizza::: in Pizzas reducer. action.payload =`,
        action.payload
      );

      console.log(
        `Create or update Pizza::: in Pizzas reducer. entities before =`,
        state.entities
      );

      const entities = {
        ...state.entities,
        [pizza.id]: pizza
      };

      console.log(
        `Create or update Pizza::: in Pizzas reducer. entities after =`,
        entities
      );
      return {
        ...state,
        entities
      };
    }

    case fromPizzas.REMOVE_PIZZA_SUCCESS: {
      const pizza = action.payload;

      console.log(
        `Remove Pizza::: in Pizzas reducer. entities before =`,
        state.entities
      );

      // remove the pizza fro the store
      const { [pizza.id]: removed, ...entities } = state.entities;

      console.log(
        `Remove Pizza::: in Pizzas reducer. removed pizza =`,
        removed
      );

      console.log(
        `Remove Pizza::: in Pizzas reducer. remaining entities =`,
        entities
      );

      return {
        ...state,
        entities
      };
    }
  }

  //console.log("returning the initial state...");
  return state;
}

// called by the reducer above to reduce a pizza array to a dictionary object
function reducePizzaArrayToEntity(
  entities: { [id: number]: Pizza },
  pizza: Pizza
): { [id: number]: Pizza } {
  return {
    ...entities,
    [pizza.id]: pizza
  };
}

// export some functions that we can compose with our selectors
export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
