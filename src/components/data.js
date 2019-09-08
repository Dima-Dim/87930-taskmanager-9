import {cardColors} from "./config";
import {workDays} from "./config";
import {tags} from "./config";

// Для проверки количества задач
const taskCount = {
  count: 1,

  get checkCount() {
    return this.count++;
  }
};

/**
 * Функция возвращающая демо-данные о задачах
 *
 * @return {{
 *  description: *,
 *  dueDate: number,
 *  repeatingDays: *,
 *  color: *,
 *  tags: *,
 *  isArchive: boolean,
 *  isFavorite: boolean
 *  }}
 */
export const getTaskData = () => ({
  description: `${[
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)]} ${taskCount.checkCount}`,
  dueDate: Date.now() - (60 * 60 * 24 * 7 * 1000) + Math.floor(Math.random() * 60) * Math.floor(Math.random() * 60) * 24 * Math.floor(Math.random() * 14) * 1000,
  repeatingDays: new Set([...Array.from(workDays).filter(() => Boolean(Math.round(Math.random())))]),
  tags: new Set([...Array.from(tags).filter(() => Boolean(Math.round(Math.random())))]),
  color: Array.from(cardColors)[Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
  isDraft: false,
});

export const getNewTaskData = () => ({
  description: ``,
  dueDate: Date.now(),
  repeatingDays: new Set(),
  tags: new Set(),
  color: Array.from(cardColors)[Math.floor(Math.random() * 5)],
  isFavorite: false,
  isArchive: false,
  isDraft: true,
});
