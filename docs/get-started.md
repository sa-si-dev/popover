# Get Started

To use popover plugin, download and import the required files and initiate component with required [properties](properties.md).


<div class="get-started-example">
  <button class="btn btn-h-long btn-v-long sample-popover">Click here</button>
  <div id="sample-popover-target" class="pop-comp-wrapper sample-popover-target">
    <div class="pop-comp-content">Popover content</div>
  </div>
</div>

<div class="sample-popover-position-container">
  <div class="sample-popover-position-title">Select Position</div>
  <label><input type="radio" value="auto" name="sample-popover-position" checked>Auto</label>
  <label><input type="radio" value="top" name="sample-popover-position">Top</label>
  <label><input type="radio" value="bottom" name="sample-popover-position">Bottom</label>
  <label><input type="radio" value="left" name="sample-popover-position">Left</label>
  <label><input type="radio" value="right" name="sample-popover-position">Right</label>
  <br>
  <label><input type="radio" value="top left" name="sample-popover-position">Top Left</label>
  <label><input type="radio" value="top right" name="sample-popover-position">Top Right</label>
  <label><input type="radio" value="bottom left" name="sample-popover-position">Bottom Left</label>
  <label><input type="radio" value="bottom right" name="sample-popover-position">Bottom Right</label>
  <br>
  <label><input type="radio" value="left top" name="sample-popover-position">Left Top</label>
  <label><input type="radio" value="left bottom" name="sample-popover-position">Left Bottom</label>
  <label><input type="radio" value="right top" name="sample-popover-position">Right Top</label>
  <label><input type="radio" value="right bottom" name="sample-popover-position">Right Bottom</label>
</div>

## Download files
You can download the required CSS and JS files from the `dist` directory in the [GitHub repository](https://github.com/{{repo}})

OR from below direct links

**CSS file link** - [popover.min.css](https://raw.githubusercontent.com/{{repo}}/main/dist/popover.min.css)

**JS file link** - [popover.min.js](https://raw.githubusercontent.com/{{repo}}/main/dist/popover.min.js)

## Import files

Import downloaded files (`popover.min.css` and `popover.min.js`) into your project.

```html
<link rel="stylesheet" href="path/to/popover.min.css">

<script src="path/to/popover.min.js">
```

## Install from NPM

We could install this plugin from NPM and use it

```shell
npm install --save popover-plugin
```

## Import files from node_modules

```html
<link rel="stylesheet" href="node_modules/popover-plugin/dist/popover.min.css">

<script src="node_modules/popover-plugin/dist/popover.min.js"></script>
```

## Initialize plugin

```html
<!-- element to trigger popover content -->
<button class="popover-ele" data-popover-target="#sample-popover-target">Click here</button>

<!-- content to show as popover -->
<div id="sample-popover-target">
  <div class="pop-comp-content">Popover content</div>
</div>
```

```js
PopoverComponent.init({
  ele: '.popover-ele'
});
```

Refer [properties](properties.md) for available properties.

<script>
  initPageGetStarted();
</script>