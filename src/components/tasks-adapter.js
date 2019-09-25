export default class TasksAdapter {
  constructor(data) {
    this.id = data[`id`];
    this.description = data[`description`];
    this.dueDate = Date.parse(data[`due_date`]);
    this.repeatingDays = new Set([Object.entries(data[`repeating_days`]).filter((it) => it[1] ? it[1] : null).map((it) => it[1])]);
    this.tags = new Set([...data[`tags`]]);
    this.color = data[`color`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.isArchive = Boolean(data[`is_archived`]);
    this.isDraft = null;
  }

  static parseTask(data) {
    return new TasksAdapter(data);
  }

  static parseTasks(data) {
    return data.map(TasksAdapter.parseTask);
  }

  static toSource(task) {
    return {
      'id': task.id,
      'description': task.description,
      'due_date': task.dueDate,
      'tags': [...task.tags.values()],
      'repeating_days': task.repeatingDays,
      'color': task.color,
      'is_favorite': task.isFavorite,
      'is_archive': task.isArchive,
    };
  }
}
