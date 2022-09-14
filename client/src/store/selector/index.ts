import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../";

const data = (state: RootState) => state.global.data;
const loading = (state: RootState) => state.global.loading;
const expiredLink = (state: RootState) => state.global.expiredLink;
const error = (state: RootState) => state.global.error;
const popUpID = (state: RootState) => state.global.popUpID;

export const dataReselect = createSelector(data, (item) => {
  return item
});
export const loadingReselect = createSelector(loading, (load) => {
  return load
});
export const expiredLinkReselect = createSelector(expiredLink, (link) => {
  return link
});
export const errorReselect = createSelector(error, (e) => {
  return e
});
export const popUpIDreselect = createSelector(popUpID, (id) => {
  return id
});


