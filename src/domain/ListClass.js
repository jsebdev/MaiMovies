import { makeAutoObservable } from "mobx";

export class List {
  description = null;
  favoriteCount = null;
  id = null;
  itemCount = null;
  iso_639_1 = null;
  listType = null;
  name = null;
  posterPath = null;
  items = null;
  background = null;
  constructor(props) {
    makeAutoObservable(this);
    this.description = props.description;
    this.favoriteCount = props.favorite_count;
    this.id = props.id;
    this.itemCount = props.item_count;
    this.listType = props.list_type;
    this.name = props.name;
    this.posterPath = props.poster_path;
    this.items = props.items;
    this.background = props.background;
  }
}
