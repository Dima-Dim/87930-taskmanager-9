import AbstractComponent from "./abstract-component";
import {cardColors, ClassesElements, FLATPICKR_CONFIG, tags} from "./config";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Chart from "chart.js";
import {getFirstWeekDate, getLastWeekDate} from "./utils";

export default class Statistic extends AbstractComponent {
  constructor(container, data) {
    super();
    this._container = container;
    this._tasks = data;
    this._filterdTask = [];
  }

  init() {
    AbstractComponent.renderElement(this._container, this.getElement());
    const statisticsPeriodInput = this.getElement().querySelector(`.${ClassesElements.STATISTICS_PERIOD_INPUT}`);

    flatpickr(statisticsPeriodInput, Object.assign({}, FLATPICKR_CONFIG, {mode: `range`}, {defaultDate: [getFirstWeekDate(), getLastWeekDate()]}));

    const statisticsPeriodflatpickrInput = this.getElement().querySelector(`.flatpickr-input`);

    this._filterTaskByDate(statisticsPeriodflatpickrInput.value.slice(0, 10) * 1000, statisticsPeriodflatpickrInput.value.slice(-10) * 1000);

    this._makeTagsChart();
    this._makeColorsChart();

    const onChangePeriodflatpickrInput = (evt) => {
      const {value} = evt.target;
      this._filterTaskByDate(value.slice(0, 10) * 1000, value.slice(-10) * 1000);
      this._makeTagsChart();
      this._makeColorsChart();
    };

    statisticsPeriodflatpickrInput.addEventListener(`change`, onChangePeriodflatpickrInput);
  }

  _filterTaskByDate(startDate, endDate) {
    this._filterdTask = this._tasks.filter((it) => it.dueDate >= startDate && it.dueDate <= endDate);
  }

  _makeTagsMapData(sourceData, arg) {
    const dataMap = new Map();
    tags.forEach((it) => {
      dataMap.set(it, sourceData.reduce((acc, currentValue) => acc + Number(currentValue[arg].has(it)), 0));
    });

    return dataMap;
  }

  _makeColorsMapData(sourceData, arg) {
    const dataMap = new Map();
    cardColors.forEach((it) => {
      dataMap.set(it, sourceData.reduce((acc, currentValue) => acc + Number(currentValue[arg] === it), 0));
    });

    return dataMap;
  }

  _makeTagsChart() {
    const ctxTags = this.getElement().querySelector(`.${ClassesElements.STATISTICS_TAGS}`).getContext(`2d`);
    const tagsValues = [];
    this._makeTagsMapData(this._filterdTask, `tags`).forEach((it) => tagsValues.push(it));

    return new Chart(ctxTags, {
      type: `pie`,
      data: {
        labels: Array.from(tags),
        datasets: [{
          data: tagsValues,
          backgroundColor: [
            `rgba(255, 99, 132, 0.3)`,
            `rgba(54, 162, 235, 0.3)`,
            `rgba(255, 206, 86, 0.3)`,
            `rgba(75, 192, 192, 0.3)`,
            `rgba(153, 102, 255, 0.3)`,
            `rgba(255, 159, 64, 0.3)`,
          ],
          borderColor: [
            `rgba(255, 99, 132, 1)`,
            `rgba(54, 162, 235, 1)`,
            `rgba(255, 206, 86, 1)`,
            `rgba(75, 192, 192, 1)`,
            `rgba(153, 102, 255, 1)`,
            `rgba(255, 159, 64, 1)`,
          ],
          borderWidth: 1
        }],
      },
    });
  }

  _makeColorsChart() {
    const ctxColors = this.getElement().querySelector(`.${ClassesElements.STATISTICS_COLORS}`).getContext(`2d`);
    const colorsValues = [];
    this._makeColorsMapData(this._filterdTask, `color`).forEach((it) => colorsValues.push(it));

    return new Chart(ctxColors, {
      type: `pie`,
      data: {
        labels: Array.from(cardColors),
        datasets: [{
          data: colorsValues,
          backgroundColor: [
            `rgba(255, 99, 132, 0.3)`,
            `rgba(54, 162, 235, 0.3)`,
            `rgba(255, 206, 86, 0.3)`,
            `rgba(75, 192, 192, 0.3)`,
            `rgba(153, 102, 255, 0.3)`,
            `rgba(255, 159, 64, 0.3)`,
          ],
          borderColor: [
            `rgba(255, 99, 132, 1)`,
            `rgba(54, 162, 235, 1)`,
            `rgba(255, 206, 86, 1)`,
            `rgba(75, 192, 192, 1)`,
            `rgba(153, 102, 255, 1)`,
            `rgba(255, 159, 64, 1)`,
          ],
          borderWidth: 1
        }],
      },
    });
  }

  getTemplate() {
    return `<section class="statistic container visually-hidden">
              <div class="statistic__line">
                <div class="statistic__period">
                  <h2 class="statistic__period-title">Task Activity DIAGRAM</h2>
      
                  <div class="statistic-input-wrap">
                    <input
                      class="statistic__period-input"
                      type="text"
                      placeholder="01 Feb - 08 Feb"
                    />
                  </div>
      
                  <p class="statistic__period-result">
                    In total for the specified period
                    <span class="statistic__task-found">0</span> tasks were fulfilled.
                  </p>
                </div>
                <div class="statistic__line-graphic">
                  <canvas class="statistic__days" width="550" height="150"></canvas>
                </div>
              </div>
      
              <div class="statistic__circle">
                <div class="statistic__tags-wrap">
                  <canvas class="statistic__tags" width="400" height="300"></canvas>
                </div>
                <div class="statistic__colors-wrap">
                  <canvas class="statistic__colors" width="400" height="300"></canvas>
                </div>
              </div>
            </section>`;
  }
}
