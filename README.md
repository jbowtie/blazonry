# Blazonry - a Javascript blazonry parser

This project contains both a parser that understands the blazonry language (at least as it pertains to the escutcheon or shield portion of a coat of arms) and a builder that produce an SVG representation.

In many regards it is inspired by https://drawshield.net/ - a fully-featured implementation that supports multiple color palettes, shield shapes, achievements and a wide array of charges.

This is a simpler implementation in Javascript intended for use in virtual tabletops or with games like Pendragon 6E - rather than try and support the full range of features possible for a coat of arms, we support just enough to create the variety needed for a game involving European knights.


## Usage

The `index.html` lets you play with blazons; it will show the AST (and if parsed successfully, the generated shield).

To run it locally, just run any static server - because Python is pre-installed on my machine, I use the following one-liner.

```
python3 -m http.server 7777 -d .
```

There is also a very simple command line program in the `index.mjs` that will accept a blazon piped in via stdin and output the SVG.

You can use it like so:

```
echo "azure bend argent" | node index.mjs > example.svg
```