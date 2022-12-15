export default class TextBox {
  constructor(placeholder, color, backgroundColor, borderRadius, todos) {
    this.todos = todos;
    this.node = document.getElementById('newtodo');
    this.node.placeholder = placeholder;
    this.node.color = color;
    this.node.backgroundColor = backgroundColor;
    this.node.borderRadius = borderRadius;
  }
}
