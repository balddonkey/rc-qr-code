
import { CatalogueActionsType } from './action'
import { getCatalogueState } from './store'

const CatalogueReducer = (state = getCatalogueState(), action) => {
  console.log('ac:', action);
  switch(action.type) {
    case CatalogueActionsType.change:
      const { data } = action;
      const { groups } = state;
      let newGroups = [...groups];
      console.log('state change:', state);
      const level = data.lever;
      const index = level - 1;
      newGroups.splice(level - 1, newGroups.length - index);
      newGroups.push(data);
      const newState = { ...state, groups: newGroups };
      console.log('new state:', newState);
      return newState;
    default:
      return state;
  }
}

export {
  CatalogueReducer,
}