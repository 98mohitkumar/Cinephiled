export default function lightOrDark(color) {
  // Variables for red, green, blue values
  var r, g, b, hsp;

  // If hex --> Convert it to RGB: http://gist.github.com/983661
  color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

  r = color >> 16;
  g = (color >> 8) & 255;
  b = color & 255;

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {
    return "light";
  } else {
    return "dark";
  }
}
