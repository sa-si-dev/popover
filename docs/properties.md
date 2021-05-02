# Properties

| Name | Type | Default value | Description |
| --- | --- | --- | --- |
| ele | String \| Element | | DOM element to initialize plugin<br/>String - .sample-popover <br/>Element - document.querySelectorAll('.sample-popover') |
| target | string | | CSS selector to get popover element |
| position | String | auto | Position of popover element (auto, top, bottom, left, right,<br>top left, top right, bottom left, bottom right,<br>left top, left bottom, right top, right bottom) |
| margin | Number | 8 | Space between popover element and its Trigger element (in pixel) |
| enterDelay | Number | 0 | Delay time before showing popover element (in milliseconds) |
| exitDelay | Number | 0 | Delay time before hiding popover element (in milliseconds) |
| showDuration | Number | 300 | Transition duration for show animation (in milliseconds) |
| hideDuration | Number | 200 | Transition duration for hide animation (in milliseconds) |
| transitionDistance | Number | 10 | Distance to translate on show/hide animation (in pixel) |
| zIndex | Number | 1 | CSS z-index value for popover element |
| hideOnOuterClick | Boolean | true | Hide on clicking outside of popover element |
| showOnHover | Boolean | false | Show popover element on hovering trigger element |
| hideArrowIcon | Boolean | false | Hide arrow icon in the popover |
| afterShow | Function | | Callback function for after showing popover |
| afterHide | Function | | Callback function for after hiding popover |


## Using properties on initialization

```js
PopoverComponent.init({
  ...
  position: 'bottom',
  zIndex: 10,
  ...
});
```


## Using properties as DOM attributes

To use an property as an attribute, property name should be `hyphenated` and prefixed with `data-popover-*` (e.g. `position` => `data-popover-position`)

```html
<div class="popover-ele"
  data-popover-position="bottom"
  data-popover-z-index="10"
></div>
```

<br>

**Following properties are not allowed to use as attribute**
- ele
- afterShow
- afterHide
