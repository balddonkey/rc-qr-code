
const CatalogueActionsType = {
  change: 'com.actions.catalogue.change',
}


const CatalogueActions = {
  change: (folder) => {

    return {
      type: CatalogueActionsType.change,
      data: folder,
    }
  }
}

export {
  CatalogueActions,
  CatalogueActionsType,
}