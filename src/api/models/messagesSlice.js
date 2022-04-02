import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getHashFromString } from "../../utils/functions";

const messagesAdapter = createEntityAdapter({
  selectId: (message) => {
    const str = message?.dateCreate + message?.text + message?.role;
    return getHashFromString(str);
  },
  // sortComparer: (a, b) => a.dateCreate.localeCompare(b.dateCreate),
});

// messagesAdapter.addOne
// messagesAdapter.addMany
// messagesAdapter.setAll

/**
 * addOne: принимает один объект и добавляет его, если он еще не присутствует.
 * addMany: принимает массив сущностей или объект в форме Record<EntityId, T>и добавляет их, если они еще не присутствуют.
 * setOne: принимает один объект и добавляет или заменяет его
 * setMany: принимает массив сущностей или объект в форме Record<EntityId, T>и добавляет или заменяет их.
 * setAll: принимает массив сущностей или объект в форме Record<EntityId, T>и заменяет все существующие сущности значениями в массиве.
 * removeOne: принимает одно значение идентификатора объекта и удаляет объект с этим идентификатором, если он существует.
 * removeMany: принимает массив значений идентификаторов сущностей и удаляет каждую сущность с этими идентификаторами, если они существуют.
 * removeAll: удаляет все сущности из объекта состояния сущности.
 * updateOne: принимает «объект обновления», содержащий идентификатор сущности, и объект, содержащий одно или несколько новых значений поля для обновления внутри changesполя, и выполняет поверхностное обновление соответствующей сущности.
 * updateMany: принимает массив объектов обновления и выполняет неглубокие обновления для всех соответствующих сущностей.
 * upsertOne: принимает одну сущность. Если сущность с таким идентификатором существует, она выполнит неглубокое обновление, и указанные поля будут объединены в существующую сущность, при этом любые совпадающие поля перезапишут существующие значения. Если объект не существует, он будет добавлен.
 */

export const messagesSlice = createSlice({
  name: "messages",
  initialState: {},
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    setMessages: messagesAdapter.setAll,
  },
});

export const { addMessage, addMessages, setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
