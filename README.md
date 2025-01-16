# Blazonry - a Javascript blazonry parser

See https://drawshield.net/ for a fully-featured implementation that supports multiple color palettes, shield shapes, achievements and a wide array of charges.

This is a simpler implementation in Javascript intended for use in virtual tabletops or with games like Pendragon 6E.


## Usage

The `index.html` lets you play with blazons; it will show the AST (and if parsed sucessfully, the generated shield).

To run it locally, just run any static server - because Python is pre-installed on my machine, I use the following one-liner.

```
python3 -m http.server 7777 -d .
```
