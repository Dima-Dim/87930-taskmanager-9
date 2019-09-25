export const getSearchResultTitle = (text, value) => `${text ? text.toString() : ``}<span class="result__count">${value}</span>`;
